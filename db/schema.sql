DROP DATABASE IF EXISTS haroldsclownfactory_db;
CREATE DATABASE haroldsclownfactory_db;

USE haroldsclownfactory_db;

-- reordered tables to fix error happening with "chicken and egg problem" --
-- can't create one table if part of it depends on creating another table --

CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT, 
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role ( -- for some reason will not allow me to write 'role'
 -- in auto increment must set it as primary key on same line -- 
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(6, 2) NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT, -- i'm not sure if I need to make this into a primary key
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL,
  FOREIGN KEY (manager_id)
  REFERENCES employee(id) -- employee can be another employees manager via the id
  ON DELETE SET NULL
);







