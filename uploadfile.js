var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      //Here we decide what to do with the file, in this case we will to copy to another folder
      var oldpath = files.filetoupload.path;
      var newpath = 'The path where will be the new file' + files.filetoupload.name; //Edit this
      //Uncomment one:

      /*
      //Nodejs 7 and below
      fs.createReadStream(oldpath).pipe(fs.createWriteStream(newpath));
      res.write('File uploaded and moved!');
      res.end();
      */


      /*
      //Nodejs 8
      fs.copyFile(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });*/
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);
