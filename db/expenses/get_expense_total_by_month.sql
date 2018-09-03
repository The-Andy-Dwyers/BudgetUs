SELECT SUM(cost), date_trunc('month',expense_date) as month
FROM expenses
WHERE user_id = $1
AND
expense_date >= $2 
AND
expense_date <= $3
GROUP BY date_trunc('month', expense_date)
ORDER BY  date_trunc('month',expense_date);
