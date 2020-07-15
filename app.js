// const profileDataArgs = process.argv.slice(2, process.argv.length);
// // console.log(profileDataArgs);

// const printProfileData = profileDataArr => {
//   for (let i = 0; i < profileDataArr.length; i += 1) {
//     console.log(profileDataArr[i]);
//   }

//   console.log('==============================')

// .forEach() is an es6 array method that offers the same iterating functionality as a for loop.  the method takes a callback function which executes on each element in the array (which is passed as an arbitrarily named argument to the callback...profileItem in this case)
//   profileDataArr.forEach(profileItem => console.log(profileItem));
// };

// printProfileData(profileDataArgs);

// const fs = require('fs');
// const generatePage = require('./src/page-template');

// const profileDataArgs = process.argv.slice(2, process.argv.length);
// const profileDataArgs = process.argv.slice(2);
// const name = profileDataArgs[0];
// const github = profileDataArgs[1];
// const [name, github] = profileDataArgs;

// removed to page-template to reduce file bloat
// const generatePage = (name, github) => {
//   return `
//   <!DOCTYPE html>
//   <html lang="en"
//   <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     <title>Portfolio Demo</title>
//   </head>

//   <body>
//     <h1>${name}</h1>
//     <h2><a href="https://github.com/${github}">Github</a></h2>
//   </body>
//   </html>
//   `;
// };

// const pageHTML = generatePage(porfolioData);

// fs.writeFile('index.html', generatePage(name, github), err => {
//   if (err) throw new Error(err);

//   console.log('Portfolio complete!  Check out index.html to see the output')
// })

// **********************************************ALL THE ABOVE IS FOR PEDAGOGICALLY PURPOSES ONLY***********************************

// import/require native Node.js modules
const fs = require('fs');
// import/require 3rd party npm packages
const inquirer = require('inquirer');
// import/require custom local file modules
const generatePage = require('./src/page-template');

// .inquirer() to get user info from console prompts.  Required questions are validated
const promptUser = () => {
	return inquirer.prompt([
		{
			type     : 'input',
			name     : 'name',
			message  : 'What is your name? (Required)',
			// the validate method on takes in the user input on this question object as an argument.  if there is user input it passes and continues the function execution, if not, it fails and shows a message to the user to put some input.  it will repeat until the user complies.
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
		// this object question type (confirm) works in conjunction with the associated input type via the key that inquirer automatically puts on the answers object (while setting the value to whatever the user answers) which corresponds to the value of the name key in the confirm type question object. if an input type has a when method on itself, it will only run and display the input if the answer to its associated confirm question type is affirmative.  when the when method of an input type receives the entire answers object, it destructures the object to obtain the property whose key corresponds to the name of the when's parameter. in this case the value of that property is a boolean, if it returns true, the input is showed to get the user about info.  otherwise it continues on without the info
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

// .inquirer() to get project info from console prompts. takes an object as an argument
//
// we never explicitly define portfolioData as an object.  how are we implicitly declaring it an object whose properties we can access as here if they exist?

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

// call promptUser() to run .inquirer which will ask user ?s (some conditionally...'about') in the console to gather the data that will populate the portfolio programmatically.  when a promise is returned with all the data back, all validated, about the user data, .then the promptProject() function runs to get the project info, and this will run recursively based on a user's response to a prompt (conditionally...another project?).  once all the data is back, it gets passed as an object to the page-template function from the required custom file module.

// COMMENT OUT BELOW FOR TESTING PURPOSES WITH MOCK DATA
// promptUser()
// 	// QUESTION---at this point is the user data part of the projectData object that will get passed down through the promptProject questions and returned to the next then which calls the generatePage method with all the portfolioData.  is the user data and the project data stored in the same global Promise object?
// 	.then(promptProject)
// 	.then((portfolioData) => {
// 		const pageHTML = generatePage(portfolioData);

// 		// the native Node.js module 'fs' allows us to read and write files to the computer's hard drive via the OS file system so we can automatically generate an HTML page programmatically from JS.
// 		// this function can create multiple file types, including TXT, PDF, HTML, JSON, and more. The fs.writeFile() function definition has three arguments. The first argument is the name of the file that's being created. The next argument is the data that will write onto the file, in this case the HTML template literal coming back from our page-template module. The last parameter is a callback function that will be used for error handling.
		// fs.writeFile('./index.html', pageHTML, (err) => {
		// 	if (err) throw new Error(err);

		// 	console.log(
		// 		'Page created!  Check out index.html in this directory to see it!'
		// 	);
		// });
// 	});


const mockData = {
  name: 'Lernantino',
  github: 'lernantino',
  confirmAbout: true,
  about:
    'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
  projects: [
    {
      name: 'Run Buddy',
      description:
        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
      languages: ['HTML', 'CSS'],
      link: 'https://github.com/lernantino/run-buddy',
      feature: true,
      confirmAddProject: true
    },
    {
      name: 'Taskinator',
      description:
        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
      languages: ['JavaScript', 'HTML', 'CSS'],
      link: 'https://github.com/lernantino/taskinator',
      feature: true,
      confirmAddProject: true
    },
    {
      name: 'Taskmaster Pro',
      description:
        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
      languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
      link: 'https://github.com/lernantino/taskmaster-pro',
      feature: false,
      confirmAddProject: true
    },
    {
      name: 'Robot Gladiators',
      description:
        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
      languages: ['JavaScript'],
      link: 'https://github.com/lernantino/robot-gladiators',
      feature: false,
      confirmAddProject: false
    }
  ]
};


// TESTING PURPOSES WITH MOCK DATA
const pageHTML = generatePage(mockData)

fs.writeFile('./index.html', pageHTML, (err) => {
  if (err) throw new Error(err);

  console.log(
    'Page created!  Check out index.html in this directory to see it!'
  );
});
