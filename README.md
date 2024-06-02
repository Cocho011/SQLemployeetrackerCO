# Employee Management System (Employee Tracker)

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)
- [Questions](#questions)

## Description

The Employee Management System is a command-line application built using Node.js, Inquirer, and MySQL. It allows a company to manage its employee database, including viewing departments, roles, and employees, as well as adding and updating employee information. This application aims to simplify the process of managing employee data by providing an interactive interface for performing CRUD operations on the database.

## Installation

To set up the project locally, follow these steps:

1. Clone the Repository
2. Install Dependencies
3. Set Up Environment Variables
4. Set Up the Database
5. Run Necessary Tests
6. Run Application 

## Usage

To start the application, run:

node app.mjs

## Features

- View Departments: Displays a list of all departments.
- View Roles: Displays a list of all roles, including department names and salaries.
- View Employees: Displays a list of all employees, including their roles, departments, and managers.
- Add Department: Prompts the user to enter a new department name and adds it to the database.
- Add Role: Prompts the user to enter a new role title, salary, and department ID, then adds it to the database.
- Add Employee: Prompts the user to enter employee details, including first name, last name, role ID, and manager ID, then adds the employee to the database.
- Update Employee Role: Prompts the user to select an employee and enter a new role ID, then updates the employee's role in the database.

## Technologies 

- Node.js: JavaScript runtime environment.
- Inquirer: For creating interactive command-line prompts.
- MySQL: Relational database management system.
- dotenv: For managing environment variables.
- console.table: For displaying tabular data in the console.

## Contributing

Contributions are welcome! To contribute:

- Fork the repository.
- Create a new branch (git checkout -b feature-branch).
- Make your changes.
- Commit your changes (git commit -m 'Add new feature').
- Push to the branch (git push origin feature-branch).
- Create a pull request.

## License 

This project is licensed under the MIT License - see the LICENSE file for details.

## Questions

For questions or concerns about this project, please contact: Carolina Ochoa

Email:cocho011@fiu.edu GitHub Username: Cocho011 GitHub Profile: https://github.com/Cocho011