import expressAsyncHandler from 'express-async-handler'
import db from '../mysqlConnection/mysqlConnection.js'
import {
  deleteQueryDeletePost,
  intoQueryCreatePost,
  selectQueryDeletePost,
  selectQueryEditPost,
  selectQueryGetAllPostToUserId,
  selectQueryGetposts,
  selectQueryGetPostToId,
  selectQuerylikesPost,
  updateQueryEditPost,
  updateQuerylikesPost,
} from '../querysSql/postsQuerys.js'

//create post
export const createPost = expressAsyncHandler(async (req, res) => {
  const { userid, title, description, image, video, category } = req.body

  try {
    const sqlMakePost_into = intoQueryCreatePost(
      userid,
      title,
      description,
      image,
      video,
      category,
    )
    await db.query(sqlMakePost_into)

    // status code 201  if all goes well, return ok: true
    res.status(201).json({
      ok: true,
      msg: 'Se ha creado la publicacion correctamente',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Un error ha ocurrido, por favor revise',
    })
  }
})

//get posts
export const getPosts = expressAsyncHandler(async (req, res) => {
  try {
    const sqlMakePosts = selectQueryGetposts()
    const posts = await db.query(sqlMakePosts)

    console.log(posts)

    if (posts.length > 0) {
      res.status(200).send(posts)
    } else {
      res.status(400).json({
        ok: false,
        msg: 'No Posts',
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

//get post to id
export const getPostToId = expressAsyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const sqlMakePost = selectQueryGetPostToId(id)
    const post = await db.query(sqlMakePost)
    console.log(post[0])
    if (post[0]) {
      const {
        id: idDB,
        userid: useridDB,
        username: usernameDB,
        avatar: avatarDB,
        description: descriptionDB,
        image: imageDB,
        created_at: created_atDB,
        likes: likesDB,
        category: categoryDB,
      } = post[0]

      res.status(200).json({
        id: idDB,
        userid: useridDB,
        username: usernameDB,
        avatar: avatarDB,
        description: descriptionDB,
        image: imageDB,
        likes: likesDB,
        category: categoryDB,
        created_at: created_atDB,
      })
    } else {
      res.status(404).json({
        ok: false,
        msg: 'Publicacion no encontrada',
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

//get all posts to user
export const getAllPostToUserId = expressAsyncHandler(async (req, res) => {
  const { userid } = req.params

  try {
    const sqlMakePost = selectQueryGetAllPostToUserId(userid)
    const post = await db.query(sqlMakePost)
    console.log(post)
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({
        ok: false,
        msg: 'Publicacion no encontrada',
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

//edite post
export const editPost = expressAsyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    // query to mysql DB
    const sqlMakePost = selectQueryEditPost(id)
    const post = await db.query(sqlMakePost)
    console.log(post[0])

    // data from mysql DB
    const { category: categoryDB, description: descriptionDB } = post[0]

    // data from require body
    const { category, description } = req.body

    if (post[0]) {
      const updatedPosttoDB = {
        category: category || categoryDB,
        description: description || descriptionDB,
      }

      await db.query(updateQueryEditPost(), [updatedPosttoDB, id])
      res.status(201).json({
        ok: true,
        msg: 'Publicacion actualizada correctamente',
      })
    } else {
      res.status(404).json({
        ok: false,
        msg: 'Publicacion no encontrada',
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

// update likes post
export const likesPost = expressAsyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    // query to mysql DB
    const sqlMakePost = selectQuerylikesPost(id)
    const post = await db.query(sqlMakePost)

    // data from mysql DB
    const { likes: likesDB } = post[0]

    // data from require body
    const { likes } = req.body

    if (post[0]) {
      const updatedPosttoDB = {
        likes: likes || likesDB,
      }

      await db.query(updateQuerylikesPost(), [updatedPosttoDB, id])
      res.status(201).json({
        ok: true,
        msg: 'Publicacion actualizada correctamente',
      })
    } else {
      res.status(404).json({
        ok: false,
        msg: 'Publicacion no encontrada',
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

//delete post
export const deletePost = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params

    // select query
    const sqlMakePost_select = selectQueryDeletePost(id)
    const post = await db.query(sqlMakePost_select)

    // delete query
    const sqlMakeUser_delete = deleteQueryDeletePost(id)
    console.log(post)
    if (post[0]) {
      await db.query(sqlMakeUser_delete)
      res.status(201).json({
        ok: true,
        msg: 'Publicacion eliminada correctamente',
      })
    } else {
      res.status(404).json({
        ok: false,
        msg: 'Publicacion no encontrada',
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
