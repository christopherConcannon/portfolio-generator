// create the about section
const generateAbout = (aboutText) => {
	if (!aboutText) {
		return '';
	}

	return `
    <section class="my-3" id="about">
      <h2 class="text-dark bg-primary p-2 display-inline-block">About Me</h2>
      <p>${aboutText}<p>
    </section>
  `;
};

const generateProjects = projectsArr => {

// first version with no distinction between featured and non-featured
// // create new array of interpolated HTML for each project using map.  destructure the object properties in line when it is passed as argument to map method
// const projectHtmlArr = projectsArr.map(({ name, description, languages, link }) => {
//   return `
//     <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
//       <h3 class="portfolio-item-title text-light">${name}</hx>
//       <h5 class="portfolio-languages">
//         Built With: 
//         ${languages.join(', ')}
//       </h5>
//       <p>${description}</p>
//       <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
//     <div>
//   `;
// });

// SECOND VERSION CREATING SEPERATE ARRAYS FOR FEATURED/NONFEATURED
  // get array of just featured projects
  // const featuredProjects = projectsArr.filter(project => {
  //   if (project.feature) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // });

  // // get array of all non-featured projects
  // const nonFeaturedProjects = projectsArr.filter(project => {
  //   if (!project.feature) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // });

  // const featuredProjectHtmlArr = featuredProjects.map(({ name, description, languages, link }) => {
  //   return `
  //     <div class="col-12 mb-2 bg-dark text-light p-3 flex-column">
  //       <h3 class="portfolio-item-title text-light">${name}</hx>
  //       <h5 class="portfolio-languages">
  //         Built With: 
  //         ${languages.join(', ')}
  //       </h5>
  //       <p>${description}</p>
  //       <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
  //     <div>
  //   `;
  // });

  // const nonFeaturedProjectHtmlArr = nonFeaturedProjects.map(({ name, description, languages, link }) => {
  //   return `
  //     <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
  //       <h3 class="portfolio-item-title text-light">${name}</hx>
  //       <h5 class="portfolio-languages">
  //         Built With: 
  //         ${languages.join(', ')}
  //       </h5>
  //       <p>${description}</p>
  //       <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
  //     <div>
  //   `;
  // });
  // // when outputting newly mapped array of HTML for each project, use join to combine all array elements into one string of HTML (this isn't React so you have to handle that)
  // return `
  //   <section class="my-3" id="portfolio">
  //     <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
  //     <div class="flex-row justify-space-between">
  //       ${featuredProjectHtmlArr.join('')}
  //       ${nonFeaturedProjectHtmlArr.join('')}
  //     </div>
  //   </section>
  // `

  // THIRD VERSION REFACTORED
  return `
    <section class="my-3" id="portfolio">
      <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
      <div class="flex-row justify-space-between">
        ${projectsArr
          .filter(({ feature }) => feature)
          .map(({ name, description, languages, link  }) => {
            return `
            <div class="col-12 mb-2 bg-dark text-light p-3 flex-column">
              <h3 class="portfolio-item-title text-light">${name}</hx>
              <h5 class="portfolio-languages">
                Built With: 
                ${languages.join(', ')}
              </h5>
              <p>${description}</p>
              <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
            <div>
            `;
          })
          .join('')
        }

        ${projectsArr
          .filter(({ feature }) => !feature)
          .map(({ name, description, languages, link  }) => {
            return `
            <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
              <h3 class="portfolio-item-title text-light">${name}</hx>
              <h5 class="portfolio-languages">
                Built With: 
                ${languages.join(', ')}
              </h5>
              <p>${description}</p>
              <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
            <div>
            `;
          })
          .join('')
        }
      </div>
    </section>
  `;


}

module.exports = (templateData) => {
	console.log(templateData);

	// destructure projects and about data from templateData based on their property key names.  the rest operator (...) takes everything that's left from the templateData object (minus projects and about) and stores it in an object named header
	const { projects, about, ...header } = templateData;
	// console.log(header)
	// console.log(about)
	// console.log(projects)
	// we could do this to package up the header data in one object, instead we will use the rest operator above (...header)
	// const header = {
	//   name: templateData.name,
	//   github: templateData.github
	// }

	return `
  <!DOCTYPE html>
  <html lang="en"

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Portfolio Demo</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
    <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
  </head>

  <body>
    <header>
      <div class="container flex-row justify-space-between align-center py-3">
        <h1 class="page-title text-secondary bg-dark py-2 px-3">${header.name}</h1>
        <nav class="flex-row">
          <a class="ml-2 my-1 px-2 py-1 bg-secondary text-dark" href="https:github.com/${header.github}">Github</a>
        </nav>
      </div>
    </header>
    <main class="container my-5">
      ${generateAbout(about)}
      ${generateProjects(projects)}
    </main>
    <footer class="container text-center py-3">
      <h3 class="text-dark">&copy; ${new Date().getFullYear()} by ${header.name}</h3>
    </footer>
  </body>
  </html>
  `;
};

// {
//   name: 'Lernantino',
//   github: 'lernantino',
//   confirmAbout: true,
//   about:
//     'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
//   projects: [
//     {
//       name: 'Run Buddy',
//       description:
//         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//       languages: ['HTML', 'CSS'],
//       link: 'https://github.com/lernantino/run-buddy',
//       feature: true,
//       confirmAddProject: true
//     },
//     {
//       name: 'Taskinator',
//       description:
//         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//       languages: ['JavaScript', 'HTML', 'CSS'],
//       link: 'https://github.com/lernantino/taskinator',
//       feature: true,
//       confirmAddProject: true
//     },
//     {
//       name: 'Taskmaster Pro',
//       description:
//         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//       languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
//       link: 'https://github.com/lernantino/taskmaster-pro',
//       feature: false,
//       confirmAddProject: true
//     },
//     {
//       name: 'Robot Gladiators',
//       description:
//         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
//       languages: ['JavaScript'],
//       link: 'https://github.com/lernantino/robot-gladiators',
//       feature: false,
//       confirmAddProject: false
//     }
//   ]
// };
