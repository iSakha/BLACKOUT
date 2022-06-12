SELECT

`v_e_l_s`.`idEvent` AS `idEvent`,
`v_e_l_s`.`idWarehouse` AS `idWarehouse`,
`v_e_l_s`.`warehouse` AS `warehouse`,
`v_e_l_s`.`title` AS `title`,
`v_e_l_s`.`idCreatedBy` AS `idCreatedBy`,
`v_e_l_s`.`createdBy` AS `createdBy`,
`v_e_l_s`.`idClient` AS `idClient`,
`v_e_l_s`.`client` AS `client`,
`v_e_l_s`.`start` AS `start`,
`v_e_l_s`.`end` AS `end`,
`v_e_l_s`.`idStatus` AS `idStatus`,
`v_e_l_s`.`status` AS `status`,
`v_e_l_s`.`idEventCity` AS `idEventCity`,
`v_e_l_s`.`eventCity` AS `eventCity`,
`v_e_l_s`.`idEventPlace` AS `idEventPlace`,
`v_e_l_s`.`eventPlace` AS `eventPlace`,
`v_e_l_s`.`notes` AS `notes`,
`v_e_l_s`.`idManager_1` AS `idManager_1`,
`v_e_l_s`.`manager_1` AS `manager_1`,
`v_e_l_s`.`idManager_2` AS `idManager_2`,
`v_e_l_s`.`manager_2` AS `manager_2`,
`v_e_l_s`.`updatedAt` AS `updatedAt`,
`v_e_l_s`.`idUpdatedBy` AS `idUpdatedBy`,
`v_e_l_s`.`updatedBy` AS `updatedBy`,

`v_e_d`.`idPhase` AS `idPhase`,
`v_e_d`.`phase` AS `phase`,
`v_e_d`.`startPhase` AS `startPhase`,
`v_e_d`.`endPhase` AS `endPhase`

FROM `v_events_latest_state` AS `v_e_l_s`

LEFT JOIN `v_event_details` AS `v_e_d`
ON `v_e_l_s`.`idEvent` = `v_e_d`.`idEvent`