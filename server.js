const fs = require("fs");
const http = require("http");
const os = require("os");
const dns = require("dns");
var count = 0;
const requestListener = function(req, res) {
    path = req.url;
    if (req.method == "GET"){
    if (path == "/"){
        path = "/index.html"
    }
    extension = "html";
    response = 404;
    path = path.split("?")[0];
    console.log(path);
    extension = path.split(".")[path.split(".").length-1];
    switch(true){
        case extension == "html":
            res.setHeader("content-type", "text/html");break;
        case extension == "css":
            res.setHeader("content-type", "text/css"); break;
        case extension == "js":
            res.setHeader("content-type", "text/js"); break;
        case extension == "png" || extension == "svg" || extension == "img":
            res.setHeader("Content-text", "image/"+extension); break;
    }
    fs.readFile(__dirname + path, function(err, data) {
        if (err){
            res.writeHead(404);
            fs.readFile(__dirname + "/error.html", function(err, error_Data){
                res.end(error_Data);
            })
        }
        else{
            res.writeHead(200);
            res.end(data);
        }
    });
}
else if(req.method == "POST"){
    var body = "";
    req.on('data', function (chunk) {
        body += chunk;
      });
      req.on('end', function () {
        //var body = JSON.stringify(body);
        var fs = require('fs');
        console.log(body["name"]);
        fs.writeFile(count+".json", body, function(err, result) {
        if(err) console.log('error', err);
        });
        count++;
      });
      extension = "html";
      response = 404;
      path = path.split("?")[0];
      console.log(path);
      extension = path.split(".")[path.split(".").length-1];
      switch(true){
          case extension == "html":
              res.setHeader("content-type", "text/html");break;
          case extension == "css":
              res.setHeader("content-type", "text/css"); break;
          case extension == "js":
              res.setHeader("content-type", "text/js"); break;
          case extension == "png" || extension == "svg" || extension == "img":
              res.setHeader("Content-text", "image/"+extension); break;
      }
      fs.readFile(__dirname + path, function(err, data) {
          if (err){
              res.writeHead(404);
              fs.readFile(__dirname + "/error.html", function(err, error_Data){
                  res.end(error_Data);
              })
          }
          else{
              res.writeHead(200);
              res.end(data);
          }
      });
}
    
}
const server = http.createServer(requestListener);
dns.lookup(os.hostname(), function (err, add, fam){
    console.log("http://"+add+":8000");
    server.listen(8000, add);
})