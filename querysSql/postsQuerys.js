//create post 

export const intoQueryCreatePost = ( userid, description, image, category, likes) => {
    return`INSERT INTO posts ( userid, description, image, category, likes) VALUES ( '${userid}', '${description}','${image}','${category}','${likes}')`;
}

//get posts
export const selectQueryGetposts  = () => {
    return `SELECT  P.id, P.userid, U.username, U.avatar, P.description, P.image, P.created_at, P.category, P.likes FROM posts as P INNER JOIN users as U WHERE P.userid=U.id`;
}

//get to id post 
export const selectQueryGetPostToId = (id) => {
    return `SELECT  P.id, P.userid, U.username, U.avatar, P.description, P.image, P.created_at, P.category, P.likes FROM posts as P INNER JOIN users as U WHERE  P.id = '${id}' && P.userid=U.id`;
}

//get all posts to user
export const selectQueryGetAllPostToUserId = (userid) => {
    return `SELECT  P.id, P.userid, U.username, U.avatar, P.description, P.image, P.created_at, P.category, P.likes FROM posts as P INNER JOIN users as U WHERE  P.userid = '${userid}' && P.userid=U.id`;
}

//edite post 
export const selectQueryEditPost = (id) => {
    return `SELECT * FROM posts WHERE id = '${id}'`;

}

export const updateQueryEditPost = (id, updatedPosttoDB) => {
    return 'UPDATE post s set ? WHERE id = ?', [updatedPosttoDB, id];
}

//update likes post
export const selectQuerylikesPost = (id) => {
    return`SELECT * FROM posts WHERE id = '${id}'`;
}

export const updateQuerylikesPost = (id, updatedPosttoDB) => {
    return 'UPDATE posts set ? WHERE id = ?', [updatedPosttoDB, id];
}



//delete post 
export const selectQueryDeletePost = (id) => {
    return `SELECT * FROM posts WHERE id = '${id}'`;

}

export const deleteQueryDeletePost = (id) => {
    return `DELETE  FROM posts WHERE id = '${id}'`;

}