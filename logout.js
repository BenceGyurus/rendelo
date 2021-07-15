var url;

function logout_Function(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if (this.status == 200 && this.readyState == 4){
            json_Data = JSON.parse(this.responseText);
            if (!json_Data.error){
                window.url = json_Data.url;
            }
        }
    };
    req.open("POST", "LOGOUT");
    req.send("LOGOUT");

}


function reload(){
    logout_Function();
    window.location.href = "/login.html";
}