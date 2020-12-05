// import/require 3rd party npm packages
const inquirer = require('inquirer');
// import/require custom local file modules
const generatePage = require('./src/page-template');
const { writeFile, copyFile } = require('./utils/generate-site.js');

// .inquirer() to get user info from console prompts.  Required questions are validated
const promptUser = () => {
	return inquirer.prompt([
		{
			type     : 'input',
			name     : 'name',
			message  : 'What is your name? (Required)',
			validate : (nameInput) => {
				if (nameInput) {
					return true;
				} else {
					console.log('Please enter your name!');
					return false;
				}
			}
		},
		{
			type     : 'input',
			name     : 'github',
			message  : 'Enter your GitHub Username',
			validate : (githubInput) => {
				if (githubInput) {
					return true;
				} else {
					console.log('Please enter your GitHub Username!');
					return false;
				}
			}
		},
		{
			type    : 'confirm',
			name    : 'confirmAbout',
			message :
				'Would you like to enter some information about yourself for an "About" section?',
			default : true
		},
		{
			type    : 'input',
			name    : 'about',
			message : 'Provide some information about yourself',
			when    : ({ confirmAbout }) => confirmAbout
		}
	]);
};

const promptProject = (portfolioData) => {
	// If there's not already a 'projects' array property (on the implicitly created object), create one
	if (!portfolioData.projects) {
		portfolioData.projects = [];
	}
	console.log(`
    ==================
    Add a New Project
    ==================
  `);
	// return an object with the user's answers
	return (
		inquirer
			.prompt([
				{
					type     : 'input',
					name     : 'name',
					message  : 'What is the name of your project?',
					validate : (projectNameInput) => {
						if (projectNameInput) {
							return true;
						} else {
							console.log('Please enter the name of your project!');
							return false;
						}
					}
				},
				{
					type     : 'input',
					name     : 'description',
					message  : 'Provide a description of the project (Required)',
					validate : (descriptionInput) => {
						if (descriptionInput) {
							return true;
						} else {
							console.log('Please enter a description of the project!');
							return false;
						}
					}
				},
				{
					type    : 'checkbox',
					name    : 'languages',
					message :
						'What did you build this project with? (Check all that apply)',
					choices : [
						'JavaScript',
						'HTML',
						'CSS',
						'ES6',
						'jQuery',
						'Bootstrap',
						'Node'
					]
				},
				{
					type     : 'input',
					name     : 'link',
					message  : 'Enter the GitHub link to your project. (Required)',
					validate : (linkInput) => {
						if (linkInput) {
							return true;
						} else {
							console.log('Please enter your project link!');
							return false;
						}
					}
				},
				{
					type    : 'confirm',
					name    : 'feature',
					message : 'Would you like to feature this project?',
					default : false
				},
				{
					type    : 'confirm',
					name    : 'confirmAddProject',
					message : 'Would you like to enter another project?',
					default : false
				}
			])
			// takes all project data returned in Promise and pushes it to an array of projects, which now that it exists will not be declared in the conditional above if the conditional below is true and a new prompt is given for a new project.
			.then((projectData) => {
				portfolioData.projects.push(projectData);
				// if the confirmAddProject property of the projectData object is a true Boolean value, the promptProject() will get called again, with the array of existing projects passed along as an argument so it can be pushed to when the new project is created
				if (projectData.confirmAddProject) {
					return promptProject(portfolioData);
					// otherwise is just returns all the data
				} else {
					return portfolioData;
				}
			})
	);
};



promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });

