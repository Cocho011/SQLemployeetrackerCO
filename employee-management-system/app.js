const inquirer = require('inquirer');
const connection = require('./config');
const dbQueries = require('./dbQueries');

function mainMenu() {
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
                dbQueries.viewAllDepartments(mainMenu);
                break;
            case 'View all roles':
                dbQueries.viewAllRoles(mainMenu);
                break;
            case 'View all employees':
                dbQueries.viewAllEmployees(mainMenu);
                break;
            case 'Add a department':
                dbQueries.addDepartment(mainMenu);
                break;
            case 'Add a role':
                dbQueries.addRole(mainMenu);
                break;
            case 'Add an employee':
                dbQueries.addEmployee(mainMenu);
                break;
            case 'Update an employee role':
                dbQueries.updateEmployeeRole(mainMenu);
                break;
            case 'Exit':
                connection.end();
                break;
        }
    });
}

mainMenu();
