import { Router } from 'express'
import {
  createCategory,
  findOneCategory,
  findAllCategories,
  updateCategory,
} from '../../controllers/category.controller.js'
import { isAuth } from '../../util/util.js'

const categoryRouter = Router()

categoryRouter.post('/', isAuth, createCategory)

categoryRouter.get('/', isAuth, findAllCategories)

categoryRouter.get('/:id', isAuth, findOneCategory)

categoryRouter.put('/:id', isAuth, updateCategory)

export default categoryRouter
