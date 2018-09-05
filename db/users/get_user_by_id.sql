UPDATE users SET login = login + 1
WHERE  auth_id = $1
RETURNING *;