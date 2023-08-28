function MyPromise (executor) {
    this.state = 'pending';
    this.result = undefined;
    this.cb = [];  // cb 用来收集 scb 和 fcb 的，在异步中，使用发布订阅模式来解决 then 中无法执行 scb 或 fcb 的问题

    // 这里使用箭头函数，否则函数中的 this 会指向 window
    const resolve = (res) => {
        if (this.state === 'pending') {
            this.state = 'fullfilled';
            this.result = res;

            // 异步请求时，实例对象如果多次调用 then，那么就需要用数组来收集
            this.cb.forEach(item => {
                item.successCb && item.successCb(this.result);
            });
        }
    }

    const reject = (errInfo) => {
        if (this.state === 'pending') {
            this.state = 'rejected';
            this.result = errInfo;

            // 异步请求时，实例对象如果多次调用 then，那么就需要用数组来收集
            this.cb.forEach(item => {
                item.failedCb && item.failedCb(this.result);
            });
        }
    }

    executor(resolve, reject);
}

/**
 * 处理第一个 then 中返回值是 Promise 对象的场景
 */
function handleResult({result, isRejected, resolve, reject}) {
    if (result instanceof MyPromise) {
        result.then((res) => {
            resolve(res);
        }, err => {
            reject(err);
        });
    } else {
        if (isRejected) {
            reject(result);
        } else {
            resolve(result);
        }
    }
}

MyPromise.prototype.then = function (successCb, failedCb) {
    // 如果不传回调，也不会报错
    if (!successCb) successCb = val => val;   // 转接头
    if (!failedCb) failedCb = err => err;

    return new MyPromise((resolve, reject) => {
        if (this.state === 'fullfilled') {
            const result = successCb && successCb(this.result);
            handleResult({result, isRejected: false, resolve, reject});
        }

        if (this.state === 'rejected') {
            const result = failedCb && failedCb(this.result);
            handleResult({result,isRejected: true, resolve, reject});
        }

        if (this.state === 'pending') {
            this.cb.push({
                successCb: (res) => {
                    const result = successCb && successCb(res);
                    handleResult({result, isRejected: false, resolve, reject});
                },
                failedCb: (err) => {
                    const result = failedCb && failedCb(this.result);
                    handleResult({result,isRejected: true, resolve, reject});
                },
            });
        }
    });
}

MyPromise.prototype.catch = function (failedCb) {    
    this.then(undefined, failedCb);
}