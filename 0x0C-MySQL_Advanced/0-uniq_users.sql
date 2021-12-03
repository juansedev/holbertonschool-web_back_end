-- 0-uniq_users.sql / 0x0C. MySQL advanced /  Web Stack programming ― Back-end
-- Context: Making an attribute unique directly in the table schema will enforce he business rules and avoid bugs in an application
CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255)
);
