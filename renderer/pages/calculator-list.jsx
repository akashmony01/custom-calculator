import React, { useReducer } from "react"
import Head from "next/head"
import Link from "next/link"
import useAxiosFetch from "../hooks/useAxiosFetch"
import CalculatorView from "../components/Calculator/CalculatorView"

function reducer(_, action) {
  switch (action.type) {
    case "getCalculator": {
      return {
        currentCalculator: action.currentCalculator,
      }
    }
  }

  throw Error("Unknown action: " + action.type)
}

const initialReducerState = { currentCalculatorId: undefined }

function CalculatorList() {
  const [storeStates, dispatch] = useReducer(reducer, initialReducerState)
  const { response: calculators } = useAxiosFetch({
    url: "/api/calculators?filterStatus=published",
  })

  const onSelectionChange = evt => {
    let selectedOption = evt.target.value

    if (selectedOption !== "" && calculators?.data) {
      const currentCalculatorIdx = calculators.data.findIndex(
        calc => calc.id === parseInt(selectedOption)
      )

      if (currentCalculatorIdx >= 0) {
        let currentCalculator = calculators.data[currentCalculatorIdx]

        dispatch({
          type: "getCalculator",
          currentCalculator,
        })
      }
    } else {
      dispatch({
        type: "getCalculator",
        currentCalculator: undefined,
      })
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>Customizable Calculator</title>
      </Head>

      <section className="min-h-screen flex justify-center items-center">
        <div className="container max-w-screen-md">
          <div className="relative block">
            <div className="flex justify-between">
              <label
                htmlFor="calc-select-options"
                className="block text-lg md:text-xl font-bold mb-3"
              >
                Selecet a calculator to use:
              </label>

              <Link href="/">
                <a className="text-blue-600 underline">Back to home</a>
              </Link>
            </div>

            <select
              id="calc-select-options"
              onChange={onSelectionChange}
              className="w-full border cursor-pointer rounded-md bg-transparent py-3 px-4"
            >
              <option value="">-- Select a calculator --</option>
              <option value="">Basic Calculator</option>

              {calculators?.data?.map(calculator => (
                <option key={calculator.id} value={calculator.id}>
                  {calculator.calc_name}
                </option>
              ))}
            </select>
            <hr className="mt-4" />
          </div>

          <div className="mt-4">
            {storeStates.currentCalculator ? (
              <CalculatorView
                currentCalculator={storeStates.currentCalculator}
              />
            ) : (
              <p className="opacity-80">
                No calculator choosen yet, Choose one to use.
              </p>
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default CalculatorList
