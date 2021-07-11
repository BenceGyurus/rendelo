var result = false;

function generate_Days(){
    days = [["Hétfő", "monday"],["Kedd","tuesday"], ["Szerda", "wensday"], ["Csütörtök", "thursday"], ["Péntek", "friday"]];
    var text = "";
    for (var i = 0; i < days.length; i++){
        text = "<div class = 'grid'><h2>"+days[i][0]+"</h2><label>Leves</label><br /><input type ='text' placeholder = 'Leves' id = '"+days[i][1]+"Soup'><br />"
        for (var k = 0; k < 3; k++){
            text += "<label>Menü"+(k+1)+"</label><br /><input type ='text' placeholder = 'Menü' id = '"+days[i][1]+k+"Menu'><br />"
        }
        text += "</div>";
        document.getElementById("conteiner").innerHTML += text;
    }
}

function add_Time_Setter(){
    var hours = 24;
    var min = 60;
    var element_Text = '';
    element_Text += "<div style ='padding: 20px; margin: 10px auto; border: 3px solid black; width: 50%; border-radius: 10px;'><select id = 'hours'>";
    for (var i = 0; i < hours; i++){
        element_Text += "<option value = '"+i+"' style = 'margin: 3px auto; border: 3px solid black; padding: 4px;' >"+i+"</option>";
    }
    element_Text += "</select>";
    element_Text += "<select id = 'min'>";
    for(var i = 0; i < min; i++){
        element_Text += "<option value = '"+i+"' style = 'margin: 3px auto; border: 3px solid black; padding: 4px;'>"+i+"</option>";
    }
    element_Text +="</select></div>";
    document.getElementById("conteiner").innerHTML += element_Text;
}
generate_Days();
add_Time_Setter();

function create_Json_File(){
    var hours = document.getElementById("hours").value;
    var min = document.getElementById("min").value;
    console.log(hours, min);
    var text_File = "{"
    var days = [["Hétfő", "monday"],["Kedd","tuesday"], ["Szerda", "wensday"], ["Csütörtök", "thursday"], ["Péntek", "friday"]];
    for (var i = 0; i < days.length; i++){
        var list = [];
        soup_Id = days[i][1]+"Soup";
        data = document.getElementById(soup_Id).value;
        if (!data){
            data = "none";
        }
        list.push(data);
        for (var k = 0; k < 3; k++){
            id = days[i][1]+k+"Menu";
            data = document.getElementById(id).value;
            if (!data){
                data = "none"
            }
            list.push(data);
        }
        if (i != days.length-1){
        text_File += '"'+days[i][1]+'"'+ ':["'+list[0]+'","'+list[1]+'","'+list[2]+'","'+list[3]+'"],';
        }
        else {
            text_File += '"'+days[i][1]+'"'+ ':["'+list[0]+'","'+list[1]+'","'+list[2]+'","'+list[3]+'"]';
        }
    }
    text_File += ',"send_Time": ['+hours+', '+min+']'
    text_File += "}";
    file = text_File;
    var req = new XMLHttpRequest;
    req.onreadystatechange = function() {
        if (this.status == 200 && this.readyState == 4){
            document.body.innerHTML = this.responseText;
        }

    }
    req.open("POST", "SET_MENU");
    req.setRequestHeader("constent-text", "application/json");
    console.log(file);
    req.send(file);
}

function insert_To_Inputs(data){
    var list = [[data.monday, "monday"], [data.tuesday, "tuesday"], [data.wensday, "wensday"], [data.thursday, "thursday"], [data.friday, "friday"]];
    for (var i = 0; i < list.length; i++){
        for (var k = 0; k < list[i][0].length;k++){
            if (list[i][0][k] != "none"){
                if (k == 0){
                    id = list[i][1]+"Soup";
                }
                else{
                    id = list[i][1]+(k-1)+"Menu";
                }
                console.log(id);
            console.log()
            document.getElementById(id).value = list[i][0][k];
            }
        }
    }
    document.getElementById("hours").value = data.send_Time[0];
    document.getElementById("min").value = data.send_Time[1];
}

function query_Json_Data(){
    req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            //console.log(this.responseText);
            data = this.responseText;
            data = String(data);
            //console.log(data);
            data = JSON.parse(data);
            //console.log(data);
            if (!data.error){
            insert_To_Inputs(data);
            }
        }
        else if (this.status == 404){

        }
    };
    req.open("POST", "x.json");
    req.send("GET_JSON_MENU");
}
query_Json_Data();