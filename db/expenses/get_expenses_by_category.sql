SELECT category,SUM(cost) as amount FROM expenses
WHERE user_id = $1
AND
expense_date >= $2 
AND
expense_date <= $3
GROUP BY category;
