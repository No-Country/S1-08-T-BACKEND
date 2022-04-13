import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import db from '../mysqlConnection/mysqlConnection.js'
import { generateToken } from '../util/util.js'
import { OAuth2Client } from 'google-auth-library'
import { client_secret_google } from '../client_secret_google.js'
import {
  deleteQueryDeleteUser,
  intoQueryGoogleLogin,
  intoQueryRegister,
  selectQueryDeleteUser,
  selectQueryEditUser,
  selectQueryGetUsers,
  selectQueryGetUserToId,
  selectQueryGoogleLogin,
  selectQueryLogin,
  selectQueryRegister,
  selectQueryUpdateUser,
  updateQueryEditUser,
  updateQueryUpdateUser,
} from '../querysSql/usersQuerys.js'

const client = new OAuth2Client(client_secret_google.client_id)

//using expressAsyncHandler to get better the async

//register
export const register = expressAsyncHandler(async (req, res) => {
  const { email, password, username, nickname } = req.body

  try {
    //check if the user already exists
    const sqlMakeUser_select = selectQueryRegister(email)
    let user = await db.query(sqlMakeUser_select)
    console.log(user)
    if (user.length > 0) {
      return res.status(400).json({
        ok: false,
        msg: 'Este usuario ya existe',
      })
    }

    //using bcrypt to encrypt the password
    const salt = bcrypt.genSaltSync()
    const passwd = bcrypt.hashSync(password, salt)

    const sqlMakeUser_into = intoQueryRegister(
      username,
      passwd,
      email,
      nickname
    )
    user = await db.query(sqlMakeUser_into)

    // status code 201  if all goes well, return ok: true
    res.status(201).json({
      ok: true,
      msg: 'Ususario registrado',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Un error ha ocurrido, por favor revise',
    })
  }
})

//login
export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body
  try {
    const sqlMakeUser = selectQueryLogin(email)
    let user = await db.query(sqlMakeUser)
    console.log(user)

    if (user?.length === 0) {
      return res.status(400).json({
        ok: false,
        msg: 'No existe un usuario con ese email',
      })
    }

    const {
      id: idDB,
      username: usernameDB,
      email: emailDB,
      password: passwordDB,
      nickname: nicknameDB,
      avatar: avatarDB,
      backgroundImage: backgroundImageDB,
    } = user[0]
    // password confirm
    const validPassword = bcrypt.compareSync(password, passwordDB)
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña incorrecta',
      })
    }
    // Generate JWT
    const token = generateToken(user[0])

    res.json({
      id: idDB,
      username: usernameDB,
      email: emailDB,
      nickname: nicknameDB,
      avatar: avatarDB,
      backgroundImage: backgroundImageDB,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Un error ha ocurrido, por favor revise',
    })
  }
})

//login with google
export const googleLogin = expressAsyncHandler(async (req, res) => {
  const { tokenId } = req.body

  try {
    const response = await client.verifyIdToken({
      idToken: tokenId,
      audience: client_secret_google.client_id,
    })
    const { email_verified, name, email } = response.payload

    console.log(email_verified, name, email)

    console.log(response.payload)

    if (email_verified) {
      //check if the user already exists

      const getUserDB = async () => {
        const sqlMakeUser_select = selectQueryGoogleLogin(email)
        return await db.query(sqlMakeUser_select)
      }

      const user = await getUserDB()

      console.log(user[0])

      if (user.length > 0) {
        const {
          id: idDB,
          username: usernameDB,
          email: emailDB,
          nickname: nicknameDB,
          avatar: avatarDB,
          backgroundImage: backgroundImageDB,
        } = user[0]

        const token = generateToken(user[0])

        res.json({
          id: idDB,
          username: usernameDB,
          email: emailDB,
          nickname: nicknameDB,
          avatar: avatarDB,
          backgroundImage: backgroundImageDB,
          token,
        })
      } else {
        let password = email + Math.random()
        console.log(password)

        //using bcrypt to encrypt the password
        const salt = bcrypt.genSaltSync()
        const passwd = bcrypt.hashSync(password, salt)

        const intoUserDB = async () => {
          const sqlMakeUser_into = intoQueryGoogleLogin(name, passwd, email)
          await db.query(sqlMakeUser_into)
        }

        await intoUserDB()

        const getUserDB = async () => {
          const sqlMakeUser_select = selectQueryGoogleLogin(email)
          return await db.query(sqlMakeUser_select)
        }

        const user = await getUserDB()

        if (user.length > 0) {
          const {
            id: idDB,
            username: usernameDB,
            email: emailDB,
            nickname: nicknameDB,
            avatar: avatarDB,
            backgroundImage: backgroundImageDB,
          } = user[0]

          const token = generateToken(user[0])

          res.json({
            id: idDB,
            username: usernameDB,
            email: emailDB,
            nickname: nicknameDB,
            avatar: avatarDB,
            backgroundImage: backgroundImageDB,
            token,
          })
        }
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Un error ha ocurrido, por favor revise',
    })
  }
})

