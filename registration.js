function control_All_Line(){
    var errors = [];
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
    if (errors.length == 0){
        send_Data();
    }
}

function send_Data(){
    if (document.getElementById("full_Name").value && document.getElementById("userName").value && document.getElementById("password").value){
    var json_File = JSON.stringify({
        full_Name : document.getElementById("full_Name").value,
        userName : document.getElementById("userName").value,
        password : document.getElementById("password").value,
        
    });}
    function load_Json_File(data){
        data = String(data);
        data = JSON.parse(data);
        return data
    }

    if (json_File){
        req = new XMLHttpRequest();
        req.onreadystatechange = function(){
            if (this.status == 200 && this.readyState == 4){
                msg = this.responseText;
                msg = load_Json_File(msg)
                console.log(msg);
                if (msg.error){
                    document.getElementById("errors_Log").innerHTML = msg.error;
                }
                else{

                }
            }
        }
        req.open("POST", "registration");
        req.setRequestHeader("content-text", "application/json");
        req.send(json_File);
    }
}