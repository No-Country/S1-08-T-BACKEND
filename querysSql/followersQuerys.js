//create follower
export const selectQueryCreatefollower = (userid, followerId) => {
    return `SELECT * FROM followers WHERE userid = '${userid}' && followerId = '${followerId}'`
}

export const intoQueryCreatefollower = (userid, followerId) => {
    return `INSERT INTO followers ( userid, followerId ) VALUES ( '${userid}', '${followerId}')`;
}

//get follower to id
export const selectQueryGetAllfollowers = (id) => {
    return `SELECT  F.id, F.userid, F.followerId, U.username, U.nickname, U.avatar FROM followers as F INNER JOIN users as U WHERE F.userid=U.id`
}

//get follower to id
export const selectQueryGetfollowerToId = (id) => {
    return `SELECT  F.id, F.userid, F.followerId, U.username, U.nickname, U.avatar FROM followers as F INNER JOIN users as U WHERE  F.id = '${id}' &&  F.userid=U.id`
}

//get all followers to user
export const selectQueryGetAllfollowerToUserId = (userid) => {
    return `SELECT  F.id, F.userid, F.followerId, U.username, U.nickname, U.avatar FROM followers as F INNER JOIN users as U  WHERE  F.followerId = '${userid}' && F.userid=U.id`
}

//get all following to user
export const selectQueryGetAllfollowingToUserId = (userid) => {
    return `SELECT  F.id, F.userid, F.followerId, U.username, U.nickname, U.avatar FROM followers as F INNER JOIN users as U  WHERE  F.userid = '${userid}' && F.followerId=U.id`
}


//delete follower
export const selectQueryDeletefollower = (id) => {
    return `SELECT * FROM followers WHERE id = '${id}'`
}

export const deleteQueryDeletefollower = (id) => {
    return `DELETE  FROM followers WHERE id = '${id}'`
}


//delete All follower

export const deleteQueryDeleteAllfollower = (id) => {
    return `DELETE  FROM followers`
}
