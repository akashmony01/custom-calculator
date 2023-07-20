const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST":
        const { inputs, calc_name, calc_desc, expression, o_disp_name } =
          JSON.parse(JSON.stringify(req.body))

        const newCalculator = await prisma.tbl_Calculator.create({
          data: {
            calc_name,
            calc_desc,
            is_published: true, // this will be updated soon
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

        res.status(201).send("Calculator created successfully")
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
