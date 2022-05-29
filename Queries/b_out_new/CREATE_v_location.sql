CREATE VIEW `v_location` AS

SELECT 
`t_event_city`.`id` AS `city_id`,
`t_event_city`.`city` AS `city`,
`t_event_place`.`id` AS `place_id`,
`t_event_place`.`place` AS `place` 
FROM 
`t_event_place` 
JOIN `t_event_city` 
ON `t_event_city`.`id` = `t_event_place`.`idEventCity`