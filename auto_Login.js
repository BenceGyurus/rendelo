function auto_Login(){
    req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            data = this.responseText;
            data = JSON.parse(data);
            console.log(data);
            if (!data.error){
                console.log(data.token);
                window.token = Number(data.token);
                window.full_Name = data.full_Name;
                window.user_Id = data.id;
                get_New_Site("profile_Site.html", Number(data.token));
            }
        }
    };
    req.open("POST", "AUTO_LOGIN");
    req.send("AUTO_LOGIN")
}
auto_Login();