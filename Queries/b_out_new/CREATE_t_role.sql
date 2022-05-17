CREATE TABLE `t_role` (
	`id` INT(5) NOT NULL AUTO_INCREMENT,
	`role` VARCHAR(70) NOT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;