function query(url, method, callback){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if (this.status == 200 && this.readyState == 4){
            callback(this.responseText);
        }
        else if(this.status == 404){
            callback("Nem sikerült az adatok lekérdezése")
        }
    }
}