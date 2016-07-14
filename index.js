var http = require('http');
var fs = require('fs');
var port = process.env.PORT || 3000;
var path = __dirname + '/file.txt';


function handleRequest(req, res) {

  if (req.method === 'POST'){
    console.log('Proxying POST request from ', req.headers['user-agent'], req.headers['origin']);
    var body = [];

    fs.stat(path, function (err, stats) {
       // Check if file exist
      if (err && err.code === 'ENOENT'){

        var writeStream = fs.createWriteStream(path);
        req.pipe(writeStream);
        req.pipe(res);

      } else {

        var readStream = fs.createReadStream(path);
        readStream.on('open' ,function () {
          readStream.pipe(res);
        });

        req.on('data', function (chunk) {
          body.push(chunk);

        });

        //write file 
        req.on('end', function () {
          readStream.on('end', function () {
            fs.writeFile(path, body, function (err) {
              if (err) throw err;
            });
          });
        });
      }
    });

  }
} 

var server = http.createServer(handleRequest);

server.listen(port, function () {
  console.log('server listening on port', port);
});
