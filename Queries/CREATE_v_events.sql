CREATE VIEW `v_events_c` AS

SELECT 
`t_events`.`id` AS `id`,
`t_events`.`calendarId` AS `calendarId`,
`t_events`.`title` AS `title`,
CAST(`t_events`.`start` AS DATE) AS `start`,
CAST(`t_events`.`end` AS DATE) AS `end`,
`t_events`.`notes` AS `notes`,
CONCAT(`t_event_location`.`city`, ', ',`t_event_location`.`place`) AS `location`,
`t_calendars`.`cal_name` AS `cal_name`,
`t_event_status`.`status` AS `status`,
`t_events`.`phase` AS `phase`,
CONCAT(`m1`.`f_name`, ', ',`m1`.`s_name`, `m1`.`l_name`) AS `manager_1`,
CONCAT(`m2`.`f_name`, ', ',`m2`.`s_name`, `m2`.`l_name`) AS `manager_2`


 
FROM `t_events` 
JOIN `t_calendars` 
ON `t_events`.`calendarId` = `t_calendars`.`id`
JOIN `t_event_status`
ON `t_events`.`status` = `t_event_status`.`id`
JOIN `t_event_location`
ON `t_events`.`location` = `t_event_location`.`id`
JOIN `t_managers` AS `m1`
ON `t_events`.`manager_1` = `m1`.`id`
JOIN `t_managers` AS `m2`
ON `t_events`.`manager_2` = `m2`.`id`

WHERE `t_events`.is_deleted = 0