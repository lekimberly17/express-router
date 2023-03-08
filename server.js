const express = require("express")
const app = express()

const usersRouter = require("./routes/Users")
const fruits = require("./routes/Fruits")
const { check, validationResult } = require("express-validator")
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Express Routes
app.use("/users", usersRouter)
app.use("/fruits", fruits)

// Exercise 3

// check that the name field in the body of the post request is not empty
app.post("/users", [check("name").not().isEmpty().trim()], (req, res) => {
  // Check the request object passes the check defined above
  const errors = validationResult(req)
  // If the validationResults returns any errors, then trigger a response
  if (!errors.isEmpty()) {
    res.json({ error: errors.array() })
  } else {
    // If data is valid,
    users.push({ name: req.body.name, age: req.body.age })
    res.json(users)
  }
})

// check that the color field in the body of the post request is not empty
app.post("/fruits", [check("color").not().isEmpty().trim()], (req, res) => {
  // Check the request object passes the check defined above
  const errors = validationResult(req)
  // If the validationResults returns any errors, then trigger a response
  if (!errors.isEmpty()) {
    res.json({ error: errors.array() })
  } else {
    // If data is valid
    fruits.push({ name: req.body.name, color: req.body.color })
    res.json(fruits)
  }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
