//register
export const selectQueryRegister = (email) => {
  return `SELECT * FROM users WHERE email = '${email}'`
}

export const intoQueryRegister = (username, passwd, email, nickname) => {
  return `INSERT INTO users ( username, password, email, nickname) VALUES ( '${username}',  '${passwd}', '${email}','${nickname || null}')`
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

export const updateQueryUpdateUser = () => {
  return 'UPDATE users set ? WHERE id = ?'
}

//edite user
export const selectQueryEditUser = (id) => {
  return `SELECT * FROM users WHERE id = '${id}'`
}

export const updateQueryEditUser = () => {
  return 'UPDATE users set ? WHERE id = ?'
}

//delete user
export const selectQueryDeleteUser = (id) => {
  return `SELECT * FROM users WHERE id = '${id}'`
}

export const deleteQueryDeleteUser = (id) => {
  return `DELETE  FROM users WHERE id = '${id}'`
}
