const { PrismaClient } = require("@prisma/client")
const admins = require("./admins")

const prisma = new PrismaClient()

async function main() {
  for (let admin of admins) {
    const data = await prisma.admins.upsert({
      where: { username: admin.username },
      update: {},
      create: admin,
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
