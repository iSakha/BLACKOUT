CREATE TABLE `t_phase` (
	`id` INT(3) NOT NULL AUTO_INCREMENT,
	`phase` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=8
;