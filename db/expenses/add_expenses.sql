INSERT INTO expenses (title, cost, occur, expense_date,company,category, user_id)
VALUES ($1,$2,$3,$4,$5,$6,$7)
returning *