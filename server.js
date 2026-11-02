const express = require('express')
const app = express()

app.use(express.json())
app.use(logger)

// Custom log-catcher middleware
function logger(req, res, next) {
    console.log(new Date().toISOString(), 
                req.method,
                req.originalUrl)
    next()
}

const resourseRouter = require("./routes/resources")

app.use("/api/resources", resourseRouter)

app.listen(3000)