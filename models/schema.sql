DROP TABLE IF EXISTS startups;

CREATE table startups (
id INT PRIMARY KEY,
project_name VARCHAR(100) NOT NULL,
category VARCHAR(30),
main_category varchar(40),
currency VARCHAR(3),
deadline DATE,
goal DECIMAL(13, 2) NOT NULL,
launched DATETIME NOT NULL,
pledged DECIMAL(13, 2),
state VARCHAR(10),
backers INT,
country VARCHAR(4),
usd_pledged DECIMAL(13, 2),
usd_pledged_real DECIMAL(13, 2),
usd_goal_real DECIMAL(13, 2)
)

CREATE table client_searches (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(20) NOT NULL,
    country VARCHAR(20) NOT NULL,
    project_length VARCHAR(20) NOT NULL,
    funding_goal DECIMAL(13, 2) NOT NULL
)