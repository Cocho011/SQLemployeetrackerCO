// Import the inquirer module for creating interactive command-line prompts
import inquirer from 'inquirer';

// Define an asynchronous function named testPrompt
async function testPrompt() {
    // Use inquirer to prompt the user with a question
    const answer = await inquirer.prompt({
        name: 'action', // Name of the prompt, which will be used as the key in the answer object
        type: 'list', // Type of the prompt (list of choices)
        message: 'What would you like to do?', // Message to display to the user
        choices: [
            'Option 1', // First choice in the list
            'Option 2', // Second choice in the list
            'Option 3'  // Third choice in the list
        ] // List of choices for the user to select from
    });

    // Log the user's selection to the console
    console.log('You selected:', answer.action);
}

// Call the testPrompt function to execute the prompt and handle user input
testPrompt();
