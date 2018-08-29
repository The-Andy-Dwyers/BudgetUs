SELECT SUM(amount)
FROM income
WHERE user_id = $1
AND
payday >= $2 
AND
payday <= $3;
;