var result = false;

function generate_Days(){
    days = [["Hétfő", "monday"],["Kedd","tuesday"], ["Szerda", "wensday"], ["Csütörtök", "thursday"], ["Péntek", "friday"]];
    for (var i = 0; i < days.length; i++){
        document.getElementById("conteiner").innerHTML += "<div class = 'grid'><h2>"+days[i][0]+"</h2><label>Leves</label><br /><input type ='text' placeholder = 'Leves' id = '"+days[i][1]+"Soup'><br /><label>Menü</label><br /><input type ='text' placeholder = 'Menü' id = '"+days[i][1]+"Menu'></div>";
    }
}

function add_Time_Setter(){
    var hours = 24;
    var min = 60;
    var element_Text = '';
    element_Text += "<div style ='padding: 20px; margin: 10px auto; border: 3px solid black; width: 50%; border-radius: 10px;'><select id = 'hours'>";
    for (var i = 1; i < hours; i++){
        element_Text += "<option value = '"+i+"' style = 'margin: 3px auto; border: 3px solid black; padding: 4px;' >"+i+"</option>";
    }
    element_Text += "</select>";
    //document.getElementById("conteiner").innerHTML += element_Text+"<label>:</label>";
    //element_Text = "";
    element_Text += "<select id = 'min'>";
    for(var i = 1; i < min; i++){
        element_Text += "<option value = '"+i+"' style = 'margin: 3px auto; border: 3px solid black; padding: 4px;'>"+i+"</option>";
    }
    element_Text +="</select></div>";
    document.getElementById("conteiner").innerHTML += element_Text;
}
generate_Days();
add_Time_Setter();