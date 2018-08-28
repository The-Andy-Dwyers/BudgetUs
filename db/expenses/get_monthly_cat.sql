SELECT category,SUM(amount) as amount FROM expenses
WHERE user_id = $1 and 
GROUP BY category;