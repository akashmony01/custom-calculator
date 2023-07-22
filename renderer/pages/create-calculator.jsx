import React from "react"
import Head from "next/head"
import Link from "next/link"
import * as yup from "yup"
import axios from "axios"
import { toast } from "react-toastify"
import { getSession } from "next-auth/react"
import { useForm, useFieldArray } from "react-hook-form"
import { useRouter } from "next/router"

const createCalculatorSchema = yup.object().shape({
  calc_name: yup.string().required(),
  calc_desc: yup.string().required(),
  dynamicInputs: yup
    .array(
      yup.object({
        disp_name: yup.string().required(),
        var_name: yup.string().required(),
      })
    )
    .required(),
  calc_output_expression: yup.string().required(),
  calc_output_disp_name: yup.string().required(),
})

function CreateCalculator() {
  const router = useRouter()
  const { register, control, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      calc_name: "",
      calc_desc: "",
      dynamicInputs: [{ disp_name: "", var_name: "" }],
      calc_output_expression: "",
      calc_output_disp_name: "",
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dynamicInputs",
  })

  const createCalculator = async data => {
    const toastId = toast("Creating calculator...", {
      type: "info",
      autoClose: false,
      closeButton: false,
    })

    const isDataValid = await createCalculatorSchema.isValid(data)

    // TODO: Task A. 5 - Check for duplicate var_name from dynamic inputs

    if (!isDataValid) {
      return toast.update(toastId, {
        render: "Some required information is missing, try to save as draft",
        type: "error",
        autoClose: 2000,
      })
    }

    const formData = {
      ...data,
      published: true,
    }

    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    try {
      await axios.post("/api/calculators", formData, requestOptions)

      toast.update(toastId, {
        render: "Calculator created successfully",
        type: "success",
        autoClose: 1000,
        onClose: () => {
          router.push("/dashboard")
        },
      })
    } catch (error) {
      toast.update(toastId, {
        render: "Failed to create new calculator",
        type: "error",
        autoClose: 1500,
        onClose: () => {
          router.push("/dashboard")
        },
      })
    } finally {
      reset()
    }
  }

  const createDraftCalculator = async evt => {
    evt.preventDefault()

    const toastId = toast("Creating calculator...", {
      type: "info",
      autoClose: false,
      closeButton: false,
    })

    // TODO: Task A. 5 - Check for duplicate var_name from dynamic inputs

    const data = getValues()
    const formData = {
      ...data,
      published: false,
    }

    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    try {
      await axios.post("/api/calculators", formData, requestOptions)

      toast.update(toastId, {
        render: "Calculator created as Draft",
        type: "success",
        autoClose: 1000,
        onClose: () => {
          router.push("/dashboard")
        },
      })
    } catch (error) {
      toast.update(toastId, {
        render: "Failed to create new calculator",
        type: "error",
        autoClose: 1500,
        onClose: () => {
          router.push("/dashboard")
        },
      })
    } finally {
      reset()
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>Create Calculator | Admin</title>
      </Head>

      <section className="min-h-screen flex justify-center items-center py-10">
        <div className="container max-w-screen-md">
          <div className="flex justify-between gap-4">
            <h1 htmlFor="calc" className="block text-xl md:text-2xl font-bold">
              Create Calculator
            </h1>

            <Link href="/dashboard">
              <a className="text-blue-600 underline">Back to dashboard</a>
            </Link>
          </div>

          <hr className="my-4" />

          <form className="block" onSubmit={handleSubmit(createCalculator)}>
            <div className="create-calc-meta block mt-4">
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
                      className={`px-10 py-2 mt-4 bg-red-600 rounded-md text-white ${
                        fields.length <= 1
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

            <div className="create-calc-outputs block mt-4 bg-gray-200 rounded-md space-y-4 px-5 py-4">
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

            <div className="create-calc-actions mt-4 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={createDraftCalculator}
                className="px-10 py-2 bg-blue-600 rounded-md text-white"
              >
                Save Draft
              </button>

              <button className="px-10 py-2 bg-green-600 rounded-md text-white">
                Publish Calculator
              </button>
            </div>
          </form>
        </div>
      </section>
    </React.Fragment>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        parmanent: false,
        destination: "/signin",
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}

export default CreateCalculator
