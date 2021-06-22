function control_All_Line(){
    errors = [];
    list = ["full_Name", "userName", "password", "rePassword"];
    for (var i = 0; i < list.length; i++){
        if (!document.getElementById(list[i]).value && errors.length < 1){
            errors.push("Kérem töltse ki az összes mezőt!");
        }
    }
    if (document.getElementById("password").value != document.getElementById("rePassword").value && errors.length < 1){
        errors.push("A jelszavak nem egyeznek meg!")
    }
    document.getElementById("errors_Log").innerHTML = "";
    for (var i = 0; i < errors.length; i++){
        document.getElementById("errors_Log").innerHTML += errors[i];
        if (errors.length-i >= 1){
            document.getElementById("errors_Log").innerHTML+="<br />";
        }
    }
}

function send_Data(){
    var json_File = {
        
    };
}