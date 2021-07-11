function element_Data(data){
    document.getElementById("orders").innerHTML = "";
    document.getElementById("orders_Data").innerHTML = "";
    data = JSON.parse(data);
    this_Day = document.getElementById("day").value;
    console.log(this_Day);
    var number_Of_Day;
    var menus = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    var days = [["Hétfő", "monday"],["Kedd","tuesday"], ["Szerda", "wensday"], ["Csütörtök", "thursday"], ["Péntek", "friday"]];
    for (var i = 0; i < data.data.length; i++){
        if (this_Day == "all" || data.data[i].day == this_Day){
        var str = "<div class='orderGrid'>" + "<h1 class='name'>" + data.data[i].full_Name + "</h1>" + "<h2 class ='number_Of_Menu'> A menü száma:" + data.data[i].number_Of_menu + "</h2>";
        console.log(data.data[i].number_Of_Day, data.data[i].number_Of_menu);
        menus[data.data[i].number_Of_Day-1][data.data[i].number_Of_menu-1]++;
        if(data.data[i].soup){
            str += "<h2 class='soup'> Leves: kér</h2>";
            menus[data.data[i].number_Of_Day-1][3]++;
        }
        else{
            str += "<h2 class='soup'> Leves: nem kér</h2>";
        }
        for (var j = 0; j < days.length ; j++){
            if (days[j][1] == data.data[i].day){
                str += "<h2 class='day'> Nap:" + days[j][0] + "</h2>";               
            }           
        }
        document.getElementById('orders').innerHTML += str;
    }
    }
    for (var i = 0; i < menus.length; i++){
        var control = false;
        if (this_Day == "all" || days[i][1] == this_Day){
        data = "<div class = 'order_Data'><h1>"+days[i][0]+"</h1>";
        for (var j = 0; j < 3; j++){
            console.log(menus[i][j]);
            if (menus[i][j]){
            data += "<h2>Menü"+(j+1)+": "+ menus[i][j] +"</h2>"
            control = true;
            }
        }
        if (menus[i][3]){
        data+= "<h2>Leves: "+menus[i][3]+"</h2></div>";
        control = true;
        }
        if(control){
        document.getElementById("orders_Data").innerHTML += data;
        }
    }
    }
    console.log(menus);
    
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