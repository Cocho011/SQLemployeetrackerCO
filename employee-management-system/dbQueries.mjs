// Import the inquirer module for creating interactive command-line prompts
import inquirer from 'inquirer';

// Define the DBQueries class to handle database queries
class DBQueries {
    // Constructor to initialize the connection property
    constructor(connection) {
        this.connection = connection; // Store the database connection
    }

    // Method to view all departments
    async viewAllDepartments() {
        // Execute a SQL query to select all departments
        const [rows] = await this.connection.query('SELECT * FROM department');
        // Display the result as a table in the console
        console.table(rows);
    }

    // Method to view all roles
    async viewAllRoles() {
        // Execute a SQL query to select all roles with their corresponding department names and salaries
        const [rows] = await this.connection.query(`
            SELECT role.id, role.title, department.name AS department, role.salary
            FROM role
            LEFT JOIN department ON role.department_id = department.id
        `);
        // Display the result as a table in the console
        console.table(rows);
    }

    // Method to view all employees
    async viewAllEmployees() {
        // Execute a SQL query to
