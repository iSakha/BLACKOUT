CREATE VIEW `v_event_details` AS 

SELECT
`t_event_details`.`id` AS `id`,
`t_event_details`.`id_event` AS `id_event`,
`t_event_details`.`id_phase` AS `id_phase`,
`t_event_phase`.`phase` AS `phase_title`,
`t_event_details`.`start` AS `phase_start`,
`t_event_details`.`end` AS phase_end

FROM `t_event_details`

JOIN `t_event_phase` 
ON `t_event_details`.`id_phase` = `t_event_phase`.`id`