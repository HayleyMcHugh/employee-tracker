DROP DATABASE IF EXISTS company;
CREATE DATABASE company;

USE company;

CREATE TABLE employee {
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(40) NOT NULL, 
    last_name VARCHAR(40) NOT NULL, 
    role_id INT NOT NULL, 
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL 
};

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(40) NOT NULL,
    salary DECIMAL NOT NULL, 
    department_id INT NOT NULL, 
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40) NOT NULL
);

