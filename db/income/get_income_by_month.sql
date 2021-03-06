SELECT SUM(amount), to_char( date_trunc('month',date),'Month') as month
FROM income
WHERE user_id = $1
AND
date >= $2 
AND
date <= $3
GROUP BY date_trunc('month', date)
ORDER BY  date_trunc('month', date);