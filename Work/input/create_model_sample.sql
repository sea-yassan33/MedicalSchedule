CREATE TABLE `customer_data` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `kana` VARCHAR(255) NOT NULL,
  `age` INT,
  `duration` INT NOT NULL,
  `gender` VARCHAR(255),
  `phone_number` VARCHAR(255),
  `email` VARCHAR(255),
  `first_visit_date` DATETIME,
  `last_visit_date` DATETIME,
  `profession_ids` VARCHAR(255),
  `memo` VARCHAR(255),
  `delet_flag` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);