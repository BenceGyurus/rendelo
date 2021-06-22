var selected_Day;
var number_Of_Selected_Day;
function element_Days(){
    name_Of_Day = ["Vasárnap", ["Hétfő", "monday"], ["Kedd", "tuesday"], ["Szerda", "wensday"], ["Csütörtök", "thursday"], ["Péntek", "friday"], "Szombat"]
    var d = Number(new Date().getDay());
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
        get_New_Site("index.html", window.token);
}