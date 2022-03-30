import expressAsyncHandler from 'express-async-handler';
import bcrypt from "bcryptjs";
import db from '../mysqlConnection/mysqlConnection.js';
import { generateToken } from '../util/util.js';
import { OAuth2Client } from 'google-auth-library'
import { client_secret_google } from '../client_secret_google.js';


const client = new OAuth2Client(client_secret_google.client_id);


//using expressAsyncHandler to get better the async

//register 
export const register = expressAsyncHandler(async (req, res) => {
  const { email, password, username, nickname } = req.body;

  try {
    //check if the user already exists
    const sqlMakeUser_select = `SELECT * FROM users WHERE email = '${email}' || nickname = '${nickname}'`;
    let user = await db.query(sqlMakeUser_select);
    console.log(user);
    if (user.length > 0) {
      return res.status(400).json({
        ok: false,
        msg: "User already exists"
      });
    }


    //using bcrypt to encrypt the password
    const salt = bcrypt.genSaltSync();
    const passwd = bcrypt.hashSync(password, salt);

    const sqlMakeUser_into = `INSERT INTO users ( username, password, email, nickname) VALUES ( '${username}',  '${passwd}', '${email}','${nickname}')`;
    user = await db.query(sqlMakeUser_into);

    // status code 201  if all goes well, return ok: true
    res.status(201).json({
      ok: true,
      msg: "User registered "
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "An error has arisen in the process, please review"
    });
  }



});




//login
export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const sqlMakeUser = `SELECT * FROM users WHERE email = '${email}'`;
    let user = await db.query(sqlMakeUser);
    console.log(user);

    if (user?.length === 0) {
      return res.status(400).json({
        ok: false,
        msg: "User not exist with this email"
      });
    }



    const { id: idDB, username: usernameDB, email: emailDB, password: passwordDB } = user[0];
    // password confirm
    const validPassword = bcrypt.compareSync(password, passwordDB);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid password"
      });
    }
    // Generate JWT
    const token = generateToken(user[0])

    res.json({
      ok: true,
      id: idDB,
      username: usernameDB,
      email: emailDB,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "An error has arisen in the process, please review"
    });
  }
});




//login with google
export const googleLogin = expressAsyncHandler(async (req, res) => {
  const { tokenId } = req.body;


  try {
    const response = await client.verifyIdToken({ idToken: tokenId, audience: client_secret_google.client_id })
    const { email_verified, name, email } = response.payload

    console.log(email_verified, name, email);

    console.log(response.payload);

    if (email_verified) {
      //check if the user already exists

      const getUserDB = async () => {

        const sqlMakeUser_select = `SELECT * FROM users WHERE email = '${email}'`;
        return await db.query(sqlMakeUser_select);
      }

      const user = await getUserDB();

      console.log(user[0]);

      if (user.length > 0) {


        const { id: idDB, username: usernameDB, email: emailDB } = user[0];

        const token = generateToken(user[0])

        res.json({
          ok: true,
          id: idDB,
          username: usernameDB,
          email: emailDB,
          token
        });

      } else {
        let password = email + Math.random();
        console.log(password);

        //using bcrypt to encrypt the password
        const salt = bcrypt.genSaltSync();
        const passwd = bcrypt.hashSync(password, salt);

        const intoUserDB = async () => {

          const sqlMakeUser_into = `INSERT INTO users ( username, password, email ) VALUES ( '${name}',  '${passwd}', '${email}')`;
          await db.query(sqlMakeUser_into);
        }

        await intoUserDB()

        const getUserDB = async () => {

          const sqlMakeUser_select = `SELECT * FROM users WHERE email = '${email}'`;
          return await db.query(sqlMakeUser_select);
        }

        const user = await getUserDB();

        if (user.length > 0) {



          const { id: idDB, username: usernameDB, email: emailDB } = user[0];

          const token = generateToken(user[0])

          res.json({
            ok: true,
            id: idDB,
            username: usernameDB,
            email: emailDB,
            token
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "An error has arisen in the process, please review"
    });
  }
});




//get users
export const getUsers = expressAsyncHandler(async (req, res) => {
  try {
    const sqlMakeUser = `SELECT * FROM users`
    const user = await db.query(sqlMakeUser);

    console.log(user);
    res.status(200).send(user);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "An error has arisen in the process, please review"
    });
  }
})

//get to id user
export const getUserToId = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const sqlMakeUser = `SELECT * FROM users WHERE id = '${id}'`
    const user = await db.query(sqlMakeUser);
    console.log(user[0]);
    if (user[0]) {

      const { id: idDB, username: usernameDB, email: emailDB, nickname: nicknameDB, avatar: avatarDB, backgroundImage: backgroundImageDB } = user[0];

      res.status(200).json({
        ok: true,
        id: idDB,
        username: usernameDB,
        emial: emailDB,
        nickname: nicknameDB,
        avatar: avatarDB,
        backgroundImage: backgroundImageDB
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: "User not found"
      });
    }


  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "An error has arisen in the process, please review"
    });
  }
});



