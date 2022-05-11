SELECT 
`t_events`.`id` AS `id`,
`t_events`.`calendarId` AS `calendarId`,
<<<<<<< HEAD
`t_warehouses`.`warehouse` AS `warehouse`,
`t_events`.`title` AS `title`,
`t_clients`.`id` AS `clientId`,
`t_clients`.`client` AS `client`,
=======
`t_calendars`.`cal_name` AS `cal_name`,
`t_events`.`title` AS `title`,
>>>>>>> e146093631ab82ad401ae397f87bcd1d8300c3cd
cast(`t_events`.`start` as date) AS `start`,
cast(`t_events`.`end` as date) AS `end`,
`t_events`.`status` AS `statusId`,
`t_event_status`.`status` AS `status`,
`b_out`.`t_events`.`location_city` AS `event_cityId`,
`b_out`.`t_event_location_city`.`event_city` AS `event_city`,
`b_out`.`t_events`.`location_place` AS `event_placeId`,
`b_out`.`t_event_location_place`.`event_place` AS `event_place`,
`b_out`.`t_events`.`notes` AS `notes`,
`b_out`.`t_events`.`manager_1` AS `manager_1Id`,
concat(`m1`.`f_name`,', ',`m1`.`s_name`,`m1`.`l_name`) AS `manager_1`,
`b_out`.`t_events`.`manager_2` AS `manager_2Id`,
concat(`m2`.`f_name`,', ',`m2`.`s_name`,`m2`.`l_name`) AS `manager_2`,
`b_out`.`t_events`.`current_user` AS `current_user` 

FROM 

`t_events` 

<<<<<<< HEAD
JOIN `t_warehouses` 
ON `b_out`.`t_events`.`calendarId` = `b_out`.`t_warehouses`.`id`
=======
JOIN `t_calendars` 
ON `b_out`.`t_events`.`calendarId` = `b_out`.`t_calendars`.`id`
>>>>>>> e146093631ab82ad401ae397f87bcd1d8300c3cd

JOIN `t_event_status` 
ON `b_out`.`t_events`.`status` = `b_out`.`t_event_status`.`id`

join `t_managers` AS `m1` 
ON `b_out`.`t_events`.`manager_1` = `m1`.`id` 

JOIN `t_managers` AS `m2` 
ON `b_out`.`t_events`.`manager_2` = `m2`.`id` 

JOIN `t_event_location_city` 
ON `b_out`.`t_events`.`location_city` = `b_out`.`t_event_location_city`.`id` 

JOIN `t_event_location_place` 
ON `b_out`.`t_events`.`location_place` = `b_out`.`t_event_location_place`.`id`

<<<<<<< HEAD
JOIN `t_clients` 
ON `b_out`.`t_events`.`client` = `b_out`.`t_clients`.`id`

=======
>>>>>>> e146093631ab82ad401ae397f87bcd1d8300c3cd
WHERE `b_out`.`t_events`.`is_deleted` = 0