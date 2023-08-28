/* 文件读写 */
// const fs = require('fs');
// fs.readFile('./charector.png', 'utf-8', (err, content) => {
//     console.log( err, content);
// });


/* 进程管理 */

/* 网络通信 */
const http = require('http');
/* http.createServer((req, res) => {
    console.log(111, req.url);
    res.writeHead(200, {
        'content-type': 'text/html;charset=utf-8'
        // 'content-type': 'text/plain;charset=utf-8'
    })
    res.write(`
        <html>
            <b> hello world </b>
            <div> 大家好 <div>
        </html>
    `);
    res.end();
}).listen(3000, () => {
    console.log("server start.....");
}); */

const server = http.createServer();
// 监听请求事件
server.on("request", (req, res) => {
    console.log(111, req.url);
    res.writeHead(200, {'content-type': 'application/json'})
    res.end(JSON.stringify({data: "hello"}));
});

server.listen(3000, () => {
    console.log("server start............");
})


/* url 解析  parse  format   */
const url = require('url');
const urlStr = 'https://www.baidu.com:443/ad/index.html?id=8&name=mouse#tag=110';
const urlParseObj = url.parse(urlStr);
console.log(urlParseObj);
/*
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com:443',
  port: '443',
  hostname: 'www.baidu.com',
  hash: '#tag=110',
  search: '?id=8&name=mouse',
  query: 'id=8&name=mouse',
  pathname: '/ad/index.html',
  path: '/ad/index.html?id=8&name=mouse',
  href: 'https://www.baidu.com:443/ad/index.html?id=8&name=mouse#tag=110'
} 
 */

console.log(url.format(urlParseObj));
// https://www.baidu.com:443/ad/index.html?id=8&name=mouse#tag=110

console.log(url.resolve('/one/two/three', 'four'));         // one/two/four
console.log(url.resolve('http://example.com/', '/one'));    // http://example.com/one
console.log(url.resolve('http://example.com/one', '/two')); // http://example.com/two