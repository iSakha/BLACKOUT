SELECT 
`t_events`.`idEvent` AS `idEvent`,
`t_events`.`idWarehouse` AS `idWarehouse`,
`t_warehouses`.`warehouse` AS `warehouse`,
`t_events`.`title` AS `title`,
`t_events`.`idCreatedBy` AS `idCreatedBy`,
CONCAT(`m3`.`firstName`,' ',`m3`.`lastName`) AS `createdBy`,
`t_clients`.`id` AS `idClient`,
`t_clients`.`client` AS `client`,
`t_events`.`start` AS `start`,
`t_events`.`end` AS `end`,
`t_events`.`idStatus` AS `idStatus`,
`t_status`.`status` AS `status`,
`t_events`.`idEventCity` AS `idEventCity`,
`t_event_city`.`city` AS `eventCity`,
`t_events`.`idEventPlace` AS `idEventPlace`,
`t_event_place`.`place` AS `eventPlace`,
`t_events`.`notes` AS `notes`,
`t_events`.`idManager_1` AS `idManager_1`,
CONCAT(`m1`.`firstName`,' ',`m1`.`lastName`) AS `manager_1`,
`t_events`.`idManager_2` AS `idManager_2`,
CONCAT(`m2`.`firstName`,' ',`m2`.`lastName`) AS `manager_2`,
`t_events`.`updatedAt` AS `updatedAt`,
`t_events`.`idUpdatedBy` AS `idUpdatedBy`,
CONCAT(`m4`.`firstName`,' ',`m4`.`lastName`) AS `updatedBy`


FROM
`t_events` 
JOIN `t_warehouses` 
ON `t_events`.`idWarehouse` = `t_warehouses`.`id`
JOIN `t_clients` 
ON `t_events`.`idClient` = `t_clients`.`id`
JOIN `t_status` 
ON `t_events`.`idStatus` = `t_status`.`id`
JOIN `t_event_city` 
ON `t_events`.`idEventCity` = `t_event_city`.`id`
JOIN `t_event_place` 
ON `t_events`.`idEventPlace` = `t_event_place`.`id`
JOIN `t_users` `m1` 
ON `t_events`.`idManager_1` = `m1`.`id` 
JOIN `t_users` `m2` 
ON `t_events`.`idManager_2` = `m2`.`id`
JOIN `t_users` `m3` 
ON `t_events`.`idCreatedBy` = `m3`.`id`
JOIN `t_users` `m4` 
ON `t_events`.`idUpdatedBy` = `m4`.`id`


