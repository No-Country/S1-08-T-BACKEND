//followerRouter

import { Router } from 'express';
import {
    createfollower,
    deletefollower,
    getAllfollowingToUserId,
    getAllfollowersToUserId,
    getfollowerToId,
} from '../../controllers/followers.controller.js';
import { isAuth } from '../../util/util.js';

const followerRouter = Router();





// follower followers router
followerRouter.post('/',isAuth, createfollower);

// get followers from user router
followerRouter.get('/followersToUserid/:userid',getAllfollowersToUserId);

// get following from user router
followerRouter.get('/followingToUserid/:userid', getAllfollowingToUserId);


// get follower/id router
followerRouter.get('/:id', getfollowerToId );


// delete follower router
followerRouter.delete('/delete/:id',isAuth, deletefollower );


export default followerRouter;