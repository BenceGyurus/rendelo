var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('users.db');

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS users (fullName , username, password, rank)");
});

function query_Datas(){
    const select = "SELECT * FROM users WHERE username = ?";
    db.run(select, ["Bence"], function(err, rows){
        console.log(rows);
    });
}

query_Datas();

db.close();