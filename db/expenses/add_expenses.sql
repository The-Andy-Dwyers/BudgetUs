insert into expenses (title, amount, type, expense_date,company,category, user_id)
values ($1,$2,$3,$4,$5,$6,$7)
returning *