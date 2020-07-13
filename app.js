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

const inquirer = require('inquirer');

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name', 
      message: 'What is your name?'
    },
    {
      type: 'input',
      name: 'github', 
      message: 'Enter your GitHub Username'
    },
    {
      type: 'input',
      name: 'about', 
      message: 'Provide some information about yourself'
    }
  ])
}

const promptProject = portfolioData => {
  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  console.log(`
    ==================
    Add a New Project
    ==================
  `);
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name', 
      message: 'What is the name of your project?'
    },
    {
      type: 'input',
      name: 'description', 
      message: 'Provide a description of the project (Required)'
    },
    {
      type: 'checkbox',
      name: 'languages', 
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link', 
      message: 'Enter the GitHub link to your project. (Required)'
    },
    {
      type: 'confirm',
      name: 'feature', 
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject', 
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData
    }
  })
}

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  })

