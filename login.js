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
        file = create_Json_Document();
    }
}