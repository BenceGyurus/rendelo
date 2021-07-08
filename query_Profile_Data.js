function element_Datas(data){
    for (var i = 0; i < data.data.length; i++){
        if (!data.data[i][2]){
            document.getElementById("menu_Row").innerHTML += "<div class = 'data'><a href = '"+data.data[i][1]+"'>"+data.data[i][0]+"</a></div>";
        }
        else{
            document.getElementById("menu_Row").innerHTML += "<div class = 'data' onclick = 'get_New_Site(\""+data.data[i][1]+"\", window.token)'>"+data.data[i][0]+"</div>"
        }
        document.getElementById("name").innerHTML = window.user_Name;
    }
}

function query_All_Profile_Data(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if (this.status == 200 && this.readyState == 4){
            data = JSON.parse(this.responseText);
            console.log(data);
            element_Datas(data);
        }
        else if (this.status == 404){
            alert("Hiba történet az oldal betöltése közben");
        }
    }
    req.open("POST", "GET_ALL_USER_DATA");
    req.setRequestHeader("content-text", "application/json");
    var json_File = JSON.stringify({
        name : window.user_Name,
        id : window.user_Id
    })
    console.log(json_File);
    req.send(json_File);
}