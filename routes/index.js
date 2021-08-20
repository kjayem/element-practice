var express = require('express');
var router = express.Router();
var template = require('../public/js/template.js');

//홈페이지
// app.get('/', (req, res) => res.send('Hello World!'))
router.get('/', function(req, res) {
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

module.exports = router;