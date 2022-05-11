SELECT `t_events`.`calendarId` AS `warehouseId`,
`t_warehouses`.`warehouse` AS `warehouse`,
COUNT(`t_events`.`calendarId`) - 1 AS `qty` 
FROM `t_events` 
JOIN `t_warehouses`
ON `t_events`.`calendarId` = `t_warehouses`.`id`
GROUP BY `t_events`.`calendarId`
