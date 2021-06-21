
data_List = ["", "null", ""]; //name - soup  - menu
errors = [];
number_Of_Menu = "0";
function query_Data(url,method, callback){
    data = "";
   var req = new XMLHttpRequest();
   req.onreadystatechange = function(){
       if (this.readyState == 4 && this.status == 200){
           callback(this.responseText);
       }
       else if (this.status == 404){
           callback("<h1 style = 'color: red; font-size: 20px;'>Nem sikerült lekérdezni a menüt</h1>");
       }
   };
   req.open(method, url);
   req.send();
   console.log(data);
   return data;
}

function element_Menu(data){
    if (data == ""){
        data = "<h3>Ez a menü üres</h3>";
        window.errors.push("Egy menü tartalma üres, előfordul, hogy még nem töltték ki.")
    }
    document.getElementById(id).innerHTML = data;
    console.log(window.number_Of_Selected_Day);
    document_Error_Div();
}

function choose_Menu(number_Of_Menu){
    for (i = 1; i < 4; i++){
        b = String(i);
            id = "menu"+b;
            document.getElementById(id).style.border = "3px solid black"
    }
    id = "menu"+number_Of_Menu;
    document.getElementById(id).style.border = "3px solid green"
    window.data_List[2] = number_Of_Menu;
}

function looking_Menu(number_Of_Menu){
    window.number_Of_Menu = number_Of_Menu;
    id = "diplay_Menu"+number_Of_Menu;
    if (document.getElementById(id).style.display != "block"){
        document.getElementById(id).style.display = "block"
    query_Data("menu"+window.number_Of_Selected_Day+number_Of_Menu+".html", "GET", element_Menu);
    }
    else{
        document.getElementById(id).style.display = "none";
    }
}

function loadSetting(){
    console.log(window.innerWidth);
    if (window.innerWidth > 800){
        document.getElementById("menu").style.width = "50%";
    }
}

loadSetting();
function soup(a){
    document.getElementById("yes").style.border = "3px solid #9c440e";
    document.getElementById("no").style.border = "3px solid #9c440e";
    document.getElementById("yes").style.color = "#4d4b4b";
    document.getElementById("no").style.color = "#4d4b4b";
    if (a){
        document.getElementById("yes").style.border = "3px solid green";
        document.getElementById("yes").style.color = "green";
    }
    else{
        document.getElementById("no").style.border = "3px solid red";
        document.getElementById("no").style.color = "red";
    }
    window.data_List[1] = a;
}

function document_Error_Div(){
    console.log(window.errors);
    document.getElementById("error_Div").innerHTML = "";
    for (var i = 0; i < window.errors.length; i++){
        document.getElementById("error_Div").innerHTML += window.errors[i]+"<br />"
    }
    window.errors = [];
}

function control_Datas(){
    console.log("fut")
    if (window.data_List[1] != "null" && window.data_List[2] != ""){
        send();
    }
    else{
        if (window.data_List[1] == "null"){
            window.errors.push("Kérem válasszon levest!");
        }
        if (window.data_List[2] == ""){
            window.errors.push("Kérem válasszon menüt!");
        }
        console.log(window.errors);
        document_Error_Div();
    }
}

function send(){
    var req = new XMLHttpRequest();
   req.onreadystatechange = function(){
       if (this.readyState == 4 && this.status == 200){
            document.body.innerHTML = this.responseText;
       }
   };
   req.open("POST", "rendeles.html");
req.setRequestHeader("content-type", "application/json");
   var dic = JSON.stringify({  name: window.user,
            soup: window.data_List[1],
            menu: window.data_List[2]
    });
    console.log(dic);
    req.send(dic);
}