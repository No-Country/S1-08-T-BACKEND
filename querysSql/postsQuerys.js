//create post

export const intoQueryCreatePost = (
  userid,
  title,
  description,
  image,
  video,
  category
) => {
  return `INSERT INTO posts ( userid,title, description, image,video, categoryId) VALUES ( '${userid}', '${title}',  '${description}','${image}', '${video}', '${category}')`
}

//get posts
export const selectQueryGetposts = () => {
  return `SELECT  P.id, P.userid, U.username, U.avatar, P.description, P.image, P.created_at,C.name as 'category',  P.likes FROM posts as P INNER JOIN users as U Inner join category as C WHERE P.userid=U.id and C.id=P.categoryId`
}

//get post to id
export const selectQueryGetPostToId = (id) => {
  return `SELECT  P.id, P.userid, U.username, U.avatar, P.description, P.image, P.created_at, C.name as 'category', P.likes FROM posts as P INNER JOIN users as U Inner join category as C WHERE  P.id = '${id}' && P.userid=U.id and C.id=P.categoryId`
}

//get all posts to user
export const selectQueryGetAllPostToUserId = (userid) => {
  return `SELECT  P.id, P.userid, U.username, U.avatar, P.description, P.image, P.created_at, C.name as 'category', P.likes FROM posts as P INNER JOIN users as U Inner join category as C WHERE  P.userid = '${userid}' && P.userid=U.id and C.id=P.categoryId`
}

//edite post
export const selectQueryEditPost = (id) => {
  return `SELECT * FROM posts WHERE id = '${id}'`
}

export const updateQueryEditPost = () => {
  return 'UPDATE post s set ? WHERE id = ?'
}

//update likes post
export const selectQuerylikesPost = (id) => {
  return `SELECT * FROM posts WHERE id = '${id}'`
}

export const updateQuerylikesPost = () => {
  return 'UPDATE posts set ? WHERE id = ?'
}

//delete post
export const selectQueryDeletePost = (id) => {
  return `SELECT * FROM posts WHERE id = '${id}'`
}

export const deleteQueryDeletePost = (id) => {
  return `DELETE  FROM posts WHERE id = '${id}'`
}
