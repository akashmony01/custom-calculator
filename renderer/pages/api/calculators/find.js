const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        const calculators = await prisma.calculators.findMany()
        res.send(JSON.stringify(calculators))
        break

      case "POST":
        // Create Logic
        break

      case "PUT":
        // Update Logic
        break

      default:
        res.status(403).send("")
        break
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send("Internal Server Error!")
  }
}
