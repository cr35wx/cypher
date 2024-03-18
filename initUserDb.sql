-- Create a user that matches the database uri in backend/config.py
CREATE USER IF NOT EXISTS 'cypher'@'localhost' IDENTIFIED BY 'supersecretpassword';

-- Create database
CREATE DATABASE IF NOT EXISTS cyberclinic;

-- Grant privileges on the new database to the new user
GRANT ALL PRIVILEGES ON cyberclinic.* TO 'cypher'@'localhost';

-- Flush privileges to apply changes
FLUSH PRIVILEGES;
