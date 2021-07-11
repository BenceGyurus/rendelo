function use_Header(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if (this.status == 200 && this.readyState == 4){
            document.getElementById("element_Header").innerHTML = this.responseText;
        }
    }
    req.open("GET", "header.html");
    req.send();
}