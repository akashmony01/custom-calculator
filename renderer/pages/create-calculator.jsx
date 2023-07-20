import React, { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { getSession } from "next-auth/react"
import CalculatorInput from "../components/Calculator/CalculatorInput";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        parmanent: false,
        destination: "/signin",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

function CreateCalculator() {
  const [calcInputs, setCalcInputs] = useState([
    {
      value: "",
      varValue: ""
    },
  ])
  const [formInputs, setFormInputs] = useState({
    calc_name: "",
    calc_desc: "",
    o_disp_name: "",
    expression: "",
  })

  const handleDynamicInputChange = (inputIndex, evt, isVar = false) => {
    let newInput = [...calcInputs]

    if (isVar) {
      newInput[inputIndex].varValue = evt.target.value
    } else {
      newInput[inputIndex].value = evt.target.value
    }

    setCalcInputs(newInput)
  }

  let removeDynamicInput = (inputIndex) => {
    let newInput = [...calcInputs]
    newInput.splice(inputIndex, 1)
    setCalcInputs(newInput)
  }

  let handleInputChange = (e) => {
    let newFormInput = formInputs
    newFormInput[e.target.name] = e.target.value
    setFormInputs(newFormInput)
  }

  let addFormFields = () => {
    setCalcInputs([...calcInputs, {
      value: "",
      varValue: ""
    }])
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()

    const dynamicInputs = calcInputs.filter(input => input.value !== "" && input.varValue !== "");

    console.log(dynamicInputs, formInputs);
    fetch("/api/calculators/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: dynamicInputs,
        ...formInputs
      }),
    })
  }

  return (
    <React.Fragment>
      <Head>
        <title>Create Calculator</title>
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

          <hr className="my-2" />

          <form onSubmit={handleSubmit} className="block">
            <div className="block mt-4">
              <CalculatorInput
                name="calc_name"
                inputLabel="Calculator Name"
                placeholder="Calculator Name"
                className="mt-4"
                value=""
                onChangeHandler={handleInputChange}
              />

              <CalculatorInput
                name="calc_desc"
                inputLabel="Calculator Description"
                placeholder="Calculator Description"
                className="mt-4"
                value=""
                onChangeHandler={handleInputChange}
                isTextArea
              />
            </div>

            <h3 className="mt-4 font-bold">Calculator Inputs</h3>

            {calcInputs.map((input, idx) => (
              <div key={idx} className="block mt-4 bg-gray-200 rounded-md space-y-4 px-5 py-4">
                <CalculatorInput
                  name={`input_${idx + 1}`}
                  inputLabel="Input Name"
                  placeholder="Input Name"
                  value={input.value}
                  onChangeHandler={(e) => handleDynamicInputChange(idx, e)}
                />

                <CalculatorInput
                  name={`variable_${idx + 1}`}
                  inputLabel="Variable Name"
                  placeholder="Variable Name"
                  value={input.varValue}
                  onChangeHandler={(e) => handleDynamicInputChange(idx, e, true)}
                />

                <button onClick={() => removeDynamicInput(idx)} className="px-10 py-2 bg-red-600 rounded-md text-white">
                  Delete Input
                </button>
              </div>
            ))}

            <div className="mt-4">
              <button onClick={addFormFields} type="button" className="ml-auto block px-10 py-2 bg-blue-600 rounded-md text-white">
                Add Inputs
              </button>
            </div>

            <h3 className="mt-4 font-bold">Calculator Outputs</h3>

            <div className="block mt-4 bg-gray-200 rounded-md space-y-4 px-5 py-4">
              <CalculatorInput
                name="o_disp_name"
                inputLabel="Output Name"
                placeholder="Output Name"
                value=""
                onChangeHandler={handleInputChange}
              />

              <CalculatorInput
                name="expression"
                inputLabel="Output Expression"
                placeholder="Output Expression"
                className="mt-4"
                value=""
                onChangeHandler={handleInputChange}
                isTextArea
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <button className="px-10 py-2 bg-blue-600 rounded-md text-white">
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

export default CreateCalculator
