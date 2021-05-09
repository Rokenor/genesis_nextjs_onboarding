var express = require('express');
var app = express();
var fs = require('fs');

app.get('/articles', function (req, res) {
  fs.readFile(__dirname + '/' + 'articles.json', 'utf8', function (err, data) {
    console.log(data);
    res.end(data);
  });
});

app.get('/article/:id', function (req, res) {
  fs.readFile(__dirname + '/' + 'articles.json', 'utf8', function (err, data) {
    var articles = JSON.parse(data);
    var article = articles['article' + req.params.id];
    console.log(article);
    res.end(JSON.stringify(article));
  });
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(`Server running at http://localhost${host}${port}`);
});
