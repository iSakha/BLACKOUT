CREATE TABLE `t_events` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`idWarehouse` INT(3) NOT NULL,
	`title` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`start` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	`end` TIMESTAMP NULL DEFAULT NULL,
	`notes` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`idManager_1` INT(5) NULL DEFAULT NULL,
	`idManager_2` INT(5) NULL DEFAULT NULL,
	`currentUser` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`idLocationCity` INT(5) NULL DEFAULT NULL,
	`idLocationPlace` INT(5) NULL DEFAULT NULL,
	`idClient` INT(5) NULL DEFAULT NULL,
	`is_deleted` TINYINT(1) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC
;
