SELECT SUM(cost) FROM expenses
WHERE user_id = $1
AND
expense_date >= $2 
AND
expense_date <= $3;
