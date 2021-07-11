function get_New_Site(site, token){
    console.log(token);
    if (token){
    var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200){
                document.body.innerHTML = this.responseText;
                if (site == "select.html"){
                    query_Time();
                }
                else if (site == "index.html"){
                    query_Old_Data();
                }
                else if (site == "profile_Site.html"){
                    //console.log("Meghívva");
                    query_All_Profile_Data();
                }
            }
            use_Header();
        };
        req.open("POST", site);
        req.setRequestHeader("content-text", "application/json");
        if (typeof token == "number"){
        req.send(token);
        }
    }
}