CREATE DATABASE IF NOT EXISTS employees
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE employees;

CREATE TABLE IF NOT EXISTS user (
  user_id INT(11) NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(100) NOT NULL,
  user_email VARCHAR(100) NOT NULL,
  user_password VARCHAR(500) NOT NULL,
  PRIMARY KEY (user_id),
  UNIQUE KEY user_email (user_email)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS employee (
  employee_id INT(11) NOT NULL AUTO_INCREMENT,
  employee_name VARCHAR(100) NOT NULL,
  employee_lastname VARCHAR(100) NOT NULL,
  employee_phone VARCHAR(20) DEFAULT NULL,
  employee_email VARCHAR(100) DEFAULT NULL,
  employee_address VARCHAR(500) DEFAULT NULL,
  PRIMARY KEY (employee_id)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci;