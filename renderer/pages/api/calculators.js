const { PrismaClient } = require("@prisma/client")

export default async function handler(req, res) {
  const prisma = new PrismaClient()

  if (req.method === "GET") {
    try {
      const calculators = await prisma.tbl_Calculator.findMany()

      return res.status(200).json({
        data: calculators,
        error: false,
      })
    } catch (error) {
      return res.status(500).send({
        message: "Error: Internal Server - 500",
        error: true,
      })
    } finally {
      await prisma.$disconnect()
    }
  }

  if (req.method === "POST") {
    try {
      const {
        inputs,
        calc_name,
        calc_desc,
        expression,
        isPublished,
        o_disp_name,
      } = req.body

      const newCalculator = await prisma.tbl_Calculator.create({
        data: {
          calc_name,
          calc_desc,
          is_published: isPublished,
        },
      })

      await prisma.tbl_Input.createMany({
        data: inputs.map(input => ({
          disp_name: input.value,
          var_name: input.varValue,
          c_id: newCalculator.id,
        })),
      })

      await prisma.tbl_Expression.create({
        data: {
          expression,
          c_id: newCalculator.id,
        },
      })

      await prisma.tbl_Output.create({
        data: {
          disp_name: o_disp_name,
          c_id: newCalculator.id,
        },
      })

      return res.status(201).json({
        data: "Calculator created successfully",
        error: false,
      })
    } catch (error) {
      return res.status(422).send({
        message: "Failed to create new calculator",
        error: true,
      })
    } finally {
      await prisma.$disconnect()
    }
  }

  return res.status(400).send({
    message: "Request method not supported",
    error: true,
  })
}
