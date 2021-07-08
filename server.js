const fs = require("fs");
const http = require("http");
const os = require("os");
const dns = require("dns");
const { send } = require("process");
var count = 0;
const extensions = ["html", "css", "js", "png", "svg", "img"];


function get_File_Name(){
    var y = new Date().getFullYear();
    var m = new Date().getMonth()+1;
    var d = new Date().getDay();
    var date = new Date().getDate();
    var number_Of_Month = new Date(y, m, 0).getDate();
    var number_Of_Last_Month;
    var number_Of_Next_Month;
    var firstDay;
    var lastDay;
    var now_Month = number_Of_Month;
    if (m < 2){
        number_Of_Last_Month = new Date(y, 12, 0).getDate();
    }
    else{
        number_Of_Last_Month= new Date(y, m-1, 0).getDate();
    }
    if (m < 12){
        number_Of_Next_Month = new Date(y, m+1, 0).getDate();
    }
    else{
        number_Of_Next_Month = new Date(y, 1, 0).getDate();
    }
    firstDay = date-(d-1);
    if (firstDay < 1){
        firstDay = number_Of_Last_Month+firstDay;
        now_Month = number_Of_Last_Month;
        m--;
    }
    lastDay = firstDay+4;
    if (lastDay > now_Month){
        lastDay = (lastDay-number_Of_Next_Month);
        m--;
    }
    fileName = y+"_"+m+"_"+firstDay+"_"+lastDay;
    console.log(fileName);
    return fileName
}

function create_Html_From_Json(data){
    console.log(data);
    var list = [data.monday, data.tuesday, data.wensday, data.thursday, data.friday];
    console.log(list);
    data = JSON.stringify(data);
    fileName = get_File_Name();
    fs.writeFileSync("json_menus/"+fileName+'.json', data);
    for (var i = 0; i < list.length; i++){
        for (var k = 0; k < list[i].length; k++){
            var path = "";
            if (list[i][k] != "none"){
            text = "<h3>"+list[i][k]+"</h3>";
            if (k == 0){
                path = fileName+"/soup"+(i+1)+".html";
            }
            else{
                path = fileName+"/menu"+(i+1)+"_"+(k)+".html";

            }
            console.log(text);
            fs.writeFile(path, text, function(err){
                if (err){
                    fs.mkdir(fileName, function(err) {
                        fs.writeFile(path, text, function(err){});
                    })
                }
            });
        }
        }
    }
}

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
var users = []       //ip       token   id
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

function login(data, ip, id){
    data = String(data);
    var obj = JSON.parse(data);
    change = false
    token = generate_Token();
    for (var i = 0; i < users.length; i++){
        if (ip == users[i][0]){
            change = true;
            users[i][1] = token;
            users[i][2] = id;
        }
    }
    if (!change){
    users.push([ip,token, id]);
    }
    return token;
}

function load_JSON_File(data){
    data = JSON.parse(data);
    return data
}

