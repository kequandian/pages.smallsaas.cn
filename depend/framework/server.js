//引入express中间件
var express = require('express');
var proxy = require('http-proxy-middleware');
var compression = require('compression');
var app = express();

// 这里从环境变量读取配置，方便命令行启动
// HOST 指目标地址
// PORT 服务端口
const { HOST = 'http://112.74.26.228:8081', PORT = '8000' } = process.env;

//指定启动服务器到哪个文件夹，我这边指的是dist文件夹
app.use(express.static('./dist'));

//启动压缩
app.use(compression());

// 设置端口
app.set('port', PORT);

// 静态页面
// 这里一般设置你的静态资源路径
app.use('/', express.static('./dist'));

// 反向代理（这里把需要进行反代的路径配置到这里即可）
// eg:将/api/test 代理到 ${HOST}/api/test
app.use(proxy('/api', { target: HOST }));

// 监听端口
app.listen(app.get('port'), () => {
  console.log(`server running @${app.get('port')}`);
});
