CREATE TABLE `t_equipment` (
  `department` varchar(3) NOT NULL,
  `category` varchar(15) NOT NULL,
  `fixture_type` varchar(15) NOT NULL,
  `equip_id` varchar(15) NOT NULL,
  `uid_cloudio` varchar(20) DEFAULT NULL,
  `manufactor` varchar(25) NOT NULL,
  `model_name` varchar(50) NOT NULL,
  `s_number` varchar(30) DEFAULT NULL,
  `wh_code` varchar(30) DEFAULT NULL,
  `const_location` varchar(50) DEFAULT NULL,
  `current_location` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'занят/свободен',
  `state` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'исправный/неисправный',
  PRIMARY KEY (`equip_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4