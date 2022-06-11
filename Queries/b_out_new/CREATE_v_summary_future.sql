SELECT
 `v_s_events`.`idWarehouse` AS `idWarehouse`,
 `t_warehouses`.`warehouse` AS `warehouse`,
 COUNT(`v_s_events`.`idWarehouse`) - 1 AS `qty_future` 
 FROM (`v_s_events` 
 JOIN `t_warehouses` 
 ON(`v_s_events`.`idWarehouse` = `t_warehouses`.`id`)) 
 WHERE CURDATE() < `v_s_events`.`start` OR `v_s_events`.`title` = 'fake' 
 GROUP BY `v_s_events`.`idWarehouse`