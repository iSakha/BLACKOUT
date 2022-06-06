CREATE VIEW `v_users` AS
SELECT 
`t_users`.`id` AS `id`,
`t_users`.`login` AS `login`,
`t_users`.`crypto` AS `crypto`,
`t_users`.`firstName` AS `firstName`,
`t_users`.`lastName` AS `lastName`,
CONCAT(`t_users`.`firstName`,' ',`t_users`.`lastName`) AS `fullName`,
`t_users`.`avatar` AS `avatar`,
`t_salt`.`salt` AS `salt`,
`t_role`.`role` AS `role` 
FROM 
`t_users` 
JOIN `t_salt` 
ON`t_users`.`salt` = `t_salt`.`id` 
JOIN `t_role` 
ON`t_users`.`role` = `t_role`.`id`