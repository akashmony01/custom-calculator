const express = require("express")

// Controllers
const calculator = require("../controllers/calculator")

const router = express.Router()

/**
 * @method - GET
 * @router - /calculator
 * @param - filterStatus?
 * @return - Get all calculators
 */
router.get("/", calculator.getCalculators)

/**
 * @method - GET
 * @router - /calculator
 * @param - filterStatus?
 * @return - Get all calculators
 */
router.get("/get/:id", calculator.getCalculatorById)

/**
 * @method - POST
 * @router - /calculator
 * @param - calc_name, calc_desc, dynamicInputs, calc_output_expression, calc_output_disp_name, published
 * @return - Create a new calculator
 */
router.post("/", calculator.createCalculator)

/**
 * @method - PUT
 * @router - /calculator/:id
 * @param - calc_name, calc_desc, dynamicInputs, calc_output_expression, calc_output_disp_name, published
 * @return - Get all calculators
 */
router.put("/:id", calculator.updateCalculatorById)

/**
 * @method - GET
 * @router - /calculator/:id
 * @return - Delete a calculator
 */
router.delete("/:id", calculator.deleteCalculatorById)

module.exports = router
