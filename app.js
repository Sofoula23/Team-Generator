const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const team = []
const id = []

function appInfo() {
 createManager();
 function createManager(){
     console.log("Build your team");
     inquirer.prompt([
         { 
         type: "input",
         name: "managerName",
         message: "What is your manager's name?"
         //validate input
         }, 
         {
             type: "input",
             name: "managerId",
             message: "What is your manager's id?",
         },
         {
             type: "input",
             name: "managerEmail",
             message: "What is your manager's email?",
         },     
         {
            type: "input",
            name: "managerOfficeNumber",
            message: "What is your manager's office number?",
        }     
     ]).then(answers => {
         const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
         console.log(manager);
         team.push(manager)
         id.push( answers.managerId )
         buildTeam()
     });
 }

function buildTeam() {
    inquirer.prompt([
        {
         type:"list",
         name:"teamMembers",
         message:"What type of team member would you like to add?",   
         choices:["Engineer", "Intern", "not looking to add more members"]
        }

    ]).then(roleChoice => {
        if (roleChoice.teamMembers === "Engineer"){
            createEngineer();

        } else if (roleChoice.teamMembers === "Intern") {
            createIntern()

        } else {
        fs.writeFileSync(outputPath, render(team), "utf-8")
        }
    })
}
 function createEngineer(){
     console.log("Build your team");
     inquirer.prompt([
         { 
         type: "input",
         name: "engineerName",
         message: "What is your name?"
         //validate input
         }, 
         {
             type: "input",
             name: "engineerId",
             message: "What is your id?",
         },
         {
             type: "input",
             name: "engineerEmail",
             message: "What is your email?",
         },     
         {
            type: "input",
            name: "github",
            message: "What is your Github account?",
        }     
     ]).then(answers => {
         const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.github);
         console.log(engineer);
         team.push(engineer)
         id.push(answers.engineerId)
         buildTeam()
     });
 }
 
 function createIntern(){
     console.log("Build your team");
     inquirer.prompt([
         { 
         type: "input",
         name: "internName",
         message: "What is your name?"
         //validate input
         }, 
         {
             type: "input",
             name: "internId",
             message: "What is your id?",
         },
         {
             type: "input",
             name: "internEmail",
             message: "What is your email?",
         },     
         {
            type: "input",
            name: "school",
            message: "What is your school name?",
        }     
     ]).then(answers => {
         const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.school);
         console.log(intern);
         team.push(intern)
         id.push( answers.internId )
         buildTeam()
     }).catch(error => console.log (error)
     );
     
     function createOutputFile() {
      fs.writeFileSync(outputPath, render(team), "utf-8")
     }
 }

}

appInfo()
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
