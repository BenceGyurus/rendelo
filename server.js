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
var users = []       //ip       token
function generate_Token(){
    token = "";
    for (var i = 0; i < 15; i++){
        token += String(Math.floor(Math.random()*10));
    }
    return token;
}

function registration(data){
    //request = true;
    
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
            console.log(req.url);
            if (req.url == "/GET_TOKEN"){
                user_Data = load_JSON_File(body)
                get_File = false;
                token_ = login(body, req.socket.remoteAddress);
                const sqlite3 = require('sqlite3').verbose();
                let db = new sqlite3.Database('users.db');
                var datas;
                db.serialize(function() {
                    db.run("CREATE TABLE IF NOT EXISTS users (full_Name , username, password, rank, id)");
                });
                db.all("SELECT * FROM users WHERE username = ? AND password = ?", [user_Data.userName, encryption(user_Data.password)], function(err,rows){
                    var data = '{"error": "Váratlan hiba történt bejelenetkezés közben"}'
                    if (rows.length > 0){
                        data = '{"token":'+token_+', "id" : '+rows[0].id+'}';
                        //data = JSON.parse(json);
                    }
                    else{
                        data = '{"error": "Hibás felhasználónév vagy jelszó"}'
                    }
                    res.setHeader("conetent-text", "application/json");
                    res.writeHead(200);
                    res.end(data);
                });
            }
            else if (req.url == "/rendeles.html") {
                data = load_JSON_File(body);
                send_Path(req, res, path);
            }
            else if (req.url == "/registration"){
                console.log(body);
                a = registration(body)
                console.log(a);
                var error;
                data = String(data);
                var json = JSON.parse(body);
                console.log(json);
                const sqlite3 = require('sqlite3').verbose();
                let db = new sqlite3.Database('users.db');
                var datas;
                db.serialize(function() {
                    db.run("CREATE TABLE IF NOT EXISTS users (full_Name , username, password, rank, id)");
                });
                db.all("SELECT * FROM users WHERE username = ?", [json.userName], function(err,rows){
                    console.log(rows.length); 
                    data = '{error: "A regisztrácó sikertelen, kérem próbálja újra később"}';
                    if (rows.length > 0){
                        data = '{"error": "Ez a felhasználónév már foglalt"}';
                    }
                    else{
                        db.run("INSERT INTO users VALUES (?,?,?,?,?)", [json.full_Name, json.userName, encryption(json.password), "normal", generate_Token()], function(err){});
                        data = '{"message": "Sikeres bejelenetkezés"}';
                    }
                    res.setHeader("content-text", "application/json");
                    res.writeHead(200);
                    res.end(data);
                });
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