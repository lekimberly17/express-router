const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.json(fruits)
})

router.get("/:id", (req, res) => {
    const fruit = fruits[req.params.id - 1]
    res.json(fruit)
})

// Exercise 2

// Get all fruits
router.get('/fruits', async (req, res) => {
    try {
      const allFruits = await fruits.findAll()
      res.json(allFruits)
    } catch (error) {
      console.error(error)
      res.status(500).send('Cannot get fruits')
    }
  })
  
  // Get a particular fruit by ID
  router.get('/fruits/:id', async (req, res) => {
    try {
      const id = req.params.id
      const foundFruit = await fruits.findByPk(id)
      if (foundFruit) {
        res.json(foundFruit)
      } else {
        res.status(404).send('Fruit not found')
      }
    } catch (error) {
      console.error(error)
      res.status(500).send('Cannot get fruit')
    }
  })

// Create POST /fruits route handler for creating new fruit in the fruit Express Router.
router.post('/fruits', async (req, res) => {
    try {
      const { name, color } = req.body
      const newFruit = await fruits.create({ name, color })
      res.status(200).send('New fruit successfully created!')
    } catch (error) {
      console.error(error)
      res.status(500).send('Cannot create new fruit')
    }
  })


// Create PUT /fruits/<id> route handler for updating a fruit in the fruit Express Router.
router.put('/fruits/:id', async (req, res) => {
    try {
      const id = req.params.id
      const foundFruit = await fruits.findByPk(id)
      if (foundFruit) {
        const { name, color } = req.body
        await fruits.update({ name, color }, { where: { id } })
        res.status(200).send('Fruit updated successfully!')
      } else {
        res.status(404).send('Fruit not found')
      }
    } catch (error) {
      console.error(error)
      res.status(500).send('Cannot update fruit')
    }
  })

// DELETE /fruits/<id> route handler for removing a fruit in the fruit Express Router.
router.delete('/fruits/:id', async (req, res) => {
    try {
      const id = req.params.id
      const foundFruit = await fruits.findByPk(id)
      if (foundFruit) {
        await fruits.destroy({ where: { id } })
        res.status(200).send('Fruit deleted successfully!')
      } else {
        res.status(404).send('Fruit not found')
      }
    } catch (error) {
      console.error(error)
      res.status(500).send('Cannot delete fruit')
    }
  })


module.exports = router

// List of Fruits
let fruits = [
    {
        name: "Apple",
        color: "Red"
    },
    {
        name: "Banana",
        color: "Yellow"
    },
    {
        name: "Kiwi",
        color: "Green"
    },
    {
        name: "Grape",
        color: "Purple"
    },
]