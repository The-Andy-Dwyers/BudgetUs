SELECT * FROM income
WHERE user_id = $1
AND
date >= $2 
AND
date <= $3
ORDER BY amount desc;