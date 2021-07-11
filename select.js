var selected_Day;
var number_Of_Selected_Day;

function query_Time(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if (this.status == 200 && this.readyState == 4){
            element_Days(this.responseText);
        }
    }
    req.open("POST", "x.json");
    req.send("GET_SEND_TIME");
}

function element_Days(time_Json){
    time = JSON.parse(time_Json);
    console.log(time);
    selected = false
    name_Of_Day = ["Vasárnap", ["Hétfő", "monday"], ["Kedd", "tuesday"], ["Szerda", "wensday"], ["Csütörtök", "thursday"], ["Péntek", "friday"], "Szombat"]
    var d = 1//Number(new Date().getDay());
    document.getElementById("day_Grid").innerHTML = "";
    if (d < 6 && d >= 1){
        for(let i = d; i < 6; i++){
            if (i == d && !time.error && name_Of_Day[i].length == 2){
                time = time.send_Time;
                var h = new Date().getHours();
                var m = new Date().getMinutes();
                if (h < time[0]){
                    document.getElementById("day_Grid").innerHTML += "<div class = 'day' onclick = 'next_Step(\""+name_Of_Day[i][1]+"\")'>"+ name_Of_Day[i][0] +"</div>";
                    selected = true;
                }
                else if(h == time[0] && m < time[1]){
                    document.getElementById("day_Grid").innerHTML += "<div class = 'day' onclick = 'next_Step(\""+name_Of_Day[i][1]+"\")'>"+ name_Of_Day[i][0] +"</div>";
                    selected = true;
                }


            }
            else if (name_Of_Day[i].length == 2){
            document.getElementById("day_Grid").innerHTML += "<div class = 'day' onclick = 'next_Step(\""+name_Of_Day[i][1]+"\")'>"+ name_Of_Day[i][0] +"</div>";
            selected = true;
            }
        }
        if (!selected){
            document.getElementById("day_Grid").innerHTML = "A héten már nincs lehetőség a menü leadására";
        }
    }
    else{
        document.getElementById("day_Grid").innerHTML = "Még nem elérhető a következő heti menüsor";
    }
}

function next_Step(day){
        var now = false
        if (day){
        name_Of_Day = ["Vasárnap", ["Hétfő", "monday"], ["Kedd", "tuesday"], ["Szerda", "wensday"], ["Csütörtök", "thursday"], ["Péntek", "friday"], "Szombat"];
        for (var i = 0; i < name_Of_Day.length; i++){
            if (name_Of_Day[i][1] == day){
                window.number_Of_Selected_Day = i;
                window.selected_Day = day;
                now = true;
            }
        }
        if (window.number_Of_Selected_Day && now){
            get_New_Site("index.html", window.token);
        }
    }
}