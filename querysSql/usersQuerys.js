//register
export const selectQueryRegister = (email, nickname) => {
  return `SELECT * FROM users WHERE email = '${email}' || nickname = '${nickname}'`
}

export const intoQueryRegister = (username, passwd, email, nickname) => {
  return `INSERT INTO users ( username, password, email, nickname) VALUES ( '${username}',  '${passwd}', '${email}','${nickname}')`
}

//login
export const selectQueryLogin = (email) => {
  return `SELECT * FROM users WHERE email = '${email}'`
}

//login with google
export const selectQueryGoogleLogin = (email) => {
  return `SELECT * FROM users WHERE email = '${email}'`
}

export const intoQueryGoogleLogin = (name, passwd, email) => {
  return `INSERT INTO users ( username, password, email ) VALUES ( '${name}',  '${passwd}', '${email}')`
}

//get users
export const selectQueryGetUsers = () => {
  return `SELECT * FROM users`
}

//get to id user
export const selectQueryGetUserToId = (id) => {
  return `SELECT * FROM users WHERE id = '${id}'`
}

//update profile
export const selectQueryUpdateUser = (id) => {
  return `SELECT * FROM users WHERE id = '${id}'`
}

export const updateQueryUpdateUser = (id, updatedUsertoDB) => {
  return 'UPDATE users set ? WHERE id = ?', [updatedUsertoDB, id]
}

//edite user
export const selectQueryEditUser = (id) => {
  return `SELECT * FROM users WHERE id = '${id}'`
}

export const updateQueryEditUser = (id, updatedUsertoDB) => {
  return 'UPDATE users set ? WHERE id = ?', [updatedUsertoDB, id]
}

//delete user
export const selectQueryDeleteUser = (id) => {
  return `SELECT * FROM users WHERE id = '${id}'`
}

export const deleteQueryDeleteUser = (id) => {
  return `DELETE  FROM users WHERE id = '${id}'`
}
