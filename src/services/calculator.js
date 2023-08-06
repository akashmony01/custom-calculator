const { db } = require("../utils/db")

function findCalculators() {
  return db.tbl_Calculator.findMany()
}

function findPublishedCalculators() {
  return db.tbl_Calculator.findMany({
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
}

function findCalculatorById(calculatorId) {
  return db.tbl_Calculator.findFirst({
    where: {
      id: calculatorId,
    },
  })
}

function findDraftCalculators() {
  return db.tbl_Calculator.findMany({
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
}

function createNewCalculator({ calc_name, calc_desc, published }) {
  return db.tbl_Calculator.create({
    data: {
      calc_name,
      calc_desc,
      is_published: published,
    },
  })
}

function createNewCalculatorInputs({ dynamicInputs, calculatorId }) {
  return db.tbl_Input.createMany({
    data: dynamicInputs.map(input => ({
      ...input,
      var_name: input.var_name,
      c_id: calculatorId,
    })),
  })
}

function createNewCalculatorOutputs({ disp_name, calculatorId }) {
  return db.tbl_Output.create({
    data: {
      disp_name,
      c_id: calculatorId,
    },
  })
}

function createNewCalculatorExpression({ expression, outputId }) {
  return db.tbl_Expression.create({
    data: {
      expression,
      o_id: outputId,
    },
  })
}

function updateCalculator({ calculatorId, calc_name, calc_desc, published }) {
  return db.tbl_Calculator.update({
    where: {
      id: calculatorId,
    },
    data: {
      calc_name,
      calc_desc,
      is_published: published,
    },
  })
}

function deleteCalculatorInputs(calculatorId) {
  return db.tbl_Input.deleteMany({
    where: {
      c_id: calculatorId,
    },
  })
}

function updateCalculatorOutputs({ disp_name, calculatorId }) {
  return db.tbl_Output.update({
    where: {
      c_id: calculatorId,
    },
    data: {
      disp_name,
    },
  })
}

function updateCalculatorExpression({ expression, outputId }) {
  return db.tbl_Expression.update({
    where: {
      o_id: outputId,
    },
    data: {
      expression,
    },
  })
}

function deleteCalculatorById(calculatorId) {
  return db.tbl_Calculator.delete({
    where: {
      id: calculatorId,
    },
  })
}

module.exports = {
  findCalculators,
  findCalculatorById,
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
  deleteCalculatorById,
}
