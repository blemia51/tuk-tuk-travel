drop database if exists tuktuktravel; 
CREATE DATABASE `tuktuktravel`;
USE `tuktuktravel`;

CREATE TABLE `users`(
  `userID` INT NOT NULL AUTO_INCREMENT,
  `lastname` VARCHAR(100) NOT NULL,
  `firstname` VARCHAR(100) NOT NULL, 
  `password` VARCHAR(255) NOT NULL,
  `birthday` DATE NOT NULL,
  `sex` VARCHAR(10) NOT NULL,  
  `country` VARCHAR(100) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `phone_number` VARCHAR(15) NOT NULL,
  `description` TEXT NULL,
  `avatar` TEXT,
  PRIMARY KEY (`userID`) 
);

CREATE TABLE `travels`(
    `travelID` INT NOT NULL AUTO_INCREMENT,
    `IDuser_creator` INT NOT NULL,
    `destination` VARCHAR(255),
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `number_of_travelers_max` INT,
    `description` TEXT,
    `cityPic` VARCHAR(100),
    FOREIGN KEY (`IDuser_creator`) REFERENCES `users`(`userID`),
    PRIMARY KEY (`travelID`)    
);

CREATE TABLE `travel_user`(
    `travel_user_id` INT NOT NULL AUTO_INCREMENT,
    `id_user` INT NOT NULL,
    `id_travel` INT NOT NULL,
    `rate` INT,
    `comment` TEXT,
    FOREIGN KEY (`id_user`) REFERENCES `users`(`userID`),
    FOREIGN KEY (`id_travel`) REFERENCES `travels`(`travelID`),
    PRIMARY KEY (`travel_user_id`)
);




INSERT INTO travels (IDuser_creator, destination, start_date, end_date, number_of_travelers_max, description, cityPic) VALUES
(1, 'Cancun', '2020-02-01', '2020-02-09', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur purus eros, eleifend ut luctus sit amet, vehicula ut purus. Nulla quis malesuada nunc, sed auctor ligula. Etiam ut imperdiet nisl. In hac habitasse platea dictumst. Pellentesque et magna nunc. Vivamus a tempus dolor. Proin condimentum efficitur sapien id ultricies.', 'cancun.jpg'),
(1, 'Londres', '2020-02-10', '2020-02-16', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur purus eros, eleifend ut luctus sit amet, vehicula ut purus. Nulla quis malesuada nunc, sed auctor ligula. Etiam ut imperdiet nisl. In hac habitasse platea dictumst. Pellentesque et magna nunc. Vivamus a tempus dolor. Proin condimentum efficitur sapien id ultricies.', 'Londres.jpg'),
(1, 'Rome', '2020-02-17', '2020-02-23', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur purus eros, eleifend ut luctus sit amet, vehicula ut purus. Nulla quis malesuada nunc, sed auctor ligula. Etiam ut imperdiet nisl. In hac habitasse platea dictumst. Pellentesque et magna nunc. Vivamus a tempus dolor. Proin condimentum efficitur sapien id ultricies.', 'Rome.jpg'),
(1, 'Honolulu', '2020-02-24', '2020-03-01', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur purus eros, eleifend ut luctus sit amet, vehicula ut purus. Nulla quis malesuada nunc, sed auctor ligula. Etiam ut imperdiet nisl. In hac habitasse platea dictumst. Pellentesque et magna nunc. Vivamus a tempus dolor. Proin condimentum efficitur sapien id ultricies.', 'Honolulu.jpg'),
(1, 'Venise', '2020-03-02', '2020-03-08', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur purus eros, eleifend ut luctus sit amet, vehicula ut purus. Nulla quis malesuada nunc, sed auctor ligula. Etiam ut imperdiet nisl. In hac habitasse platea dictumst. Pellentesque et magna nunc. Vivamus a tempus dolor. Proin condimentum efficitur sapien id ultricies.', 'Venice.jpg'),
(1, 'Stockholm', '2020-04-01', '2020-04-05', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur purus eros, eleifend ut luctus sit amet, vehicula ut purus. Nulla quis malesuada nunc, sed auctor ligula. Etiam ut imperdiet nisl. In hac habitasse platea dictumst. Pellentesque et magna nunc. Vivamus a tempus dolor. Proin condimentum efficitur sapien id ultricies.', 'Stockholm.jpg'),
(1, 'Toronto', '2020-04-10', '2020-04-20', 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur purus eros, eleifend ut luctus sit amet, vehicula ut purus. Nulla quis malesuada nunc, sed auctor ligula. Etiam ut imperdiet nisl. In hac habitasse platea dictumst. Pellentesque et magna nunc. Vivamus a tempus dolor. Proin condimentum efficitur sapien id ultricies.', 'toronto.jpg');