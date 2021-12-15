const mysql = require("mysql12");

const appConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "company"
});

appConnection.connect(function (err) {
    if (err) throw err;
});

module.exports = appConnection