function send_With_Get_Method(res, path){
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
    path = path.split("?")[0];
    extension = path.split(".")[path.split(".").length-1];
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
    if (path == "/add_Menu.html"){
        var id;
        for (var i = 0; i < users.length; i++){
            if (users[i][0] == req.socket.remoteAddress){
                id = users[i][2];
                const sqlite3 = require('sqlite3').verbose();
                var db = new sqlite3.Database('users.db');
                db.all("SELECT * FROM users WHERE id = ?", [id], function(err, rows){
                    console.log(rows)
                    if (rows[0].rank == "admin"){
                        send_With_Get_Method(res, path);
                    }
                    else{
                        send_With_Get_Method(res, "/error.html");
                    }
                });
                db.close();
            } 
        }
        if(!id){
            send_With_Get_Method(res, "/error.html");
        }
    }
    else{
        send_With_Get_Method(res, path)
    }
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
                const sqlite3 = require('sqlite3').verbose();
                var db = new sqlite3.Database('users.db');
                var datas;
                db.serialize(function() {
                    db.run("CREATE TABLE IF NOT EXISTS users (full_Name , username, password, rank, id)");
                });
                db.all("SELECT * FROM users WHERE username = ? AND password = ?", [user_Data.userName, encryption(user_Data.password)], function(err,rows){
                    var data = '{"error": "Váratlan hiba történt bejelenetkezés közben"}'
                    if (rows.length > 0){
                        token_ = login(body, req.socket.remoteAddress, rows[0].id);
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
                send_Path(req, res, path);
                data = load_JSON_File(body);
                //console.log(data);
                fs.writeFileSync("json_Orders/"+data.user_Id+"_"+data.number_Of_Day+"_"+get_File_Name()+".json", body);
                const sqlite3 = require('sqlite3').verbose();
                var db = new sqlite3.Database("orders_Dbs/"+get_File_Name()+".db");
                db.serialize(function() {
                    db.run("CREATE TABLE IF NOT EXISTS orders (id , number_Of_menu, soup, day, number_Of_Day, full_Name)");
                });
                db.all("SELECT * FROM orders WHERE id = ? AND number_Of_Day = ?", [data.user_Id, data.number_Of_Day], function(err, rows){
                    console.log(err);
                    console.log(rows);
                    if (rows.length < 1){
                        db.run("INSERT INTO orders VALUES (?,?,?,?,?,?)", [data.user_Id, data.menu, data.soup, data.day ,data.number_Of_Day, rows2[0].full_Name], function(err){});
                    }
                    else{
                        db.run("UPDATE orders SET number_Of_Menu = ? WHERE id = ? AND number_Of_Day = ?", [data.menu, data.user_Id, data.number_Of_Day], function(err){});
                        db.run("UPDATE orders SET soup = ? WHERE id = ? AND number_Of_Day = ?", [data.soup, data.user_Id, data.number_Of_Day], function(err){});
                    }
                });
            db.close();
            }
            else if (req.url == "/SET_MENU"){
                create_Html_From_Json(load_JSON_File(body));
                send_Path(req,res,"/rendeles.html")
            }
            else if (body == "MENU"){
                folder_Name = get_File_Name();
                send_Path(req,res, "/"+folder_Name+req.url);
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
                var db = new sqlite3.Database('users.db');
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
                        data = '{"message": "Sikeres regisztráció"}';
                    }
                    res.setHeader("content-text", "application/json");
                    res.writeHead(200);
                    res.end(data);
                });
                db.close()
            }
            else if (path == "/GET_USER_DATA"){
                data = load_JSON_File(body);
                file_Name = String(data.id)+"_"+String(data.number_Of_Day)+"_"+get_File_Name();
                console.log(file_Name);
                try {
                    var rawdata = fs.readFileSync("json_Orders/"+file_Name+'.json');
                    var data = JSON.parse(rawdata);
                } catch (error) {
                    var data = JSON.parse('{"error" : "Még nincs ilyen file"}')
                }
                data = JSON.stringify(data);
                res.setHeader("content-text", "application/json");
                res.writeHead(200);
                res.end(data);

            }
            else if (body == "GET_JSON_MENU"){
                try {
                    var rawdata = fs.readFileSync("json_Menus/"+get_File_Name()+'.json');
                    var data = JSON.parse(rawdata);
                } catch (error) {
                    var data = JSON.parse('{"error" : "Még nincs ilyen file"}')
                }
                data = JSON.stringify(data);
                //console.log(data)
                res.setHeader("content-text", "application/json");
                res.writeHead(200);
                res.end(data);
            }
            else if(path == "/GET_TODAY_SOUP"){
                data = load_JSON_File(body);
                file_Path = "/"+get_File_Name()+"/"+ "soup" + data.number_Of_Day + ".html";
                console.log(file_Path);
                send_Path(req, res, file_Path);       
            }
            else if (path == "/GET_ALL_USER_DATA"){
                const sqlite3 = require('sqlite3').verbose();
                var db = new sqlite3.Database('users.db');
                var real_Id;
                for (var i = 0; i < users.length; i++){
                    //console.log(users[i][0], req.socket.remoteAddress);
                    if (users[i][0] == req.socket.remoteAddress){
                        real_Id = users[i][2];
                    }
                }
                console.log(real_Id);
                data = load_JSON_File(body);
                if (String(data.id) == real_Id){
                db.all("SELECT * FROM users WHERE id = ?", [real_Id], function(err, rows){
                    if(rows.length > 0){
                    if (rows[0].rank == "admin"){
                        var data = JSON.stringify({
                            data: [["Rendelés leadása", "select.html", true], ["Heti menü feltöltése", "/add_Menu.html", false], ["Rendelések megtekintése", "orders.html"]]
                        });
                    }
                    else{
                        var data = JSON.stringify({
                            data: [["Rendelés leadása", "select.html", true]]
                        });
                    }
                    res.setHeader("content-text", "application/json");
                    res.writeHead(200);
                    res.end(data);
                }});
                }
                db.close()
            }
            else if (body == "GET_USERS_ORDERS"){
                const sqlite3 = require('sqlite3').verbose();
                var db = new sqlite3.Database("orders_Dbs/"+get_File_Name()+".db");
                db.all("SELECT * FROM orders", [], function(err, rows){
                    var text_Json;
                    console.log(rows);
                    for (var i = 0; i <rows.length; i++){
                        text_Json += JSON.stringify(rows[i]);
                    }
                    console.log(text_Json);
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