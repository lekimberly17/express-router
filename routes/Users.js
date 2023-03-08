const express = require("express")
const router = express.Router()



router.get("/", (req, res) => {
    res.json(users)
})

router.get("/:id", (req, res) => {
    const users = users[req.params.id - 1]
    res.json(users)
})

// Exercise 2

// Get all users
router.get('/users', async (req, res) => {
    try {
      const allUsers = await users.findAll()
      res.json(allUsers)
    } catch (error) {
      console.error(error)
      res.status(500).send('Cannot get users')
    }
  })
  
  // Get a particular user by ID
  router.get('/users/:id', async (req, res) => {
    try {
      const id = req.params.id
      const foundUser = await users.findByPk(id)
      if (foundUser) {
        res.json(foundUser)
      } else {
        res.status(404).send('User not found')
      }
    } catch (error) {
      console.error(error)
      res.status(500).send('Cannot get user')
    }
  })

// POST /users route handler for creating a new user in the user Express router.
router.post('/users', async (req, res) => {
    try {
      const { name, age } = req.body
      const newUser = await users.create({ name, age })
      res.status(200).send('New user successfully created!')
    } catch (error) {
      console.error(error)
      res.status(500).send('Cannot create new user')
    }
  })


// PUT /users/<id> route handler for updating a user in the user Express Router.
router.put('/users/:id', async (req, res) => {
    try {
      const id = req.params.id
      const foundUser = await users.findByPk(id)
      if (foundUser) {
        const { name, age } = req.body
        await users.update({ name, age }, { where: { id } })
        res.status(200).send('User updated successfully!')
      } else {
        res.status(404).send('User not found')
      }
    } catch (error) {
      console.error(error)
      res.status(500).send('Cannot update user')
    }
  })

// DELETE /users/<id> route handler for removing a user in the user Express Router.
router.delete('/users/:id', async (req, res) => {
    try {
      const id = req.params.id
      const foundUser = await users.findByPk(id)
      if (foundUser) {
        await users.destroy({ where: { id } })
        res.status(200).send('User deleted successfully!')
      } else {
        res.status(404).send('User not found')
      }
    } catch (error) {
      console.error(error)
      res.status(500).send('Cannot delete user')
    }
  })





module.exports = router

// List of Users
let users = [
    {
        name: "User 1",
        age: 30
    },
    {
        name: "User 2",
        age: 45
    },
    {
        name: "User 3",
        age: 27
    },
    {
        name: "User 4",
        age: 22
    }
]


