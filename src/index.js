const http = require("http")
const express = require("express")
const compression = require("compression")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()

// Routers
const calculator = require("./routes/calculator")
const auth = require("./routes/auth")

const app = express()

// Middleware for logging
app.use(morgan("dev"))

// Cross Origin Resources Sharing
app.use(
  cors({
    origin: "*",
  })
)

// Built in middlerware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Midleware for compress response
app.use(compression())

// Api routes
app.use("/api/calculator", calculator)
app.use("/api/auth", auth)

// Http server
const server = http.createServer(app)
const port = process.env.PORT || 8080

server
  .listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`)
  })
  .on("error", error => {
    if (error.syscall !== "listen") {
      console.error(error.message)
    }

    const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`

    switch (error.code) {
      case "EACCES":
        console.error(`${bind} requires elevated privileges`)
      case "EADDRINUSE":
        console.error(`${bind} is already in use`)
      default:
        console.error(error)
    }
  })
