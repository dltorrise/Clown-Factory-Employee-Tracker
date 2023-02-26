INSERT INTO department (id, name)
VALUES (1, 'Fun Generation'),
       (2, 'Large Shoe Cobbling'),
       (3, 'Boinky Nose Factory'),
       (4, 'Tiny Car Manufacturing');

       INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Cake Thrower", 1, 1),
       (2, "Sr. Cake Thrower", 1.5, 1),
       (3, "Cake Thrower Intern", .5, 1),
       (4, "Baloon Maker", 1, 1),
       (5, "Sr. Baloon Maker", 1.2, 1),
       (6, "Baloon Maker Apprentice", .8, 1),
       (7, "Tiny Car Mechanic", 1, 4),
       (8, "Sr. Tiny Car Mechanic", 1.5, 4),
       (9, "Tiny Car Mechanic Intern", .8, 4),
       (10, "Large Shoe Cobbler", 1, 2),
       (11, "Sr. Large Shoe Cobbler", 1.4, 2),
       (12, "Large Shoe Cobbler Apprentice", .8, 2),
       (13, "Boink Tester", 1.5, 3);
       (14, "Sr. Boink Tester", 2, 3);
       (15, "Boink Tester Trainee", .9, 3);
       
       -- still genuinely confused on the manager id --
       INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Goofy", "Whistle", 1, 2),
       (2, "Dinky", "Mittens", 2, 2),
       (3, "Lollypop", "Bozo", 3, 2),
       (4, "Coocoo", "Cornflake", 4, 5),
       (5, "Buddy", "Jumbo", 5, 5),
       (6, "Velvet", "Tubby", 6, 5),
       (7, "Miko", "Gogo", 7, 8),
       (8, "Chester", "Feathers", 8, 8),
       (9, "Skittles", "Oddball", 9, 8),
       (10, "Shaggy", "Squiggley", 10, 11),
       (11, "Mickey", "Doodles", 11, 11),
       (12, "Choco", "Loopy", 12, 11),
       (13, "Snickers", "Toodles", 13, 14),
       (14, "Snoots", "Casey", 14, 14),
       (15, "Humpty", "Googles", 15, 14),
       (16, "Joy", "Mittens", 1, 2),
       (17, "Alfie", "Pickles", 4, 5),
       (18, "Clueless", "Nanners", 7, 8),
       (19, "Dumbo", "Dazzler", 10, 11),
       (120, "Sparkle", "Giggles", 13, 14);
       