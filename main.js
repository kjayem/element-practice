const express = require('express');
const app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');
app.use(helmet());

var indexRouter = require('./routes/index');
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

// routers
app.use('/', indexRouter);
app.use('/topic', topicRouter);


// error handlers
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!')
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(8080, function() {
  console.log('Example app listening on port 8080!')
});
