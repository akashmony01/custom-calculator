const express = require("express")

// Controllers
const auth = require("../controllers/auth")

const router = express.Router()

/**
 * @method - POST
 * @router - /auth/login
 * @param - username, password
 * @return - Logged in user
 */
router.post("/login", auth.login)

module.exports = router
