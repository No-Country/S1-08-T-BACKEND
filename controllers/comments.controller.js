import expressAsyncHandler from 'express-async-handler'
import db from '../mysqlConnection/mysqlConnection.js'
import {
  intoQueryCreateComment,
  selectQueryGetComments,
  selectQueryGetCommentToId,
  selectQueryEditComment,
  updateQueryEditComment,
  selectQuerylikesComment,
  updateQuerylikesComment,
  selectQueryDeleteComment,
  deleteQueryDeleteComment,
} from '../querysSql/commentsQuerys.js'

//create comment
export const createComment = expressAsyncHandler(async (req, res) => {
  const { postid, userid, comment } = req.body

  try {
    const sqlMakecomment_into = intoQueryCreateComment(postid, userid, comment)
    await db.query(sqlMakecomment_into)

    // status code 201  if all goes well, return ok: true
    res.status(201).json({
      ok: true,
      msg: 'comment created',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'An error has arisen in the process, please review',
    })
  }
})

//get all comments to posts
export const getComments = expressAsyncHandler(async (req, res) => {
  const { postid } = req.params

  try {
    const sqlMakecomments = selectQueryGetComments(postid)
    const comments = await db.query(sqlMakecomments)

    console.log(comments)

    if (comments.length > 0) {
      res.status(200).send(comments)
    } else {
      res.status(400).json({
        ok: false,
        msg: 'No comments',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'An error has arisen in the process, please review',
    })
  }
})

//get comment to id
export const getCommentToId = expressAsyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const sqlMakecomment = selectQueryGetCommentToId(id)
    const comment = await db.query(sqlMakecomment)
    console.log(comment[0])
    if (comment[0]) {
      res.status(200).json(comment[0])
    } else {
      res.status(404).json({
        ok: false,
        msg: 'comment not found',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'An error has arisen in the process, please review',
    })
  }
})

//edite comment
export const editComment = expressAsyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    // query to mysql DB
    const sqlMakecomment = selectQueryEditComment(id)
    const comment = await db.query(sqlMakecomment)
    console.log(comment[0])

    // data from mysql DB
    const { comment: commentDB } = comment[0]

    // data from require body
    const { comment: commentReq } = req.body

    if (comment[0]) {
      const updatedCommenttoDB = {
        comment: commentReq || commentDB,
      }

      await db.query(updateQueryEditComment(), [updatedCommenttoDB, id])
      res.status(201).json({
        ok: true,
        msg: 'comment updated successfully',
      })
    } else {
      res.status(404).json({
        ok: false,
        msg: 'comment not found',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'An error has arisen in the process, please review',
    })
  }
})

// update likes
export const likesComment = expressAsyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    // query to mysql DB
    const sqlMakecomment = selectQuerylikesComment(id)
    const comment = await db.query(sqlMakecomment)

    // data from mysql DB
    const { likes: likesDB } = comment[0]

    // data from require body
    const { likes } = req.body

    if (comment[0]) {
      const updatedCommenttoDB = {
        likes: likes || likesDB,
      }

      await db.query(updateQuerylikesComment(), [updatedCommenttoDB, id])
      res.status(201).json({
        ok: true,
        msg: 'comment updated successfully',
      })
    } else {
      res.status(404).json({
        ok: false,
        msg: 'comment not found',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'An error has arisen in the process, please review',
    })
  }
})

//delete comment
export const deleteComment = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params

    // select query
    const sqlMakecomment_select = selectQueryDeleteComment(id)
    const comment = await db.query(sqlMakecomment_select)

    // delete query
    const sqlMakeUser_delete = deleteQueryDeleteComment(id)
    console.log(comment)
    if (comment[0]) {
      await db.query(sqlMakeUser_delete)
      res.status(201).json({
        ok: true,
        msg: 'comment removed successfully',
      })
    } else {
      res.status(404).json({
        ok: false,
        msg: 'comment not exist',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'An error has arisen in the process, please review',
    })
  }
})
