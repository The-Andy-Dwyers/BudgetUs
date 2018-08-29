SELECT SUM(amount)
FROM income
WHERE user_id = $1;