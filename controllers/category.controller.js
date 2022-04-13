import expressAsyncHandler from 'express-async-handler'
import db from '../mysqlConnection/mysqlConnection.js'
export const createCategory = expressAsyncHandler(async (req, res) => {
  const { name } = req.body
  try {
    const newCategory = `INSERT INTO category(name) values ('${name}')`
    await db.query(newCategory)
    res.status(201).json({
      ok: true,
      msg: 'created',
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'An error occurred',
    })
  }
})

export const findAllCategories = expressAsyncHandler(async (_, res) => {
  try {
    const allCategory = `select * from category`
    const response = await db.query(allCategory)
    if (!response) {
      res.status(404).send({
        ok: true,
        msg: "There isn't any category",
      })
    } else {
      res.json(response)
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'An error occurred',
    })
  }
})
export const findOneCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const getCategory = `select * from category where id=${id}`
    const response = await db.query(getCategory)[0]
    if (!response) {
      res.status(404).json({
        ok: true,
        msg: 'Category not found',
      })
    } else {
      res.json(response[0])
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'An error occurred',
    })
  }
})
export const updateCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  try {
    const query = `update category set name='${name}' where id=${id}`
    const updated = db.query(query)
    res.json(updated)
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'An error occurred',
    })
  }
})
