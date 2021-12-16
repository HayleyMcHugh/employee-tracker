use company_db;

INSERT INTO
  department(name)
VALUES
  ("Engineering"),
  ("Finance"),
  ("Legal"),
  ("Sales");
  
INSERT INTO
  role(title, salary, department_id)
VALUES
  ("Accountant", 130000, 1),
  ("Account Manager", 150000, 1),
  ("Lawyer", 200000, 2),
  ("Legal Team Lead", 180000, 2),
  ("Lead Engineer", 170000, 3),
  ("Software Engineer", 150000, 3),
  ("Sales Lead", 90000, 4),
  ("Salesperson", 75000, 4);
 
INSERT INTO
  employee(first_name, last_name, role_id, manager_id)
VALUES
  ("Sarah", "Tobin", 1, NULL),
  ("Molly", "Hansen", 2, 1),
  ("Danny", "Tomas", 3, NULL),
  ("Allison", "Crisp", 4, 2),
  ("Ben", "Mathers", 5, NULL),
  ("Ava", "Kirigin", 6, 3),
  ("Beau", "Smith", 7, NULL),
  ("Kourtney", "Brown", 8, 4);


