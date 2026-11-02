const express = require("express")
const router = express.Router()

// In-memory data 
let resources = [
    { id: 1, name: "Resourse1" },
    { id: 2, name: "Resourse2" },
    { id: 3, name: "Resourse3" }
]

let nextId = 4;

// GET: Return all resources
router.get("/", (req, res) => {
    res.json(resources)
})

// POST: Create a new resource
router.post("/", (req, res) => {

    const isValid = req.body.name && req.body.name.trim() !== ""

    if (isValid) {
        const newResource = {
            ...req.body,
            id: nextId++,
        }

        resources.push(newResource)

        res.status(201).json(newResource)

    } else {
        res.status(400).json({
            message: "Invalid resource data"
        })
    }
})


// Find resource by ID
router.param("id", (req, res, next, id) => {
    const resource = resources.find(item => item.id === Number(id))

    if (!resource) {
        return res.status(404).json({
            message: "Resource not found"
        })
    }

    req.resource = resource
    next()
})


router.route("/:id")

    // GET: Return one resource
    .get((req, res) => {
        res.json(req.resource)
    })

    // PUT: Update resource
    .put((req, res) => {
        const isValid = req.body.name && req.body.name.trim() !== ""

    if (isValid) {
        
        const { id, ...updatedData } = req.body
        Object.assign(req.resource, updatedData)

        res.json(req.resource)

    } else {
        res.status(400).json({
            message: "Invalid resource data"
        })
    }

    })

    // DELETE: Remove resource
    .delete((req, res) => {
         const index = resources.indexOf(req.resource)

       resources.splice(index, 1)

        res.json({
            message: "Resource deleted successfully"
        })

    })


module.exports = router
