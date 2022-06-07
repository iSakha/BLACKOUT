SELECT
 `t_events`.`idWarehouse` AS `idWarehouse`,
 `t_warehouses`.`warehouse` AS `warehouse`,
 COUNT(`t_events`.`idWarehouse`) - 1 AS `qty` 
 FROM `t_events` 
 JOIN `t_warehouses` 
 ON`t_events`.`idWarehouse` = `t_warehouses`.`id` 
 GROUP BY `t_events`.`idWarehouse`