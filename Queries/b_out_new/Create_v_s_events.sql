
SELECT o.*
FROM `t_events` o   
  LEFT JOIN `t_events` b
      ON o.idEvent = b.idEvent AND o.updatedAt < b.updatedAt
WHERE b.updatedAt IS NULL