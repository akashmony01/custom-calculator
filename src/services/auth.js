const { db } = require("../utils/db")

function getUserByUsername(username) {
  return db.tbl_Admin.findFirst({
    where: {
      username,
    },
  })
}

module.exports = { getUserByUsername }
