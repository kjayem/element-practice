const express = require('express');
const app = express();
var fs = require('fs');
var qs = require('querystring');
var bodyParser = require('body-parser');
var compression = require('compression');
var template = require('./public/js/template.js');
var topicRouter = require('./routes/topic');

//public 안에있는 정적인 파일들을 사용하기 위함
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());
app.get('*', function(req, res, next) {
  fs.readdir('./data', function(error, filelist){
    req.list = filelist;
    next();
  });
});

app.use('/topic', topicRouter);

//홈페이지
// app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', function(req, res) {
    var title = 'jayemk';
    var description = 'Hello, Node.js';
    var list = template.list(req.list);
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}
      <img src="/img/hello.jpg" style="width: 300px; display: block; margin-top: 10px;">`,
      `<a href="/topic/create">create</a>`
    );
    res.send(html);
});



app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!')
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});
