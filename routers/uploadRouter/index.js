import express from 'express'
import {
  uploadAvatar,
  uploaderAvatar,
  uploadBackgroundImage,
  uploaderBackgroundImage,
  uploadPostsImage,
  uploaderPostsImage,
  uploadPostsVideo,
  uploaderPostsVideo,
} from '../../controllers/upload.controller.js'
import { isAuth } from '../../util/util.js'

const uploadRouter = express.Router()

//Avatar
uploadRouter.post(
  '/avatar',
  isAuth,
  uploadAvatar.single('imagenAvatar'),
  uploaderAvatar
)

//BackgroundImage
uploadRouter.post(
  '/backgroundImage',
  isAuth,
  uploadBackgroundImage.single('imagenBackgroundImage'),
  uploaderBackgroundImage
)

//Posts Image
uploadRouter.post(
  '/postsImage',
  isAuth,
  uploadPostsImage.single('imagenPosts'),
  uploaderPostsImage
)

//Posts Video
uploadRouter.post(
  '/postsVideo',
  isAuth,
  uploadPostsVideo.single('videoPosts'),
  uploaderPostsVideo
)

export default uploadRouter
