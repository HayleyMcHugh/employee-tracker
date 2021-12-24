const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "company_db"
});

connection.connect(function (err) {
    if (err) throw err;
});

function startPrompt() {
  inquirer.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        name: "firstchoice",
        choices: [
                "View All Employees?",
                "View All Employees by Roles?",
                "View All Employees by Departments?",
                "Update Current Employee?",
                "Add Employee?",
                "Add Role?",
                "Add Department?",
                ]
    }
  ]).then(function(val) {
      switch (val.firstchoice) {
        case "View All Employees?":
            viewAllEmployees();
        break;

        case "View All Employees by Roles?":
            viewAllRoles();
        break;

        case "View All Employees by Departments?":
            viewAllDepartments();
        break;

        case "Update Current Employee?":
            updateCurrentEmployee();
        break;

        case "Add Employee?":
            addNewEmployee();
        break;

        case "Add Role?":
            addNewRole();
        break;

        case "Add Department?":
            addNewDepartment();
        break;
      }
  })
}

startPrompt();
  
function viewAllEmployees() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;",
    function(err, res) {
        if(err) throw err
        console.table(res)
        startPrompt()
    })
}

function viewAllRoles() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;",
    function(err, res) {
        if(err) throw err
        console.table(res)
        startPrompt()
    })
}

function viewAllDepartments() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, department.name FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;",
    function(err, res) {
        if(err) throw err
        console.table(res)
        startPrompt()
    })
}

var roleArray = [];
function selectRole() {
    connection.query("SELECT * FROM role", function(err, res) {
        if(err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
        }
    })
    return roleArray;
}

var managerArray = [];
function selectManager() {
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
        if(err) throw err 
        for (var i = 0; i < res.length; i++) {
            managerArray.push(res[i].first_name);
        }
    })
    return managerArray;
}

function addNewEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstname",
            message: "Please enter the employees first name"
        },
        {
            type: "input",
            name: "lastname",
            message: "Please enter the employees last name"
        },
        {
            type: "list",
            name: "role",
            message: "What is the employees role?",
            choices: selectRole()
        },
        {
            type: "list",
            name: "manager",
            message: "What is the employees managers name?",
            choices: selectManager()
        }
    ]).then(function (val) {
        var roleID = selectRole().indexOf(val.role) + 1
        var managerID = selectManager().indexOf(val.manager) + 1
        connection.query("INSERT INTO employee SET ?",
        {
            first_name: val.firstname,
            last_name: val.lastname,
            manager_id: managerID,
            role_id: roleID,

        }, function(err) {
            if(err) throw err
            console.table(val)
            startPrompt()
        })
    })
}

function updateCurrentEmployee() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
        if(err) throw err
        inquirer.prompt([
            {
                type: "list",
                name: "lastName",
                choice: function(){
                    var lastName =[];
                    for (var i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                    }
                    return lastName;
                },
                message: "What is the employees last name?",
            },
            {
                type: "list",
                name: "role",
                message: "What is the employees new title?",
                choices: selectRole()
            },
        ]).then(function(val) {
            var roleID = selectRole().indexOf(val.role) + 1
            connection.query("UPDATE employee SET WHERE ?",
            {
                last_name: val.lastName
            },
            {
                role_id: roleID
            },
            function(err){
                if(err) throw err
                console.table(val)
                startPrompt()
            })
        });
    });
}

function addNewRole() {
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role", function (err, res) {
        inquirer.prompt([
            {
                type: "input",
                name: "Title",
                message: "What is the new roles Title?"
            },
            {
                type: "input",
                name: "Salary",
                message: "What is the new roles Salary?"
            }
        ]).then(function(res) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: res.Title,
                    salary: res.Salary,
                },
                function(err) {
                    if(err) throw err
                    console.table(res);
                    startPrompt();
                })
        });
    });
}

function addNewDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "What Department would you like to add?"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ?",
            {
                name: res.department
            },
            function(err) {
                if(err) throw err
                console.table(res);
                startPrompt()
            })
    })
}
