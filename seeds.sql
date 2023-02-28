       INSERT INTO department (name)
VALUES ('Fun Generation'),
       ('Large Shoe Cobbling'),
       ('Boinky Nose Factory'),
       ('Tiny Car Manufacturing');

       INSERT INTO role (title, salary, department_id)
VALUES ("Sr. Cake Thrower", 1.5, 1),
       ("Cake Thrower", 1, 1),
       ("Cake Thrower Intern", .5, 1),
       ("Sr. Baloon Maker", 1.2, 1),
       ("Baloon Maker", 1, 1),
       ("Baloon Maker Apprentice", .8, 1),
       ("Sr. Tiny Car Mechanic", 1.5, 4),
       ("Tiny Car Mechanic", 1, 4),
       ("Tiny Car Mechanic Intern", .8, 4),
       ("Sr. Large Shoe Cobbler", 1.4, 2),
       ("Large Shoe Cobbler", 1, 2),
       ("Large Shoe Cobbler Apprentice", .8, 2),
       ("Sr. Boink Tester", 2, 3),
       ("Boink Tester", 1.5, 3),
       ("Boink Tester Trainee", .9, 3);

       -- go back and fix it --
       INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Goofy", "Whistle", 1, null),
       ("Dinky", "Mittens", 2, 1),
       ("Lollypop", "Bozo", 3, 1),
       ("Coocoo", "Cornflake", 4, null),
       ("Buddy", "Jumbo", 5, 4),
       ("Velvet", "Tubby", 6, 4),
       ("Miko", "Gogo", 7, null),
       ("Chester", "Feathers", 8, 7),
       ("Skittles", "Oddball", 9, 7),
       ("Shaggy", "Squiggley", 10, null),
       ("Mickey", "Doodles", 11, 10),
       ("Choco", "Loopy", 12, 10),
       ("Snickers", "Toodles", 13, null),
       ("Snoots", "Casey", 14, 13),
       ("Humpty", "Googles", 15, 13),
       ("Joy", "Mittens", 2, 1),
       ("Alfie", "Pickles", 5, 4),
       ("Clueless", "Nanners", 8, 7),
       ("Dumbo", "Dazzler", 11, 10),
       ("Sparkle", "Giggles", 14, 13);
       

       -- SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;