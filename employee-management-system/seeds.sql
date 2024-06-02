-- Drop the database if it exists to ensure a clean slate
DROP DATABASE IF EXISTS company_db;

-- Create a new database named company_db
CREATE DATABASE company_db;

-- Select the company_db database to use for subsequent operations
USE company_db;

-- Create the department table
CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each department, auto-incremented
  name VARCHAR(30) NOT NULL -- Name of the department, cannot be null
);

-- Create the role table
CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each role, auto-incremented
  title VARCHAR(30) NOT NULL, -- Title of the role, cannot be null
  salary DECIMAL NOT NULL, -- Salary for the role, cannot be null
  department_id INT, -- Foreign key referencing the department id
  FOREIGN KEY (department_id) REFERENCES department(id) -- Ensures department_id matches an id in the department table
);

-- Create the employee table
CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each employee, auto-incremented
  first_name VARCHAR(30) NOT NULL, -- First name of the employee, cannot be null
  last_name VARCHAR(30) NOT NULL, -- Last name of the employee, cannot be null
  role_id INT, -- Foreign key referencing the role id
  manager_id INT, -- Foreign key referencing the employee id of the manager
  FOREIGN KEY (role_id) REFERENCES role(id), -- Ensures role_id matches an id in the role table
  FOREIGN KEY (manager_id) REFERENCES employee(id) -- Ensures manager_id matches an id in the employee table
);

-- Insert initial data into the department table
INSERT INTO department (name) VALUES 
('Sales'), -- Sales department
('Engineering'), -- Engineering department
('Finance'); -- Finance department

-- Insert initial data into the role table
INSERT INTO role (title, salary, department_id) VALUES 
('Sales Manager', 60000, 1), -- Sales Manager role, salary 60000, belongs to Sales department (id 1)
('Software Engineer', 80000, 2), -- Software Engineer role, salary 80000, belongs to Engineering department (id 2)
('Accountant', 70000, 3); -- Accountant role, salary 70000, belongs to Finance department (id 3)

-- Insert initial data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL), -- John Doe, Sales Manager (role_id 1), no manager
('Jane', 'Smith', 2, 1), -- Jane Smith, Software Engineer (role_id 2), manager is John Doe (id 1)
('Jack', 'White', 3, NULL); -- Jack White, Accountant (role_id 3), no manager