//update profile
export const updateUser = expressAsyncHandler(async (req, res) => {
  // data from require body
  const { id, username, password, email, nickname, avatar, backgroundImage, biography } = req.body;

  try {

    // query to mysql DB 
    const sqlMakeUser = `SELECT * FROM users WHERE id = '${id}'`
    const user = await db.query(sqlMakeUser);

    // data from mysql DB
    const { username: usernameDB, password: passwordDB, email: emailDB, nickname: nicknameDB, avatar: avatarDB, backgroundImage: backgroundImageDB, biography: biographyDB } = user[0];

    let newPassword = null
    if (user[0]) {
      if (password) {
        const salt = bcrypt.genSaltSync();
        newPassword = bcrypt.hashSync(password, salt);
      }
      const updatedUsertoDB = {
        username: username || usernameDB,
        email: email || emailDB,
        nickname: nickname || nicknameDB,
        password: newPassword || passwordDB,
        avatar: avatar || avatarDB,
        backgroundImage: backgroundImage || backgroundImageDB,
        biography: biography || biographyDB

      }
      await db.query('UPDATE users set ? WHERE id = ?', [updatedUsertoDB, id]);
      res.status(201).json({
        ok: true,
        msg: "User updated successfully",
        updatedUser: {
          username: username || usernameDB,
          email: email || emailDB,
          nickname: nickname || nicknameDB,
          avatar: avatar || avatarDB,
          backgroundImage: backgroundImage || backgroundImageDB,
          biography: biography || biographyDB,
          token: generateToken(updatedUsertoDB)

        }
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: "User not found"
      });
    };
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "An error has arisen in the process, please review"
    });
  }
});



//edite user
export const editUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {


    // query to mysql DB 
    const sqlMakeUser = `SELECT * FROM users WHERE id = '${id}'`
    const user = await db.query(sqlMakeUser);

    // data from mysql DB
    const { username: usernameDB, email: emailDB, nickname: nicknameDB } = user[0];

    // data from require body
    const { username, email, nickname } = req.body;


    if (user[0]) {
      const updatedUsertoDB = {
        username: username || usernameDB,
        email: email || emailDB,
        nickname: nickname || nicknameDB
      }

      await db.query('UPDATE users set ? WHERE id = ?', [updatedUsertoDB, id]);
      res.status(201).json({
        ok: true,
        msg: "User updated successfully"
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: "User not found"
      });
    };
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "An error has arisen in the process, please review"
    });
  }
});



//delete user
export const deleteUser = expressAsyncHandler(async (req, res) => {
  try {

    const { id } = req.params;

    // select query
    const sqlMakeUser_select = `SELECT * FROM users WHERE id = '${id}'`;
    const user = await db.query(sqlMakeUser_select);


    // delete query
    const sqlMakeUser_delete = `DELETE FROM users WHERE id = '${id}'`
    console.log(user);
    if (user[0]) {
      await db.query(sqlMakeUser_delete);
      res.status(201).json({
        ok: true,
        msg: "User removed successfully"
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: "User not exist"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "An error has arisen in the process, please review"
    });
  }
});