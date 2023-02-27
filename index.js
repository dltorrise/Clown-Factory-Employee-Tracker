// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// what does formatted mean??
//WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database


//*IMPORTS*
var inquirer = require('inquirer');
//imports sql library
const mysql = require('mysql2');
const cTable = require('console.table');
const { last } = require('rxjs');

//*PROMPTS*
//questions that enduser will get asked when first running the application
const firstQuestion = [
    {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    },
]

const addDepartmentQuestions = [
    {
        type: 'input',
        name: 'departmentName',
        message: "What is the name of the department you would like to add?",
        default: 'Suggested: Makeup Department'

    },
]

const addRoleQuestions = [
    {
        type: 'input',
        name: 'roleName',
        message: "What is the name of the role you would like to add?",
        default: 'Suggested: Sr. Makeup Artist'

    },
    {
        type: 'input',
        name: 'roleSalary',
        message: "What is the salary for this role?",
        default: '.8'

    },
    {
        type: 'input',
        name: 'roleDepartment',
        message: "What is the name of the role you would like to add?",
    },
]


const addEmployeeQuestions = [
    {
        type: 'input',
        name: 'firstName',
        message: "For the employee you want to add, what is their first name?",
        default: "Suggested: Jester"

    },
    {
        type: 'input',
        name: 'lastName',
        message: "What is their last name?",
        default: "Suggested: Del Clown"

    },
    {
        type: 'input',
        name: 'roleDepartment',
        message: "What is the name of the role you would like to add?",
        default: 'Suggested: Sr. Makeup Artist'

    },
]





//*VARIABLES AND FUNCTIONS*

//initialized the main questions and creates an html file
function init() {
    inquirer
        .prompt(firstQuestion)
        .then((answer) => {

            console.log(answer)
            //'View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'
            //gives enduser option to add more team members or complete document
            if (answer.menu === 'View all departments') {
                viewDepartments()
            } else if (answer.menu === 'View all roles') {
                viewRoles()
            } else if (answer.menu === 'View all employees') {
                viewEmployees()
            } else if (answer.menu === 'Add a department') {
                addDepartment()
            } else if (answer.menu === 'Add a role') {
                addRole()
            } else if (answer.menu === 'Add an employee') {
                addEmployee()
            } else if (answer.menu === 'Update an employee role') {
                updateRole()
            } else {
                console.log('Thanks anyway!')
                //process.exit()
            }
        })
}


const db = mysql.createConnection(
    //using mysql library to create a connection to a sql server
    //telling node how to connect to it
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'MyNewPass',
        database: 'haroldsclownfactory_db'
        //connecting to a specific database
    },
    console.log(`Connected to the classlist_db database.`)
);


//calls initial prompts when index.js is entered into command line
init()

function viewDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        //selecting from a specific table and console log what the results are
        console.table(results);
        init() //restarts prompot
    });

}

function viewRoles() {
    db.query('SELECT * FROM roles', function (err, results) {
        //selecting from a specific table and console log what the results are
        console.table(results);
        init() //restarts prompt
    });

}

//need to use a join here
// THEN I am presented with a formatted table showing employee data, 
//including employee ids, first names, last names, job titles, departments, 
//salaries, and managers that the employees report to
function viewEmployees() {
    db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;", function (err, results) {
        //selecting from a specific table and console log what the results are
        console.table(results);
        init()
    });

}
//not sure if I need a comma before values also
function addDepartment() {
    inquirer
        .prompt(addDepartmentQuestions)
        .then((answer) => {
            db.query(`INSERT INTO department (id, name)
        VALUES (id, '${answer.departmentName}');`, function (err, results) {
                //selecting from a specific table and console log what the results are
                console.log(results);
            });
        })


}

function addRole() {
    inquirer
        .prompt(addRoleQuestions)
        .then((answers) => {
            db.query(`INSERT INTO roles (title, salary, department_id)
    VALUES (id, '${answers.roleTitle}', '${answers.roleSalary}', department_id);`, function (err, results) {
                //selecting from a specific table and console log what the results are
                console.log(results);
            });
        })
}

//need to figure out how to do this part
//query roles
//list all employees and that will populate manager id
function addEmployee() {
    roleChoices().then(response => {
        const rChoices = response[0].map(({ id, title }) => ({name: title, value: id}))
        inquirer
        .prompt([
            { 
                type: 'list', 
                name: 'newRole',
                message: "What is their new role?",
                choices: rChoices
            },
        ]).then((answers) => {
            console.log(answers)
            db.query("UPDATE employee SET role_id= ? WHERE id= ?", [answers.newRole, employee])
        })
    inquirer
        .prompt(addEmployeeQuestions)
        .then((answers) => {
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.firstName}', '${answers.lastName}', '/*id number of role */', '/*manager id*/');`, function (err, results) {
                //selecting from a specific table and console log what the results are
                console.log(results);
            });
        })
    })
}


function employeeChoices() {
    return db.promise().query("SELECT * from employee")
}

function roleChoices() {
    return db.promise().query("SELECT * from role")
}

//create an array and push into that array when you add employee and add role so you can pass that into prompt
function updateRole() {
    employeeChoices().then(response => {
        console.log(response[0])
        let empChoices = response[0].map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id })) //creates an array 
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'employeeChosen',
                message: "What is the name of the employee for whom you want to update the role?",
                choices: empChoices

            },

        ])
        .then((answers) => {
            console.log(answers)
            const employee = answers.employeeChosen
            roleChoices().then(response => {
                const rChoices = response[0].map(({ id, title }) => ({name: title, value: id}))
                inquirer
                .prompt([
                    { 
                        type: 'list', 
                        name: 'newRole',
                        message: "What is their new role?",
                        choices: rChoices
                    },
                ]).then((answers) => {
                    console.log(answers)
                    db.query("UPDATE employee SET role_id= ? WHERE id= ?", [answers.newRole, employee])
                })
            })
        })
    })

}