//get users
export const getUsers = expressAsyncHandler(async (req, res) => {
  try {
    const sqlMakeUser = selectQueryGetUsers()
    const user = await db.query(sqlMakeUser)

    console.log(user)
    res.status(200).send(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Un error ha ocurrido, por favor revise',
    })
  }
})

//get to id user
export const getUserToId = expressAsyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const sqlMakeUser = selectQueryGetUserToId(id)
    const user = await db.query(sqlMakeUser)
    console.log(user[0])
    if (user[0]) {
      const {
        id: idDB,
        username: usernameDB,
        email: emailDB,
        nickname: nicknameDB,
        avatar: avatarDB,
        backgroundImage: backgroundImageDB,
      } = user[0]

      res.status(200).json({
        id: idDB,
        username: usernameDB,
        emial: emailDB,
        nickname: nicknameDB,
        avatar: avatarDB,
        backgroundImage: backgroundImageDB,
      })
    } else {
      res.status(404).json({
        ok: false,
        msg: 'Usuario no encontrado',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Un error ha ocurrido, por favor revise',
    })
  }
})

//update profile
export const updateUser = expressAsyncHandler(async (req, res) => {
  // data from require body
  const {
    id,
    username,
    password,
    email,
    nickname,
    avatar,
    backgroundImage,
    biography,
  } = req.body

  try {
    // query to mysql DB
    const sqlMakeUser = selectQueryUpdateUser(id)
    const user = await db.query(sqlMakeUser)

    // data from mysql DB
    const {
      username: usernameDB,
      password: passwordDB,
      email: emailDB,
      nickname: nicknameDB,
      avatar: avatarDB,
      backgroundImage: backgroundImageDB,
      biography: biographyDB,
    } = user[0]

    let newPassword = null
    if (user[0]) {
      if (password) {
        const salt = bcrypt.genSaltSync()
        newPassword = bcrypt.hashSync(password, salt)
      }
      const updatedUsertoDB = {
        username: username || usernameDB,
        email: email || emailDB,
        nickname: nickname || nicknameDB,
        password: newPassword || passwordDB,
        avatar: avatar || avatarDB,
        backgroundImage: backgroundImage || backgroundImageDB,
        biography: biography || biographyDB,
      }

      //update user
      await db.query(updateQueryUpdateUser(),[updatedUsertoDB, id])
      res.status(201).json({
        ok: true,
        msg: 'Usuario actualizado correctamente',
        updatedUser: {
          username: username || usernameDB,
          email: email || emailDB,
          nickname: nickname || nicknameDB,
          avatar: avatar || avatarDB,
          backgroundImage: backgroundImage || backgroundImageDB,
          biography: biography || biographyDB,
          token: generateToken(updatedUsertoDB),
        },
      })
    } else {
      res.status(404).json({
        ok: false,
        msg: 'Ususario no encontrado',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Un error ha ocurrido, por favor revise',
    })
  }
})

//edite user
export const editUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    // query to mysql DB
    const sqlMakeUser = selectQueryEditUser(id)
    const user = await db.query(sqlMakeUser)

    // data from mysql DB
    const {
      username: usernameDB,
      email: emailDB,
      nickname: nicknameDB,
    } = user[0]

    // data from require body
    const { username, email, nickname } = req.body

    if (user[0]) {
      const updatedUsertoDB = {
        username: username || usernameDB,
        email: email || emailDB,
        nickname: nickname || nicknameDB,
      }

      //update user
      await db.query(updateQueryEditUser(),[updatedUsertoDB, id])
      res.status(201).json({
        ok: true,
        msg: 'Usuario actualizado correctamente',
      })
    } else {
      res.status(404).json({
        ok: false,
        msg: 'Ususario no encontrado',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Un error ha ocurrido, por favor revise',
    })
  }
})

//delete user
export const deleteUser = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params

    // select query
    const sqlMakeUser_select = selectQueryDeleteUser(id)
    const user = await db.query(sqlMakeUser_select)

    // delete query
    const sqlMakeUser_delete = deleteQueryDeleteUser(id)
    console.log(user)
    if (user[0]) {
      await db.query(sqlMakeUser_delete)
      res.status(201).json({
        ok: true,
        msg: 'Ususario eliminado correctamente',
      })
    } else {
      res.status(404).json({
        ok: false,
        msg: 'Ususario no encontrado',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Un error ha ocurrido, por favor revise',
    })
  }
})
