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

categoryRouter.get('/',  findAllCategories)

categoryRouter.get('/:id',  findOneCategory)

categoryRouter.put('/:id', isAuth, updateCategory)

export default categoryRouter
