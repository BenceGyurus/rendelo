function get_New_Site(site, token){
    var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200){
                document.body.innerHTML = this.responseText;
                if (site == "select.html"){
                    element_Days();
                }
            }
        };
        req.open("POST", site);
        req.setRequestHeader("content-text", "application/json");
        req.send(token);
}