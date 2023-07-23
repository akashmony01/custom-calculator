import React, { useReducer } from "react"
import Head from "next/head"
import Link from "next/link"
import { exec } from "child_process"
import useAxiosFetch from "../hooks/useAxiosFetch"
import CalculatorView from "../components/Calculator/CalculatorView"

function reducer(_, action) {
  switch (action.type) {
    case "getCalculator": {
      return {
        isExternalApps: action.isExternalApps,
        currentCalculatorName: action.currentCalculatorName,
        currentCalculator: action.currentCalculator,
      }
    }
  }

  throw Error("Unknown action: " + action.type)
}

const initialReducerState = {
  isExternalApps: true,
  currentCalculatorName: null,
  currentCalculator: undefined,
}

function CalculatorList() {
  const [storeStates, dispatch] = useReducer(reducer, initialReducerState)
  const { response: calculators } = useAxiosFetch({
    url: "/api/calculators?filterStatus=published",
  })

  const openBasicCalculator = () => {
    let cmd, platform

    platform = process.platform || "win32"

    switch (platform) {
      case "win32":
        cmd = "calc"
        break

      case "linux":
        cmd = "gnome-calculator"
        break

      case "darwin":
        cmd = "open -a Calculator"
        break

      default:
        cmd = "calc"
        break
    }

    return exec(cmd)
  }

  const onSelectionChange = evt => {
    let selectedOption = evt.target.value

    if (selectedOption === "open::basicCalculator") {
      dispatch({
        type: "getCalculator",
        isExternalApps: true,
        currentCalculatorName: "Basic Calculator",
        currentCalculator: null,
      })

      return openBasicCalculator()
    }

    if (selectedOption !== "" && calculators?.data) {
      const currentCalculatorIdx = calculators.data.findIndex(
        calc => calc.id === parseInt(selectedOption)
      )

      if (currentCalculatorIdx >= 0) {
        let currentCalculator = calculators.data[currentCalculatorIdx]

        dispatch({
          type: "getCalculator",
          isExternalApps: false,
          currentCalculatorName: currentCalculator.calc_name,
          currentCalculator,
        })
      }
    } else {
      dispatch({
        type: "getCalculator",
        isExternalApps: false,
        currentCalculatorName: null,
        currentCalculator: null,
      })
    }
  }

  let renderCalculatorView

  if (storeStates.currentCalculator && !storeStates.isExternalApps) {
    renderCalculatorView = (
      <CalculatorView currentCalculator={storeStates.currentCalculator} />
    )
  } else if (storeStates.isExternalApps && storeStates.currentCalculatorName) {
    renderCalculatorView = (
      <div className="flex">
        <h4 className="calc-view-heading text-lg md:text-xl font-bold">
          Selected calculator is {storeStates.currentCalculatorName}
        </h4>

        {storeStates.currentCalculatorName === "Basic Calculator" ? (
          <button
            type="button"
            onClick={() => openBasicCalculator()}
            className="px-4 py-1 ml-2 text-sm rounded-md bg-blue-600 text-white"
          >
            Re-open
          </button>
        ) : null}
      </div>
    )
  } else {
    renderCalculatorView = (
      <p className="opacity-80">
        No calculator choosen yet, Choose one to use.
      </p>
    )
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
              <option value="open::basicCalculator">Basic Calculator</option>

              {calculators?.data?.map(calculator => (
                <option key={calculator.id} value={calculator.id}>
                  {calculator.calc_name}
                </option>
              ))}
            </select>
            <hr className="mt-4" />
          </div>

          <div className="mt-4">{renderCalculatorView}</div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default CalculatorList
