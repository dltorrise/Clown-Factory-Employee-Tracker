DROP DATABASE IF EXISTS haroldsclownfactory_db;
CREATE DATABASE haroldsclownfactory_db;

USE haroldsclownfactory_db;

-- reordered tables to fix error happening with "chicken and egg problem" --
-- can't create one table if part of it depends on creating another table --

CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY, -- i'm not sure if I need to make this into a primary key
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT NOT NULL,
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE SET NULL
);

CREATE TABLE roles ( -- for some reason will not allow me to write 'role'
 -- in auto increment must set it as primary key on same line -- 
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(6, 2) NOT NULL,
  department_id INT,
--   PRIMARY KEY (id)
  FOREIGN KEY (department_id)
  REFERENCES deparment(id)
  ON DELETE SET NULL
);

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  name VARCHAR(30) NOT NULL,
);



