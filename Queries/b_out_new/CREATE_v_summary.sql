SELECT
 `v_s_events`.`idWarehouse` AS `idWarehouse`,
 `t_warehouses`.`warehouse` AS `warehouse`,
 COUNT(`v_s_events`.`idWarehouse`) - 1 AS `qty` 
 FROM `v_s_events` 
 JOIN `t_warehouses` 
 ON`v_s_events`.`idWarehouse` = `t_warehouses`.`id` 
 GROUP BY `v_s_events`.`idWarehouse`