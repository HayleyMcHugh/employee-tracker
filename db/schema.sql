DROP DATABASE IF EXISTS company_db;
CREATE database company_db;

USE company_db;

CREATE TABLE department(
  id INT AUTO_INCREMENT,
  name VARCHAR(50),
  PRIMARY KEY (id)
);
CREATE TABLE role(
  id INT AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(15, 2),
  department_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);
CREATE TABLE employee (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR (30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE
);


-- DROP DATABASE IF EXISTS company_db;
-- CREATE DATABASE company_db;

-- USE company_db;

-- CREATE TABLE employee (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     first_name VARCHAR(40) NOT NULL, 
--     last_name VARCHAR(40) NOT NULL, 
--     role_id INT NOT NULL, 
--     FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
--     manager_id INT,
--     FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL 
-- );

-- CREATE TABLE role (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     title VARCHAR(40) NOT NULL,
--     salary DECIMAL NOT NULL, 
--     department_id INT NOT NULL, 
--     FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
-- );

-- CREATE TABLE department (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(40) NOT NULL
-- );

