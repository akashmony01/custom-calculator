const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const userData = [
  {
    username: "admin",
    password: "12345", // 12345
  },
]

async function main() {
  for (let user of userData) {
    const data = await prisma.tbl_Admin.upsert({
      where: { id: 1, username: user.username },
      update: {},
      create: user,
    })

    console.log(`DB Entry - ${data.username}:${data.password}`)
  }
}

main()
  .catch(async e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
