SELECT * FROM(SELECT  month FROM (SELECT DISTINCT to_char( date_trunc('month',date),'Month') as income_month, to_char( date_trunc('month',expense_date),'Month') as month FROM income inc
JOIN expenses ex ON ex.user_id = inc.user_id
WHERE inc.user_id = $1
AND date  >= $2
AND expense_date >= $2
AND date <= $3
AND expense_date <= $3
GROUP BY date, expense_date) a
GROUP BY month


UNION 

SELECT  income_month FROM (SELECT DISTINCT to_char( date_trunc('month',date),'Month') as income_month, to_char( date_trunc('month',expense_date),'Month') as month FROM income inc
JOIN expenses ex ON ex.user_id = inc.user_id
WHERE inc.user_id = $1
AND date  >= $2
AND expense_date >= $2
AND date <= $3
AND expense_date <= $3
GROUP BY date, expense_date) a
GROUP BY income_month) b
ORDER BY  to_date(month,'Month')