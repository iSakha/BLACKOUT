CREATE VIEW v_events_latest_state AS
SELECT o.*
FROM `v_events` o   
  LEFT JOIN `v_events` b
      ON o.idEvent = b.idEvent AND o.updatedAt < b.updatedAt
WHERE b.updatedAt IS NULL