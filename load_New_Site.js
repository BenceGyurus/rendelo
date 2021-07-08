function get_New_Site(site, token){
    if (token){
    var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200){
                document.body.innerHTML = this.responseText;
                if (site == "select.html"){
                    element_Days();
                }
                else if (site == "index.html"){
                    query_Old_Data();
                }
                else if (site == "profile_Site.html"){
                    //console.log("Meghívva");
                    query_All_Profile_Data();
                }
            }
        };
        req.open("POST", site);
        req.setRequestHeader("content-text", "application/json");
        req.send(token);
    }
}