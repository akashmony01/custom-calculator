const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        const calculators = await prisma.tbl_Calculator.findMany()
        res.send(JSON.stringify(calculators))
        break

      default:
        res.status(403).send("")
        break
    }

    await prisma.$disconnect()
  } catch (error) {
    console.log(error)
    return res.status(500).send("Internal Server Error!")
  }
}
