const appConnection = require("./connection");

class DATABASE {
    constructor(appConnection) {
        this.appConnection = appConnection;
    }

findAllEmployees() {
    return this.appConnection.promise().query(
        "Select employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) as manager from employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
}

finaAllPossibleManagers(employeeId) {
    return this.appConnection.promise().query(
        "Select id, first_name, last_name from employee where id != ?",
        employeeId
    );
}

createNewEmployee(employee) {
    return this.appConnection.promise().query("Insert into employee set ?", employee);
}

removeCurrentEmployee(employeeId) {
    return this.appConnection.promise().query(
        "Delete from employee where id = ?",
        employeeId
    );
}

updateCurrentEmployeeRole(employeeId, roleId) {
    return this.appConnection.promise().query(
        "Update employee set role_id = ? where id = ?",
        [roleId, employeeId]
    );
}

updateManager(employeeId, managerId) {
    return this.appConnection.promise().query(
        "Update employee set manager_id = ? where id = ?",
        [managerId, employeeId]
    );
}

findAllRoles() {
    return this.appConnection.promise().query(
        "Select role.id, role.title, department.name as department, role.salary from role LEFT JOIN department on role.department_id = department.id;"
    );
}

createNewRole(role) {
    return this.appConnection().query("Insert into role set = ?", role);
}

removeCurrentRole(roleId) {
    return this.appConnection.promise().query("Delete from role where id = ?", roleId);
}

findAllDepts() {
    return this.appConnection.promise().query(
        "Select department.id, department.name from department;"
    );
}

viewDeptFinancials() {
    return this.appConnection.promise().query(
        "Select department.id, department.name, SUM(role.salary) as utilized_budget from employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id group by department.id, department.name;"
    );
}

createNewDept(department) {
    return this.appConnection.promise().query("Insert into department set ?", department);
}

removeDept(departmentId) {
    return this.appConnection.promise().query(
        "Delete from department where id =?",
        departmentId
    );
}

findEmployeesByDept(departmentId) {
    return this.appConnection.promise().query(
        "Select employee.id, employee.first_name, employee.last_name, role.titlefrom employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id where department.id = ?;",  
        departmentId
    );
}

findEmployeesByManager(managerId) {
    return this.appConnection.promise().query(
        "Select employee.id, employee.first_name, employee.last_name, department.name as department, role.title from employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department on department.id = role.department_id where id = ?;",
        managerId
    );
}
}

module.exports = new DATABASE(appConnection);