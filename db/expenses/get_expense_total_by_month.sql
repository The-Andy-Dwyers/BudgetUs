SELECT SUM(cost), to_char( date_trunc('month',expense_date),'Month') as month
FROM expenses
WHERE user_id = $1
AND
expense_date >= $2 
AND
expense_date <= $3
GROUP BY date_trunc('month', expense_date)
ORDER BY  date_trunc('month',expense_date);