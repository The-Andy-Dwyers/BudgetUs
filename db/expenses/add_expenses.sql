insert into expenses (name, amount, type, date,company,category)
values ($1,$2,$3,$4,$5,$6)
returning *