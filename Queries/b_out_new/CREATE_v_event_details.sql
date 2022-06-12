SELECT
`t_event_details`.`id` AS `id`,
`t_event_details`.`idEvent` AS `idEvent`,
`t_event_details`.`idPhase` AS `idPhase`,
`t_phase`.`phase` AS `phase`,
`t_event_details`.`startPhase` AS `startPhase`,
`t_event_details`.`endPhase` AS `endPhase`

FROM `t_event_details`

JOIN `t_phase` 
ON `t_event_details`.`idPhase` = `t_phase`.`id`