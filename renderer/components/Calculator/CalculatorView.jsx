import React, { useEffect, useState } from "react"
import cn from "classnames"
import * as math from "mathjs"
import { useForm, useFieldArray } from "react-hook-form"
import { BsCodeSlash } from 'react-icons/bs'

export default function CalculatorView({ currentCalculator }) {
  const [showExp, setShowExp] = useState(false);
  const [calculationResult, setCalculationResult] = useState(null)

  const toggleVisibility = () => {
    setShowExp(!showExp);
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({})

  useFieldArray({
    control,
    name: "dynamicInputs",
  })

  const onSubmit = data => {
    const variables = data.dynamicInputs.reduce(
      (target, source) => Object.assign(target, source),
      {}
    )

    try {
      let expr = currentCalculator.output.expression.expression

      for (const [key, value] of Object.entries(variables)) {
        expr = expr.replace(new RegExp(`\\b${key}\\w*\\b`, "gi"), value)
      }

      setCalculationResult(math.evaluate(expr))
    } catch (error) {
      setCalculationResult(null)
      console.log(error)
    }
  }

  useEffect(() => {
    return () => {
      reset()
    }
  }, [currentCalculator])

  return (
    <div className="calc-view-wrapper">
      <form className="calc-view-form" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="calc-view-heading text-lg md:text-xl font-bold">
          Selected calculator is <span className="text-blue-600">"{currentCalculator.calc_name}"</span>
        </h4>

        <div className="calc-view-inputs">
          {currentCalculator?.inputs.map((input, idx) => (
            <div className="block mt-4" key={input.id}>
              <label
                htmlFor={`dy_inp_${idx}`}
                className="inline-block cursor-pointer mb-2"
              >
                {input.disp_name}
                {showExp && (
                  <span className="inline-block ml-1.5 text-gray-500">({input.var_name})</span>
                )}
              </label>

              <input
                type="number"
                id={`dy_inp_${idx}`}
                placeholder={`enter: ${input.disp_name}`}
                defaultValue=""
                className={cn(
                  "w-full border border-gray-200 focus:border-gray-400 rounded-md outline-none px-4 py-2 focus:outline-none duration-300",
                  {
                    "border focus:border-red-400 focus:pointer-events-none":
                      errors.dynamicInputs?.[idx]?.[input.var_name] && true,
                  }
                )}
                {...register(`dynamicInputs.${idx}.${input.var_name}`, {
                  valueAsNumber: true,
                  required: true,
                })}
              />
            </div>
          ))}
        </div>

        <div className="calc-view-actions mt-4">
          <button className="w-full px-10 py-2 bg-blue-600 rounded-md text-white">
            Calculate
          </button>
        </div>
      </form>

      <div className="calc-view-output mt-8">
        <div className="relative flex items-center gap-4 justify-between">
          <span className="absolute top-2/4 block w-full h-px bg-gray-200 z-0" />
          <p className="z-10 bg-white pr-4 font-medium text-lg text-gray-500">
            The result
            <span className="mx-1.5 text-blue-600">
              ({currentCalculator?.output?.disp_name || "Output"})
            </span>
            is:
          </p>
          <p className="z-10 bg-white pl-4 font-medium text-lg">
            {calculationResult || "N/A"}
          </p>
        </div>
        <div className="mt-5">
          <button onClick={toggleVisibility} className="flex items-center gap-1.5">
            <BsCodeSlash />
            <span className="text-blue-600 underline">
              Show Expression:
            </span>
          </button>
          {showExp && (
            <article className='mt-5 p-4 bg-gray-100'>
              <p className="mb-3">
                Th expression is used in this calcultor to calculate the ouput is:
              </p>
              <hr />
              <div className="mt-3 italic text-blue-600">
                <pre className="bg-gray-900 p-4 rounded-md shadow-md text-white text-sm font-mono overflow-auto">
                  <code className="block">
                    {currentCalculator.output.expression.expression}
                  </code>
                </pre>
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  )
}
