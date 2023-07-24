const { PrismaClient } = require("@prisma/client")

export default async function handler(req, res) {
  const prisma = new PrismaClient()

  if (req.method === "GET") {
    try {
      const query = req.query
      let calculators

      if (query.filterStatus && query.filterStatus === "published") {
        calculators = await prisma.tbl_Calculator.findMany({
          where: {
            is_published: true,
          },
          include: {
            inputs: true,
            output: {
              include: {
                expression: true,
              },
            },
          },
        })
      } else if (query.filterStatus && query.filterStatus === "draft") {
        calculators = await prisma.tbl_Calculator.findMany({
          where: {
            is_published: false,
          },
          include: {
            inputs: true,
            output: {
              include: {
                expression: true,
              },
            },
          },
        })
      } else {
        calculators = await prisma.tbl_Calculator.findMany()
      }

      return res.status(200).json({
        data: calculators,
        error: false,
      })
    } catch (error) {
      console.log(error)

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
        calc_name,
        calc_desc,
        dynamicInputs,
        calc_output_expression,
        calc_output_disp_name,
        published,
      } = req.body

      const newCalculator = await prisma.tbl_Calculator.create({
        data: {
          calc_name,
          calc_desc,
          is_published: published,
        },
      })

      await prisma.tbl_Input.createMany({
        data: dynamicInputs.map(input => ({
          ...input,
          var_name: input.var_name,
          c_id: newCalculator.id,
        })),
      })

      const newOutput = await prisma.tbl_Output.create({
        data: {
          disp_name: calc_output_disp_name,
          c_id: newCalculator.id,
        },
      })

      await prisma.tbl_Expression.create({
        data: {
          expression: calc_output_expression,
          o_id: newOutput.id,
        },
      })

      return res.status(201).json({
        data: 1,
        error: false,
      })
    } catch (error) {
      console.log(error)

      return res.status(422).send({
        message: "Failed to create new calculator",
        error: true,
      })
    } finally {
      await prisma.$disconnect()
    }
  }

  if (req.method === "DELETE") {
    try {
      const { calc_id } = req.query

      if (parseInt(calc_id)) {
        const calc = await prisma.tbl_Calculator.findFirst({
          where: {
            id: parseInt(calc_id),
          },
        })

        if (!calc) {
          return res.status(404).json({
            data: "Calculator does not exists",
            error: false,
          })
        }


        await prisma.tbl_Calculator.delete({
          where: {
            id: parseInt(calc_id),
          },
        })

        return res.status(201).json({
          data: "Calculator deleted successfully",
          error: false,
        })
      }

      return res.status(400).json({
        data: "Calculator was not valid",
        error: false,
      })
    } catch (error) {
      console.log(error)

      return res.status(422).send({
        message: "Failed to delete the calculator",
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
