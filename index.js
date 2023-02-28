//folder structure
//fix null
//also make it so you can add manager id to that one part

//*IMPORTS*
var inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

//*PROMPTS*
// menu for users when they first begin application
const firstQuestion = [
    {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
    },
]

// questions for user when they want to add departments
const addDepartmentQuestions = [
    {
        type: 'input',
        name: 'departmentName',
        message: "What is the name of the department you would like to add?",
        default: 'Suggested: Makeup Department'

    },
]

// questions for user when they want to add a role
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
]

// questions for user when they want to add an employee
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
]

//*VARIABLES AND FUNCTIONS*

/*HELPER FUNCTIONS*/
// functions to return tables so that they can be stored in arrays in other functions

function employeeChoices() {
    return db.promise().query("SELECT * from employee")
}

function departmentChoices() {
    return db.promise().query("SELECT * from department")
}

function roleChoices() {
    return db.promise().query("SELECT * from role")
}

/*PRIMARY FUNCTION*/
//initialized the first question
function init() {
    inquirer
        .prompt(firstQuestion)
        .then((answer) => {

            //console.log(answer)
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
                console.log('Have a nice day!')
                process.exit()
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


// calls initial prompts when index.js is entered into command line
init()

// function to view departments
function viewDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        init() //restarts prompt
    });
}

// function to view various roles
function viewRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        init() 
    });
}

// uses a join statement to view information about all employees
function viewEmployees() {
    db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;", function (err, results) {
        console.table(results);
        init()
    });
}

// function to add a department
function addDepartment() {
    inquirer
        .prompt(addDepartmentQuestions)
        .then((answer) => {
            db.query(`INSERT INTO department (id, name)
        VALUES (id, '${answer.departmentName}');`, function (err, results) {
                console.log(`Success! You added the ${answer.departmentName} department.`)
                init()
            })
        })
}

// function to add a role
function addRole() {
    inquirer
        .prompt(addRoleQuestions)
        .then((answers) => {
            const roleTitle = answers.roleName
            const roleSalary = answers.roleSalary
            departmentChoices().then(response => {
                const dChoices = response[0].map(({ id, name }) => ({ name: name, value: id }))
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'roleDepartment',
                            message: "What is the department in for this role?",
                            choices: dChoices
                        },
                    ]).then((answer) => {
                        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`, [roleTitle, roleSalary, answer.roleDepartment], function (err, results) {
                            //console.log(results);
                            console.log(`Success! You added the ${roleTitle} role.`)
                            init()
                        })
                    })
            })

        })
}

// function to add an employee
function addEmployee() {
    inquirer
        .prompt(addEmployeeQuestions)
        .then((answers) => {
            const firstName = answers.firstName
            const lastName = answers.lastName
            roleChoices().then(response => {
                const rChoices = response[0].map(({ id, title }) => ({ name: title, value: id }))
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'newRole',
                            message: "What will be their role?",
                            choices: rChoices
                        },
                    ]).then((answers) => {
                        //console.log(answers)
                        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`, [firstName, lastName, answers.newRole, null], function (err, results) {
                            console.log("Success!" + firstName + " " + lastName + "has been added to the employee database")
                            init()
                        });
                    })
            })
        })
}

// function to update a role
function updateRole() {
    employeeChoices().then(response => {
        //console.log(response[0])
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
                //console.log(answers)
                const employee = answers.employeeChosen
                roleChoices().then(response => {
                    const rChoices = response[0].map(({ id, title }) => ({ name: title, value: id }))
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'newRole',
                                message: "What is their new role?",
                                choices: rChoices
                            },
                        ]).then((answers) => {
                            //console.log(answers)
                            db.query("UPDATE employee SET role_id= ? WHERE id= ?", [answers.newRole, employee])
                            console.log("Success! Role has been updated.")
                            init()
                        })
                })
            })
    })
}