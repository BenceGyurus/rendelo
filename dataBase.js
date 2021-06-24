var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('users.db');

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS users (fullName , username, password, rank)");
});

query_Datas();

db.close();