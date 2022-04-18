import expressAsyncHandler from 'express-async-handler';
import db from '../mysqlConnection/mysqlConnection.js';
import { 
  deleteQueryDeletefollower, 
  intoQueryCreatefollower, 
  selectQueryCreatefollower, 
  selectQueryDeletefollower, 
  selectQueryGetAllfollowerToUserId, 
  selectQueryGetAllfollowingToUserId, 
  selectQueryGetfollowerToId 
} from '../querysSql/followersQuerys.js';




//create follower 
export const createfollower = expressAsyncHandler(async (req, res) => {

  const { userid, followerId } = req.body;

  try {

    //check if the user already exists
    const sqlMakeUser_select = selectQueryCreatefollower(userid, followerId);
    const follower = await db.query(sqlMakeUser_select);
    console.log(follower);
    if (follower.length > 0) {
      return res.status(400).json({
        ok: false,
        msg:  `follower already exist` 
      });
    }


    const sqlMakefollower_into =intoQueryCreatefollower(userid, followerId);
    await db.query(sqlMakefollower_into);

    // status code 201  if all goes well, return ok: true
    res.status(201).json({
      ok: true,
      msg: "follower created"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "An error has arisen in the process, please review"
    });
  }

});


//get follower to id
export const getfollowerToId = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const sqlMakefollower = selectQueryGetfollowerToId(id);
    const follower = await db.query(sqlMakefollower);
    console.log(follower[0]);
    if (follower[0]) {

      res.status(200).json(follower[0]);
    } else {
      res.status(404).json({
        ok: false,
        msg: "follower not found"
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


//get all followers to user
export const getAllfollowersToUserId = expressAsyncHandler(async (req, res) => {
  const { userid } = req.params;

  try {
    const sqlMakefollower = selectQueryGetAllfollowerToUserId(userid);
    const follower = await db.query(sqlMakefollower);
    console.log(follower);
    if (follower) {
      res.status(200).json(follower);
    } else {
      res.status(404).json({
        ok: false,
        msg: "follower not found"
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

//get all following to user
export const getAllfollowingToUserId = expressAsyncHandler(async (req, res) => {
  const { userid } = req.params;

  try {
    const sqlMakefollower = selectQueryGetAllfollowingToUserId(userid);
    const follower = await db.query(sqlMakefollower);
    console.log(follower);
    if (follower) {
      res.status(200).json(follower);
    } else {
      res.status(404).json({
        ok: false,
        msg: "follower not found"
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

//delete follower
export const deletefollower = expressAsyncHandler(async (req, res) => {
  try {

    const { id } = req.params;

    // select query
    const sqlMakefollower_select = selectQueryDeletefollower(id);
    const follower = await db.query(sqlMakefollower_select);


    // delete query
    const sqlMakeUser_delete = deleteQueryDeletefollower(id);
    console.log(follower);
    if (follower[0]) {
      await db.query(sqlMakeUser_delete);
      res.status(201).json({
        ok: true,
        msg: "follower removed successfully"
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: "follower not exist"
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
