CREATE VIEW `v_users` AS
SELECT
 `t_users`.`id`,
 `t_users`.`login`,
 `t_users`.`crypto`, 
 `t_users`.`firstName`, 
 `t_users`.`lastName`, 
 `t_users`.`avatar`,
 `t_sault`.`sault`,
 `t_role`.`role`
 FROM 
 `t_users`
JOIN `t_sault`
 ON `t_users`.`sault` = `t_sault`.`id`
JOIN `t_role`
 ON `t_users`.`role` = `t_role`.`id`