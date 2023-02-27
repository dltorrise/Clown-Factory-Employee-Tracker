INSERT INTO department (name)
VALUES ('Fun Generation'),
       ('Large Shoe Cobbling'),
       ('Boinky Nose Factory'),
       ('Tiny Car Manufacturing');

       INSERT INTO role (title, salary, department_id)
VALUES ("Cake Thrower", 1, 1),
       ("Sr. Cake Thrower", 1.5, 1),
       ("Cake Thrower Intern", .5, 1),
       ("Baloon Maker", 1, 1),
       ("Sr. Baloon Maker", 1.2, 1),
       ("Baloon Maker Apprentice", .8, 1),
       ("Tiny Car Mechanic", 1, 4),
       ("Sr. Tiny Car Mechanic", 1.5, 4),
       ("Tiny Car Mechanic Intern", .8, 4),
       ("Large Shoe Cobbler", 1, 2),
       ("Sr. Large Shoe Cobbler", 1.4, 2),
       ("Large Shoe Cobbler Apprentice", .8, 2),
       ("Boink Tester", 1.5, 3),
       ("Sr. Boink Tester", 2, 3),
       ("Boink Tester Trainee", .9, 3);

       -- go back and fix it --
       INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Goofy", "Whistle", 1, null),
       ("Dinky", "Mittens", 2, 1),
       ("Lollypop", "Bozo", 3, 2),
       ("Coocoo", "Cornflake", 4, null),
       ("Buddy", "Jumbo", 5, 4),
       ("Velvet", "Tubby", 6, 5),
       ("Miko", "Gogo", 7, null),
       ("Chester", "Feathers", 8, 7),
       ("Skittles", "Oddball", 9, 8),
       ("Shaggy", "Squiggley", 10, null),
       ("Mickey", "Doodles", 11, 10),
       ("Choco", "Loopy", 12, 11),
       ("Snickers", "Toodles", 13, null),
       ("Snoots", "Casey", 14, 13),
       ("Humpty", "Googles", 15, 14),
       ("Joy", "Mittens", 1, 2),
       ("Alfie", "Pickles", 4, 5),
       ("Clueless", "Nanners", 7, 8),
       ("Dumbo", "Dazzler", 10, 11),
       ("Sparkle", "Giggles", 13, 14);
       

       -- SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;