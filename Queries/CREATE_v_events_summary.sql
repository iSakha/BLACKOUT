-- Create v_events_summary
-- =================================================
SELECT 
`t_events`.`warehouseId` AS `warehouseId`,
`t_warehouses`.`warehouse` AS `warehouse`,
COUNT(`t_events`.`warehouseId`) - 1 AS `qty` 
FROM `t_events` 
JOIN `t_warehouses`
ON `t_events`.`warehouseId` = `t_warehouses`.`id`
GROUP BY `t_events`.`warehouseId`


-- Create v_events_summary_current
-- =================================================
SELECT 
`t_events`.`warehouseId` AS `warehouseId`,
`t_warehouses`.`warehouse` AS `warehouse`,
count(`t_events`.`warehouseId`) - 1 AS `qty_current` 
FROM (
`t_events` join `t_warehouses` 
on(`t_events`.`warehouseId` = `t_warehouses`.`id`)) 
where curdate() <= `t_events`.`end` and curdate() >= `t_events`.`start`
OR `title` = 'fake' 
group by `t_events`.`warehouseId`

-- Create v_events_summary_future
-- =================================================
SELECT 
`t_events`.`warehouseId` AS `warehouseId`,
`t_warehouses`.`warehouse` AS `warehouse`,
count(`t_events`.`warehouseId`) - 1 AS `qty_future` 
FROM (
`t_events` join `t_warehouses` 
on(`t_events`.`warehouseId` = `t_warehouses`.`id`)) 
 where curdate() < `t_events`.`start` 
OR `title` = 'fake' 
group by `t_events`.`warehouseId`

-- Create v_events_summary_final
-- =================================================
SELECT 
`v_events_summary`.`warehouseId` AS `warehouseId`,
`v_events_summary`.`warehouse` AS `warehouse`,
`v_events_summary`.`qty` AS `qty`,
`v_events_summary_current`.`qty_current` AS `qty_current`,
`v_events_summary_future`.`qty_future` AS `qty_future` 
FROM ((
`v_events_summary` 
left join `v_events_summary_current` 
on(`v_events_summary`.`warehouseId` = `v_events_summary_current`.`warehouseId`)) 
left join `v_events_summary_future` 
on(`v_events_summary`.`warehouseId` = `v_events_summary_future`.`warehouseId`))