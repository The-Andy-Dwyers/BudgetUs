SELECT * FROM income
WHERE user_id = $1
ORDER BY amount desc;