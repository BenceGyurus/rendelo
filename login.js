var user_Id;
var user_Name;
function create_Json_Document(){
    var file = {"userName": document.getElementById("userName").value,"password": document.getElementById("password").value};
    return file;
}

var token;

function send_Json_Document(){
    if (document.getElementById("userName").value && document.getElementById("password").value){
    file = create_Json_Document();
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            data = this.responseText;
            data = String(data);
            data = JSON.parse(data);
            if (!data.error){
                window.token = data.token;
                window.user_Id = data.id;
                get_New_Site("profile_Site.html", data.token);
                window.user_Name = file.userName;
            }
            else{
                document.getElementById("errors_Log").innerHTML = data.error;
            }
        }
    };
    req.open("POST", "GET_TOKEN");
    req.setRequestHeader("content-type", "application/json");
    var dic = JSON.stringify(file);
    console.log(dic);
    req.send(dic);
}
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