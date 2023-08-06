const { getUserByUsername } = require("../services/auth")

async function login(req, res) {
  const { username, password } = req.body

  if (!username || !password) {
    return res.json({
      message: "Invalid username or password provided",
      error: true,
    })
  }

  try {
    const user = await getUserByUsername(username)

    if (!user || password !== user.password) {
      return res.json({
        message: "Invalid username or password provided",
        error: true,
      })
    }

    return res.status(200).json({
      data: user,
      error: false,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: "Failed to login",
      error: true,
    })
  }
}

module.exports = { login }
