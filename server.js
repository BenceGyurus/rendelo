const fs = require("fs");
const http = require("http");
const os = require("os");
const dns = require("dns");
const { send } = require("process");
var count = 0;
const extensions = ["html", "css", "js", "png", "svg", "img"];


function send_Path(req, res, path){
        extension = "html";
        response = 404;
        path = path.split("?")[0];
        console.log(path);
        extension = path.split(".")[path.split(".").length-1];
        switch(true){
            case extension == "html":
                res.setHeader("Content-text", "text/html");break;
            case extension == "css":
                res.setHeader("Content-text", "text/css"); break;
            case extension == "js":
                res.setHeader("Content-text", "text/js"); break;
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

function send_Data(data, type,type2, res, req){
    res.setHeader(type, type2);
    res.writeHead(200);
    res.end(data);
    }

var users = []       //ip       token
function generate_Token(){
    token = "";
    for (var i = 0; i < 20; i++){
        token += String(Math.floor(Math.random()*10));
    }
    return token;
}

function registration(data){
    data = String(data);
    var json = JSON.parse(data);
    console.log(json);
}
function encryption(text){
    var result = "";
    for (var i = 0; i < text.length; i++){
        if (i != text.length-1){
        result+=parseInt(text[i].charCodeAt(0), 16)+" ";
        }
        else{
            result+= parseInt(text[i].charCodeAt(0), 16);
        }
    }
    return result;
}

function login(data, ip){
    data = String(data);
    console.log(data);
    var obj = JSON.parse(data);
    change = false
    token = generate_Token();
    for (var i = 0; i < users.length; i++){
        if (ip == users[i][0]){
            change = true;
            users[i][1] = token;
        }
    }
    if (!change){
    users.push([ip,token]);
    }
    return token;
}

function load_JSON_File(data){
    data = JSON.parse(data);
    return data
}

const requestListener = function(req, res) {
    var path = req.url;
    var apply = true;
    var rawdata = fs.readFileSync('only_Post.json');
    var file = JSON.parse(rawdata);
    console.log(file.fileNames);
    for (var i = 0; i < file.fileNames.length; i++){
        if (path == "/"+file.fileNames[i] || path == file.fileNames[i]){
            apply = false;
        }
    }
    if (req.method == "GET" && apply){
    if (path == "/"){
        path = "/login.html"
    }
    var extension = "html";
    var response = 404;
    var path = path.split("?")[0];
    var extension = path.split(".")[path.split(".").length-1];
    var next = false;
    for (var i = 0; i < extensions.length; i++){
        if (extensions[i] == extension){
            next = true;
        }
    }
    if (path == "/server.js"){next = false}
    if (next){
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
    }
    else{
        path = "error.html";
        extension = "html";
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
else if (req.method == "GET" && !apply){
    send_Path(req,res, "/wrong_Method.html")
}
else if(req.method == "POST"){
    var data;
    var body = "";
    var get_File = false;
    request = true;
    req.on('data', function (chunk) {
        body += chunk;
      });
      req.on('end', function () {
        var fs = require('fs');
            body = String(body);
            if (req.url == "/GET_TOKEN"){
                get_File = false;
                token_ = login(body, req.socket.remoteAddress);
                data = '{"token":'+token_+'}';
                //data = JSON.parse(json);
                console.log(data);
                res.setHeader("conetent-text", "application/json");
                res.writeHead(200);
                res.end(data);
            }
            else if (req.url != "rendeles.html") {
                data = load_JSON_File(body);
                console.log(data);
                send_Path(req, res, path);
            }
            else{
                get_File = false;
                request = false;
                json_Token = load_JSON_File(body);
                token = json_Token;
                for (var i = 0; i < users.length; i++){
                    if (users[i][0] == req.socket.remoteAddress){
                     if(users[i][1] == token){
                        send_Path(req, res, path);
                    }  
                    }
                }
            
            }
      });
}
    
}
const server = http.createServer(requestListener);
dns.lookup(os.hostname(), function (err, add, fam){
    console.log("http://"+add+":8000");
    server.listen(8000, add);
})