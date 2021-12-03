-- 1-country_users.sql / 0x0C. MySQL advanced /  Web Stack programming ― Back-end
-- Script with enumeration of countries and default values
CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    country ENUM("US", "CO", "TN") DEFAULT "US" NOT NULL,
    PRIMARY KEY (id)
);
