CREATE VIEW `v_location` AS
SELECT
 `t_event_location`.`city_id` AS `city_id`,
 `t_event_location_city`.`event_city` AS `event_city`,
 `t_event_location`.`place_id` AS `place_id`,
 `t_event_location_place`.`event_place` AS `event_place` 
FROM `t_event_location`
JOIN `t_event_location_city`
ON `t_event_location`.`city_id` = `t_event_location_city`.`id`
JOIN `t_event_location_place`
ON `t_event_location`.`place_id` = `t_event_location_place`.`id`