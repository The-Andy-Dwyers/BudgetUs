SELECT * FROM expenses
WHERE user_id = $1
AND
date >= $2 
AND
date <= $3
order by category;
