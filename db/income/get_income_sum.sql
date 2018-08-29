SELECT SUM(amount)
FROM income
WHERE user_id = $1
AND
date >= $2 
AND
date <= $3;
;