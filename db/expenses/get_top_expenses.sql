SELECT * FROM expenses
WHERE user_id = $1
order by cost desc
LIMIT 5;