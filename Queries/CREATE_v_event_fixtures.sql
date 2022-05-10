CREATE VIEW v_event_fixtures AS

SELECT
 `f`.`fixture_type` AS `fixture_type_id`,
 `f`.`name` AS `fixture`,
 `e`.`id` AS `event_id`,
 `e`.`title` AS `event_name`,
 `f`.`qty` AS `storage_qty`,
 `s`.`qty` AS `selected_qty`,
 `f`.`qty` - `s`.`qty` AS `result_qty` 
 FROM `t_equip_name_qty` `f` 
 LEFT JOIN `t_selected_fixtures` `s` 
 ON `f`.`fixture_type` = `s`.`fixture_type_id` 
 LEFT JOIN `t_events` `e` 
 ON `e`.`id` = `s`.`id_event`