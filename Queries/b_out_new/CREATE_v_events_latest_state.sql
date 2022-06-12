SELECT 
`o`.`idEvent` AS `idEvent`,
`o`.`idWarehouse` AS `idWarehouse`,
`o`.`warehouse` AS `warehouse`,
`o`.`title` AS `title`,
`o`.`idCreatedBy` AS `idCreatedBy`,
`o`.`createdBy` AS `createdBy`,
`o`.`idClient` AS `idClient`,
`o`.`client` AS `client`,
`o`.`start` AS `start`,
`o`.`end` AS `end`,
`o`.`idStatus` AS `idStatus`,
`o`.`status` AS `status`,
`o`.`idEventCity` AS `idEventCity`,
`o`.`eventCity` AS `eventCity`,
`o`.`idEventPlace` AS `idEventPlace`,
`o`.`eventPlace` AS `eventPlace`,
`o`.`notes` AS `notes`,
`o`.`idManager_1` AS `idManager_1`,
`o`.`manager_1` AS `manager_1`,
`o`.`idManager_2` AS `idManager_2`,
`o`.`manager_2` AS `manager_2`,
`o`.`updatedAt` AS `updatedAt`,
`o`.`idUpdatedBy` AS `idUpdatedBy`,
 `o`.`updatedBy` AS `updatedBy`
FROM `v_events` `o` 
LEFT JOIN `v_events` `b` 
ON(`o`.`idEvent` = `b`.`idEvent` and `o`.`updatedAt` < `b`.`updatedAt`)
WHERE `b`.`updatedAt` IS NULL