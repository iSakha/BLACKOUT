SELECT `t_events`.`calendarId` AS `calendarId`,
`t_calendars`.`cal_name` AS `warehouse`,
COUNT(`t_events`.`calendarId`) - 1 AS `qty` 
FROM `t_events` 
JOIN `t_calendars`
ON `t_events`.`calendarId` = `t_calendars`.`id`
GROUP BY `t_events`.`calendarId`