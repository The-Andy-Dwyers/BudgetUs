SELECT category,SUM(amount) as amount FROM expenses
WHERE user_id = $1
AND
date >= $2 
AND
date <= $3
GROUP BY category;
