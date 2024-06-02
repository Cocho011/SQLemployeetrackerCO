// Importing required modules
import inquirer from 'inquirer'; // Inquirer is used for creating interactive command-line prompts
import mysql from 'mysql2/promise'; // MySQL2 with promise support for interacting with the MySQL database
import { config } from 'dotenv'; // Dotenv is used to load environment variables from a .env file
import DBQueries from './dbQueries.mjs'; // Importing the DBQueries class for database operations
import 'console.table'; // Console.table is used to display tabular data in the console

// Load environment variables from the .env file
config();

// Create a connection to the MySQL database using environment variables
const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost', // Database host
    user: process.env.DB_USER, // Database user
    password: process.env.DB_PASSWORD, // Database password
    database: process.env.DB_NAME, // Database name
    port: process.env.DB_PORT || 3306 // Database port (default is 3306)
});

// Log a message to indicate successful connection to the database
console.log('Connected to the database.');

// Instantiate the DBQueries class with the database connection
const dbQueries = new DBQueries(connection);

// Define the main menu function to display options and handle user input
async function mainMenu() {
    // Prompt the user with a list of actions
    const answer = await inquirer.prompt({
        name: 'action', // Name of the prompt
        type: 'list', // Type of the prompt (list of choices)
        message: 'What would you like to do?', // Message to display
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ] // List of choices for the user to select
    });

    // Handle the user's selection with a switch statement
    switch (answer.action) {
        case 'View all departments':
            await dbQueries.viewAllDepartments(); // View all departments
            break;
        case 'View all roles':
            await dbQueries.viewAllRoles(); // View all roles
            break;
        case 'View all employees':
            await dbQueries.viewAllEmployees(); // View all employees
            break;
        case 'Add a department':
            await dbQueries.addDepartmentPrompt(); // Add a new department
            break;
        case 'Add a role':
            await dbQueries.addRolePrompt(); // Add a new role
            break;
        case 'Add an employee':
            await dbQueries.addEmployeePrompt(); // Add a new employee
            break;
        case 'Update an employee role':
            await dbQueries.updateEmployeeRolePrompt(); // Update an employee's role
            break;
        case 'Exit':
            await connection.end(); // End the database connection
            return; // Exit the application
    }

    // Call the mainMenu function again to display the menu after an action is completed
    mainMenu();
}

// Call the mainMenu function to start the application
mainMenu();
