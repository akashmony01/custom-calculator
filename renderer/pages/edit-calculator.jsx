import React, { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import axios from "axios"
import * as math from "mathjs"
import * as yup from "yup"
import { toast } from "react-toastify"
import { useForm, useFieldArray } from "react-hook-form"

// Components
import Header from "../components/header"
import Sidebar from "../components/sidebar"
import ProtectedRoute from '../components/ProtectedRoute'

const updateCalculatorSchema = yup.object().shape({
  calc_name: yup.string().required(),
  calc_desc: yup.string(),
  dynamicInputs: yup
    .array()
    .of(
      yup
        .object({
          disp_name: yup.string().required(),
          var_name: yup.string().required(),
        })
        .test("validateWithPrefix", "input::prefixError", function (input) {
          if (input?.var_name && !input.var_name.startsWith("inp_"))
            return false
          return true
        })
    )
    .test(
      "validateDynamicDuplicates",
      "input::dynamicDuplicateError",
      function (inputs) {
        if (!inputs) return true

        const uniqueInputs = new Set(inputs)

        for (const input of uniqueInputs) {
          if (uniqueInputs.has(input.var_name)) {
            return false
          }

          if (input?.var_name) {
            uniqueInputs.add(input.var_name)
          }
        }

        return true
      }
    ),
  calc_output_expression: yup.string().required(),
  calc_output_disp_name: yup.string().required(),
})

const getCalculator = async (calculatorId) => {
  if (!calculatorId) {
    return null
  }

  try {
    const { data } = await axios.get(
      `http://localhost:8080/api/calculator/get/${calculatorId}`
    )

    if (!data?.data) {
      return null;
    }

    const { inputs, output, calc_name, calc_desc } = data.data

    return {
      calc_name,
      calc_desc,
      dynamicInputs: inputs.map(input => ({
        var_name: input.var_name,
        disp_name: input.disp_name,
      })) || [],
      calc_output_expression: output?.expression?.expression || "",
      calc_output_disp_name: output?.disp_name || ""
    }
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  }
};

function UpdateCalculator() {
  const router = useRouter()
  const [calculatorCreating, setCalculatorCreating] = useState(false)
  const { register, control, handleSubmit, reset, getValues, setValue } = useForm({
    defaultValues: getCalculator(),
  })

  const calculatorId = router.query?.id

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dynamicInputs",
  })

  const updateCalculator = async data => {
    const toastId = toast("Creating calculator...", {
      type: "info",
      autoClose: false,
      closeButton: false,
    })

    setCalculatorCreating(true)

    try {
      const validData = await updateCalculatorSchema.validate({ ...data })

      const formData = {
        ...validData,
        published: true,
      }

      try {
        const requestOptions = {
          headers: {
            "Content-Type": "application/json",
          },
        }

        let expr = formData.calc_output_expression

        try {
          const inputPrefix = "inp_"
          const regexPattern = new RegExp(`\\b${inputPrefix}\\w*\\b`, "gi")

          const matchedWords = expr.match(regexPattern) || []

          matchedWords.forEach(varName => {
            const randomNumber = Math.floor(Math.random() * (9 - 1 + 1)) + 1

            const varIdx = formData.dynamicInputs.findIndex(
              i => i.var_name === varName
            )

            if (varIdx !== -1) {
              expr = expr.replace(varName, randomNumber)
            } else {
              throw new ReferenceError(`${varName} is not defined`)
            }
          })

          math.evaluate(expr)
        } catch (error) {
          console.log(error)

          return toast.update(toastId, {
            render: "Output expression have non-exists variable.",
            type: "error",
            autoClose: 3000,
          })
        }

        await axios.put("http://localhost:8080/api/calculator/" + calculatorId, formData, requestOptions)

        toast.update(toastId, {
          render: "Calculator updated successfully",
          type: "success",
          autoClose: 1000,
          onClose: () => {
            router.push("/dashboard")
            reset()
          },
        })
      } catch (error) {
        console.log(error)

        toast.update(toastId, {
          render: "Failed to update the calculator",
          type: "error",
          autoClose: 1500,
          onClose: () => {
            router.push("/dashboard")
            reset()
          },
        })
      }
    } catch (error) {
      console.log(error)
      setCalculatorCreating(false)

      if (error.errors?.[0] === "input::prefixError") {
        return toast.update(toastId, {
          render: "Variable name must start with the inp_",
          type: "error",
          autoClose: 3000,
        })
      }

      if (error.errors?.[0] === "input::dynamicDuplicateError") {
        return toast.update(toastId, {
          render: "Inputs must be unique. Duplicate inputs found.",
          type: "error",
          autoClose: 3000,
        })
      }

      toast.update(toastId, {
        render: "Some required information is missing, you can save as draft",
        type: "error",
        autoClose: 2000,
      })
    }
  }

  const updateDraftCalculator = async evt => {
    evt.preventDefault()

    setCalculatorCreating(true)

    const toastId = toast("Updating calculator...", {
      type: "info",
      autoClose: false,
      closeButton: false,
    })

    const data = getValues()
    const formData = {
      ...data,
      published: false,
    }

    if (data.calc_name === "") {
      return toast.update(toastId, {
        render: "Draft calculator requires calculator name to save",
        type: "error",
        autoClose: 3000,
      })
    }

    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    try {
      await axios.put("http://localhost:8080/api/calculator/" + calculatorId, formData, requestOptions)

      toast.update(toastId, {
        render: "Calculator saved as Draft",
        type: "success",
        autoClose: 1000,
        onClose: () => {
          router.push("/dashboard")
          reset()
        },
      })
    } catch (error) {
      console.log(error)
      setCalculatorCreating(false)
      toast.update(toastId, {
        render: "Failed to save the calculator",
        type: "error",
        autoClose: 1500,
        onClose: () => {
          router.push("/dashboard")
          reset()
        },
      })
    }
  }

  useEffect(() => {
    if (!calculatorId) {
      router.replace("/dashboard")
    }

    const fetchAndSetDefaultFormValues = async () => {
      const data = await getCalculator(calculatorId);

      if (data) {
        Object.keys(data).forEach((key) => {
          console.log(key);
          setValue(key, data[key]);
        });
      }
    };

    fetchAndSetDefaultFormValues();
  }, [setValue, calculatorId]);

  return (
    <React.Fragment>
      <Head>
        <title>Update Calculator | Admin</title>
      </Head>

      <ProtectedRoute>
        <section className="block">
          <Header />
          <div className="flex items-streatch">
            <Sidebar />
            <div className="ml-auto w-8/12 md:w-9/12 min-h-screen p-5 pt-24 overflow-y-auto">
              <h1 htmlFor="calc" className="block text-xl md:text-2xl font-bold">
                Update Calculator
              </h1>

              <hr className="my-4" />

              <form className="block" onSubmit={handleSubmit(updateCalculator)}>
                <div className="update-calc-meta block mt-4">
                  <div className="calc-disp-name-wrapper">
                    <label
                      htmlFor="calc_name"
                      className="inline-block cursor-pointer mb-2"
                    >
                      Calculator Name
                    </label>

                    <input
                      type="text"
                      id="calc_name"
                      className="w-full border border-gray-200 focus:border-gray-400 rounded-md outline-none px-4 py-2 focus:outline-none duration-300"
                      placeholder="Set a display name for the calculator"
                      {...register("calc_name", {
                        required: false,
                      })}
                    />
                  </div>

                  <div className="calc-desc-wrapper mt-4">
                    <label
                      htmlFor="calc_desc"
                      className="inline-block cursor-pointer mb-2"
                    >
                      Calculator Description
                    </label>

                    <input
                      type="text"
                      id="calc_desc"
                      className="w-full border border-gray-200 focus:border-gray-400 rounded-md outline-none px-4 py-2 focus:outline-none duration-300"
                      placeholder="Set a description for the calculator"
                      {...register("calc_desc", {
                        required: false,
                      })}
                    />
                  </div>
                </div>

                <h3 className="mt-4 font-bold">Calculator Inputs</h3>

                <div className="calc-dynamic-inputs">
                  {fields.map((item, index) => {
                    return (
                      <div
                        key={item.id}
                        className="block mt-4 bg-gray-200 rounded-md space-y-4 px-5 py-4"
                      >
                        <div className="calc-dynamic-input">
                          <label
                            htmlFor={`dy_inp_disp_name_${index}`}
                            className="inline-block cursor-pointer mb-2"
                          >
                            Input Name
                          </label>

                          <input
                            type="text"
                            id={`dy_inp_disp_name_${index}`}
                            className="w-full border border-gray-200 focus:border-gray-400 rounded-md outline-none px-4 py-2 focus:outline-none duration-300"
                            placeholder="Set a display name for the input"
                            {...register(`dynamicInputs.${index}.disp_name`, {
                              required: false,
                            })}
                          />
                        </div>

                        <div className="calc-dynamic-var mt-4">
                          <label
                            htmlFor={`dy_inp_var_name_${index}`}
                            className="inline-block cursor-pointer mb-2"
                          >
                            Variable Name
                          </label>

                          <input
                            type="text"
                            id={`dy_inp_var_name_${index}`}
                            className="w-full border border-gray-200 focus:border-gray-400 rounded-md outline-none px-4 py-2 focus:outline-none duration-300"
                            placeholder="Set a input name without special characters"
                            {...register(`dynamicInputs.${index}.var_name`, {
                              required: false,
                            })}
                          />
                        </div>

                        <button
                          type="button"
                          disabled={fields.length <= 1}
                          className={`px-10 py-2 mt-4 bg-red-600 rounded-md text-white ${fields.length <= 1
                            ? "disabled:bg-gray-400 disabled:pointer-events-none"
                            : ""
                            }`}
                          onClick={() => {
                            if (fields.length > 1) {
                              remove(index)
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="ml-auto block px-10 py-2 bg-blue-600 rounded-md text-white"
                    onClick={() => append()}
                  >
                    Add Inputs
                  </button>
                </div>

                <h3 className="mt-4 font-bold">Calculator Outputs</h3>

                <div className="update-calc-outputs block mt-4 bg-gray-200 rounded-md space-y-4 px-5 py-4">
                  <div className="calc-output-disp-name-wrapper">
                    <label
                      htmlFor="calc_output_disp_name"
                      className="inline-block cursor-pointer mb-2"
                    >
                      Output Name
                    </label>

                    <input
                      type="text"
                      id="calc_output_disp_name"
                      className="w-full border border-gray-200 focus:border-gray-400 rounded-md outline-none px-4 py-2 focus:outline-none duration-300"
                      placeholder="Set a display name for the output"
                      {...register("calc_output_disp_name", {
                        required: false,
                      })}
                    />
                  </div>

                  <div className="calc-output-expression-wrapper">
                    <label
                      htmlFor="calc_output_expression"
                      className="inline-block cursor-pointer mb-2"
                    >
                      Output Expression
                    </label>

                    <input
                      type="text"
                      id="calc_output_expression"
                      className="w-full border border-gray-200 focus:border-gray-400 rounded-md outline-none px-4 py-2 focus:outline-none duration-300"
                      placeholder="Set a expression to be executed"
                      {...register("calc_output_expression", {
                        required: false,
                      })}
                    />
                  </div>
                </div>

                <div className="update-calc-actions mt-4 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={updateDraftCalculator}
                    className={`px-10 py-2 bg-blue-600 rounded-md text-white ${calculatorCreating ? "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed" : ""}`}
                    disabled={calculatorCreating}
                  >
                    Save Draft
                  </button>

                  <button className={`px-10 py-2 bg-green-600 rounded-md text-white ${calculatorCreating ? "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed" : ""}`}
                    disabled={calculatorCreating}>
                    Update Calculator
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </ProtectedRoute>
    </React.Fragment>
  )
}

export default UpdateCalculator
