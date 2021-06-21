var selected_Day;
var number_Of_Selected_Day;
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
/*
function element_To_days(text){
    document.getElementById("day").innerHTML = "";
}
*/
function element_Days(){
    name_Of_Day = ["Vasárnap", ["Hétfő", "monday"], ["Kedd", "tuesday"], ["Szerda", "wensday"], ["Csütörtök", "thursday"], ["Péntek", "friday"], "Szombat"]
    //var d = Number(new Date().getDay());
    var d = 1;
    document.getElementById("day_Grid").innerHTML = "";
    if (d < 6 && d >= 1){
        for(let i = d; i < 6; i++){
            if (name_Of_Day[i].length == 2){
            document.getElementById("day_Grid").innerHTML += "<div class = 'day' onclick = 'next_Step(\""+name_Of_Day[i][1]+"\")'>"+ name_Of_Day[i][0] +"</div>";
            }
        }
    }
    else{
        document.getElementById("day_Grid").innerHTML = "Még nem elérhető a következő heti menüsor";
    }
}

function next_Step(day){
        window.selected_Day = day;
        name_Of_Day = ["Vasárnap", ["Hétfő", "monday"], ["Kedd", "tuesday"], ["Szerda", "wensday"], ["Csütörtök", "thursday"], ["Péntek", "friday"], "Szombat"];
        for (var i = 0; i < name_Of_Day.length; i++){
            if (name_Of_Day[i][1] == day){
                window.number_Of_Selected_Day = i;
            }
        }
        var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200){
                document.body.innerHTML = this.responseText;
            }
        };
        req.open("GET", "index.html");
        req.send();
}