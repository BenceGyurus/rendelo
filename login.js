var user;
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

function create_Json_Document(){
    var file = {"userName": document.getElementById("userName").value,"password": encryption(document.getElementById("password").value)};
    console.log(file);
    return file;
}

function send_Json_Document(){
    file = create_Json_Document();
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            if (this.responseText == "false"){
                document.getElementById("errors").innerHTML = "Rossz felhasználónév vagy jelszó";
            }
            else{
                window.user = document.getElementById("userName").value;
                document.body.innerHTML = this.responseText;
                element_Days();
            }
        }
    };
    req.open("POST", "select.html");
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