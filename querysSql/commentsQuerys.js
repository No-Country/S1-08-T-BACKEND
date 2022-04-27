//create post

export const intoQueryCreateComment = (postid, userid, comment) => {
  return `INSERT INTO comments ( postid, userid, comment ) VALUES ( '${postid}', '${userid}', '${comment}')`
}

//get all comments to posts
export const selectQueryGetComments = (postid) => {
  return `SELECT  C.id, C.postid, C.userid, U.username, U.avatar, C.comment, C.created_at, C.likes FROM comments as C INNER JOIN users as U WHERE C.postid ='${postid}' && C.userid=U.id`
}

//get post to id
export const selectQueryGetCommentToId = (id) => {
  return `SELECT  C.id, C.postid, C.userid, U.username, U.avatar, C.comment, C.created_at, C.likes FROM comments as C INNER JOIN users as U WHERE  C.id = '${id}' && C.userid=U.id`
}

//edite post
export const selectQueryEditComment = (id) => {
  return `SELECT * FROM comments WHERE id = '${id}'`
}

export const updateQueryEditComment = () => {
  return 'UPDATE comments set ? WHERE id = ?'
}

//update likes post
export const selectQuerylikesComment = (id) => {
  return `SELECT * FROM comments WHERE id = '${id}'`
}

export const updateQuerylikesComment = () => {
  return 'UPDATE comments set ? WHERE id = ?'
}

//delete post
export const selectQueryDeleteComment = (id) => {
  return `SELECT * FROM comments WHERE id = '${id}'`
}

export const deleteQueryDeleteComment = (id) => {
  return `DELETE FROM comments WHERE id = '${id}'`
}
