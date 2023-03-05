var os = require('os');
var express = require('express');
const app = express();
var path = require('path')
var fs = require('fs')
var xssEscape = require('xss-escape');

const multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, os.tmpdir())
  },
  filename: function(req, file, cb) {
    var originalname = xssEscape(file.originalname);
    cb(null, originalname)
  }
})

const upload = multer({
  storage: storage
});

app.post('/upload', upload.single('file'), function(req, res) {
  const bearer_token = req.body.bearer_token;
  const file = req.file;

  console.log("token: "+bearer_token);
  console.log(file);

  res.send("File was saved in: "+file.path);
});

app.get('/list', function(req, res) {
  var files = fs.readdirSync(os.tmpdir(), {
      withFileTypes: true
    })
    .filter(item => !item.isDirectory())
    .map(item => item.name)
  res.json({"files":files});
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started...`);
});