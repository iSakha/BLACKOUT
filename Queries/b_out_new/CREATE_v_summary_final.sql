SELECT
 `v_summary`.`idWarehouse` AS `idWarehouse`,
 `v_summary`.`warehouse` AS `warehouse`,
 `v_summary`.`qty` AS `qty`,
 `v_summary_current`.`qty_current` AS `qty_current`,
 `v_summary_future`.`qty_future` AS `qty_future` 
 FROM `v_summary` 
 LEFT JOIN `v_summary_current` 
 ON `v_summary`.`idWarehouse` = `v_summary_current`.`idWarehouse`
 LEFT JOIN `v_summary_future` 
 ON `v_summary`.`idWarehouse` = `v_summary_future`.`idWarehouse`