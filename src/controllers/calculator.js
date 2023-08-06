const {
  findCalculators,
  findDraftCalculators,
  findPublishedCalculators,
  createNewCalculator,
  createNewCalculatorInputs,
  createNewCalculatorOutputs,
  createNewCalculatorExpression,
  updateCalculator,
  deleteCalculatorInputs,
  updateCalculatorOutputs,
  updateCalculatorExpression,
  findCalculatorById,
  deleteCalculatorById,
} = require("../services/calculator")

async function getCalculators(req, res) {
  let query = req.query,
    calculators

  try {
    if (query.filterStatus && query.filterStatus === "published") {
      calculators = await findPublishedCalculators()
    } else if (query.filterStatus && query.filterStatus === "draft") {
      calculators = await findDraftCalculators()
    } else {
      calculators = await findCalculators()
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
  }
}

async function getCalculatorById(req, res) {
  const { id: calculatorId } = req.params

  try {
    if (!parseInt(calculatorId, 10)) {
      throw new Error("Calculator id must be a number")
    }

    const calculator = await findCalculatorById(parseInt(calculatorId, 10))

    return res.status(200).json({
      data: calculator,
      error: false,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: "Error: Internal Server - 500",
      error: true,
    })
  }
}

async function createCalculator(req, res) {
  const {
    calc_name,
    calc_desc,
    dynamicInputs,
    calc_output_expression,
    calc_output_disp_name,
    published,
  } = req.body

  try {
    const newCalculator = await createNewCalculator({
      calc_name,
      calc_desc,
      published,
    })

    await createNewCalculatorInputs({
      dynamicInputs,
      calculatorId: newCalculator.id,
    })

    const newOutput = await createNewCalculatorOutputs({
      disp_name: calc_output_disp_name,
      calculatorId: newCalculator.id,
    })

    await createNewCalculatorExpression({
      expression: calc_output_expression,
      outputId: newOutput.id,
    })

    return res.status(201).json({
      data: newCalculator.id,
      error: false,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: "Failed to create new calculator",
      error: true,
    })
  }
}

async function updateCalculatorById(req, res) {
  const {
    calc_name,
    calc_desc,
    dynamicInputs,
    calc_output_expression,
    calc_output_disp_name,
    published,
  } = req.body

  const { id: calculatorId } = req.params

  try {
    if (!parseInt(calculatorId, 10)) {
      throw new Error("Calculator id must be a number")
    }

    const newCalculator = await updateCalculator({
      calculatorId: parseInt(calculatorId, 10),
      calc_name,
      calc_desc,
      published,
    })

    await deleteCalculatorInputs(newCalculator.id)

    await createNewCalculatorInputs({
      dynamicInputs,
      calculatorId: newCalculator.id,
    })

    const newOutput = await updateCalculatorOutputs({
      disp_name: calc_output_disp_name,
      calculatorId: newCalculator.id,
    })

    await updateCalculatorExpression({
      expression: calc_output_expression,
      outputId: newOutput.id,
    })

    return res.status(201).json({
      data: newCalculator.id,
      error: false,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: "Failed to update the calculator",
      error: true,
    })
  }
}

async function deleteCalculator(req, res) {
  const { id: calculatorId } = req.params

  try {
    if (!parseInt(calculatorId, 10)) {
      throw new Error("Calculator id must be a number")
    }

    const calculator = await findCalculatorById(parseInt(calculatorId, 10))

    if (!calculator) {
      return res.status(404).json({
        data: "Calculator does not exists",
        error: false,
      })
    }

    const deletedCalculator = await deleteCalculatorById(calculator.id)

    return res.status(202).json({
      data: deletedCalculator.id,
      error: false,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: "Failed to delete the calculator",
      error: true,
    })
  }
}

module.exports = {
  getCalculators,
  getCalculatorById,
  createCalculator,
  updateCalculatorById,
  deleteCalculator,
}
