// Import required modules
const express = require("express")
const burger = require("../models/burger")

// Set up Express router
const router = express.Router()

// Route Definitions

// GET route for index HTML page
router.get("/", (req, res) => {
    burger.getAll(data => {
        var burgerListObj = {
             burgers: data
        }
        console.log(burgerListObj)
        res.render("index", burgerListObj)
    })
})

// POST API route for creating a new burger
router.post("/api/burgers", (req, res) => {
    let data = req.body
    
    burger.create(data.name, data.devoured, result => {
        console.log(result)
        // Return ID of new entry
        res.json({ id: result.insertId })
    })

    
})

// PUT API route for setting the status of a burger to 'devoured'
router.put("/api/burgers/devour/:id", (req, res) => {
    let id = req.params.id
    burger.devour(id, result => {
        console.log(result)
        // If table had affected rows, id was found, so return 200 "OK" status
        // Does not matter if status was changed, only that id was valid
        if (result.affectedRows) res.status(200).end()
        // Else table did not contain id, so return 400 "Bad Request" status
        else res.status(400).end()
    })
})

// Export router
module.exports = router
