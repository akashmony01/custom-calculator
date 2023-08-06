import React, { useEffect, useReducer, useRef } from "react"
import Head from "next/head"
import { exec } from "child_process"
import { useRouter } from "next/router"

// Components & hooks
import Header from "../components/header"
import Sidebar from "../components/sidebar"
import useAxiosFetch from "../hooks/useAxiosFetch"
import ProtectedRoute from '../components/ProtectedRoute'
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
  const router = useRouter()
  const selectRef = useRef(null)
  const [storeStates, dispatch] = useReducer(reducer, initialReducerState)
  const { response: calculators, loading } = useAxiosFetch({
    url: "http://localhost:8080/api/calculator?filterStatus=published",
  })

  const { calcId } = router.query

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

  const handleSelection = selectedOption => {
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

        if (selectRef?.current) {
          selectRef.current.value = currentCalculator.id
        }
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

  useEffect(() => {
    if (calcId) {
      handleSelection(calcId)
    }
  }, [calcId, loading])

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

      <ProtectedRoute>
        <section className="block">
          <Header />
          <div className="flex items-streatch">
            <Sidebar />
            <div className="ml-auto w-8/12 md:w-9/12 min-h-screen p-5 pt-24 overflow-y-auto">
              <div className="relative block">
                <label
                  htmlFor="calc-select-options"
                  className="block text-lg md:text-xl font-bold mb-3"
                >
                  Selecet a calculator to use:
                </label>

                <select
                  id="calc-select-options"
                  ref={selectRef}
                  onChange={(evt) => handleSelection(evt.target.value)}
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
          </div>
        </section>
      </ProtectedRoute>
    </React.Fragment>
  )
}

export default CalculatorList
