// Load environment variables from a .env file into process.env
require('dotenv').config();

// Import the mysql2 module for interacting with the MySQL database
const mysql = require('mysql2');

// Log a message to the console indicating which database is being connected to and as which user
console.log(`Connecting to database ${process.env.DB_NAME} as ${process.env.DB_USER}`);

// Create a connection to the MySQL database using credentials and details from environment variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost', // Database host, defaulting to 'localhost' if not specified
  user: process.env.DB_USER, // Database user from environment variable
  password: process.env.DB_PASSWORD, // Database password from environment variable
  database: process.env.DB_NAME, // Database name from environment variable
  port: process.env.DB_PORT || 3306 // Database port, defaulting to 3306 if not specified
});

// Connect to the MySQL database
connection.connect((err) => {
  // If there is an error connecting to the database, throw an error
  if (err) throw err;
  // Log a message to the console indicating a successful connection
  console.log('Connected to the database.');
});

// Export the database connection for use in other parts of the application
module.exports = connection;
