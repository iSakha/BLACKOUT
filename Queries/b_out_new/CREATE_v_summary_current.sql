SELECT 
`v_s_events`.`idWarehouse` AS `idWarehouse`,
`t_warehouses`.`warehouse` AS `warehouse`,
COUNT(`v_s_events`.`idWarehouse`) - 1 AS `qty_current` 
FROM `v_s_events` 
JOIN `t_warehouses` 
ON `v_s_events`.`idWarehouse` = `t_warehouses`.`id`
WHERE curdate() <= `v_s_events`.`end` and curdate() >= `v_s_events`.`start` or `v_s_events`.`title` = 'fake' 
GROUP BY `v_s_events`.`idWarehouse`