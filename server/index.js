// node 后端服务器
const userApi = require('./api/userApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express(); 

//注意以下的全部request => req  response => res 
// app.get('/', function (req, res) {  //这个就是可以直接在根目录显示出helloworld 
//   res.send('Hello world!');  
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public')); //指定/public 为根目录 

// app.get('/customer', function(req, res){  //这个是从根目录中新建一个customer 这个目录
//   res.send('customer page');});
// 后端api路由
app.use('/api/user', userApi);

// 监听端口
app.listen(3030);
console.log('success listen at port:3030......可以直接访问服务器查看配置。');
