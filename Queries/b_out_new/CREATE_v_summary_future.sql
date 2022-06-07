SELECT
 `t_events`.`idWarehouse` AS `idWarehouse`,
 `t_warehouses`.`warehouse` AS `warehouse`,
 COUNT(`t_events`.`idWarehouse`) - 1 AS `qty_future` 
 FROM (`t_events` 
 JOIN `t_warehouses` 
 ON(`t_events`.`idWarehouse` = `t_warehouses`.`id`)) 
 WHERE CURDATE() < `t_events`.`start` OR `t_events`.`title` = 'fake' 
 GROUP BY `t_events`.`idWarehouse`