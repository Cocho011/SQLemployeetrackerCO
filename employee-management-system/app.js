// app.js
const inquirer = require('inquirer');
const connection = require('./config');
const cTable = require('console.table');

function startApp() {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    }).then(answer => {
        switch (answer.action) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    });
}

function viewDepartments() {
    connection.query('SELECT * FROM departments', (err, results) => {
        if (err) throw err;
        console.table(results);
        startApp();
    });
}

function viewRoles() {
    connection.query('SELECT roles.id, roles.title, departments.name AS department, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id', (err, results) => {
        if (err) throw err;
        console.table(results);
        startApp();
    });
}

function viewEmployees() {
    connection.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employees 
    LEFT JOIN roles ON employees.role_id = roles.id 
    LEFT JOIN departments ON roles.department_id = departments.id 
    LEFT JOIN employees manager ON manager.id = employees.manager_id`, 
    (err, results) => {
        if (err) throw err;
        console.table(results);
        startApp();
    });
}

function addDepartment() {
    inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'Enter the name of the department:'
    }).then(answer => {
        connection.query('INSERT INTO departments SET ?', { name: answer.name }, (err) => {
            if (err) throw err;
            console.log('Department added successfully.');
            startApp();
        });
    });
}

function addRole() {
    connection.query('SELECT * FROM departments', (err, results) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Enter the title of the role:'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter the salary of the role:'
            },
            {
                name: 'department',
                type: 'list',
                message: 'Select the department:',
                choices: results.map(department => ({
                    name: department.name,
                    value: department.id
                }))
            }
        ]).then(answer => {
            connection.query('INSERT INTO roles SET ?', {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department
            }, (err) => {
                if (err) throw err;
                console.log('Role added successfully.');
                startApp();
            });
        });
    });
}

function addEmployee() {
    connection.query('SELECT * FROM roles', (err, roles) => {
        if (err) throw err;
        connection.query('SELECT * FROM employees', (err, employees) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: 'firstName',
                    type: 'input',
                    message: 'Enter the first name of the employee:'
                },
                {
                    name: 'lastName',
                    type: 'input',
                    message: 'Enter the last name of the employee:'
                },
                {
                    name: 'role',
                    type: 'list',
                    message: 'Select the role:',
                    choices: roles.map(role => ({
                        name: role.title,
                        value: role.id
                    }))
                },
                {
                    name: 'manager',
                    type: 'list',
                    message: 'Select the manager:',
                    choices: employees.map(employee => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    })).concat([{ name: 'None', value: null }])
                }
            ]).then(answer => {
                connection.query('INSERT INTO employees SET ?', {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.role,
                    manager_id: answer.manager
                }, (err) => {
                    if (err) throw err;
                    console.log('Employee added successfully.');
                    startApp();
                });
            });
        });
    });
}

function updateEmployeeRole() {
    connection.query('SELECT * FROM employees', (err, employees) => {
        if (err) throw err;
        connection.query('SELECT * FROM roles', (err, roles) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: 'employee',
                    type: 'list',
                    message: 'Select the employee to update:',
                    choices: employees.map(employee => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    }))
                },
                {
                    name: 'role',
                    type: 'list',
                    message: 'Select the new role:',
                    choices: roles.map(role => ({
                        name: role.title,
                        value: role.id
                    }))
                }
            ]).then(answer => {
                connection.query('UPDATE employees SET ? WHERE ?', [
                    { role_id: answer.role },
                    { id: answer.employee }
                ], (err) => {
                    if (err) throw err;
                    console.log('Employee role updated successfully.');
                    startApp();
                });
            });
        });
    });
}

// Start the application
startApp();
