// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
// TODO: Create an array of questions for user input
inquirer
  .prompt([
    {
        type: 'input',
        message: 'What is the title of your project?',
        name: 'title',
    },
    {
      type: 'input',
      message: 'What is the description of your project?',
      name: 'description',
    },
    {
      type: 'input',
      message: 'What are the installation instructions for your project?',
      name: 'installation',
    },
    {
      type: 'input',
      message: 'What are the usage instructions for your project?',
      name: 'usage',
    },
    {
        type: 'list',
        message: 'What license would you like to use?',
        name: 'license',
        choices: [
            "Apache-2",
            "MIT",
            "GPL"
        ]
    },
    {
        type: 'input',
        message: 'What are your contribution guidelines?',
        name: 'contributing',
    },
    {
        type: 'input',
        message: 'Explain any testing procedures for your project',
        name: 'tests',
    },
    {
        type: 'input',
        message: 'What is your Github user name?',
        name: 'username',
      },
    {
        type: 'input',
        message: 'What is your email address?',
        name: 'email',
    },
  ])
  .then((response) => {
    const readMeData = generateMarkdown(response);
      fs.writeFile('README.md', readMeData, (err) =>
        err ? console.error(err) : console.log('Success! Your ReadMe has been generated.')
        );
  });

function renderLicense(license) {
    if (!license) {
        return ``;
    } else {
        return `[![${license} License](https://img.shields.io/badge/License-${license}-blue)](https://opensource.org/licenses/${license})`
    }
}
function generateMarkdown(data) {
    return `
# ${data.title}

${renderLicense(data.license)}

## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Description
${data.description}

## Installation
${data.installation}

## Usage
${data.usage}

## License
This project is covered under the ${data.license} license. To learn more, please click the license badge at the top of the page.

## Contributing
${data.contributing}

## Tests
${data.tests}

## Questions
Have any questions about this project? Get in touch with me!

Github: https://github.com/${data.username}
Email: ${data.email}

`;
}


