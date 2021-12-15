const mysql = require("mysql12");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "company"
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection