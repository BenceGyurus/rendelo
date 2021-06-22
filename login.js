var user;
function create_Json_Document(){
    var file = {"userName": document.getElementById("userName").value,"password": document.getElementById("password").value};
    console.log(file);
    return file;
}

var token;

function send_Json_Document(){
    file = create_Json_Document();
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            data = this.responseText;
            data = String(data);
            data = JSON.parse(data);
            if (data.token != "error"){
                window.token = data.token;
                get_New_Site("select.html", data.token);
            }
        }
    };
    req.open("POST", "GET_TOKEN");
    req.setRequestHeader("content-type", "application/json");
    var dic = JSON.stringify(file);
    console.log(dic);
    req.send(dic);
}

function control_All_Line(){
    var list = ["userName", "password"];
    var errors = [];
    for (var i = 0; i < list.length; i++){
        if (!document.getElementById(list[i]).value.length && errors.length < 1){
            errors.push("Kéren töltse ki az összes mezőt");
        }    
    }
    document.getElementById("errors_Log").innerHTML = "";
    for (var i = 0; i < errors.length; i++){
        document.getElementById("errors_Log").innerHTML += errors[i];
    }
    if (errors.length == 0){
        send_Json_Document();
    }
}