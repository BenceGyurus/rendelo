function element_Data(data){
    data = JSON.parse(data);

}

function query_Orders(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(this.status == 200 && this.readyState == 4){
            element_Data(this.responseText); 
        }
        else if(this.status == 404){
            alert("Nem sikerült betölteni az adatokat");
        }
    };
    req.open("POST", "users_Orders");
    req.send("GET_USERS_ORDERS");
}

query_Orders();