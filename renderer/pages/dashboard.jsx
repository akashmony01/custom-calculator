import React, { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import axios from "axios"
import Swal from 'sweetalert2'
import { toast } from "react-toastify"
import { withRouter } from "next/router"

// Components & hooks
import Header from "../components/header"
import Sidebar from "../components/sidebar"
import useAxiosFetch from "../hooks/useAxiosFetch"
import ProtectedRoute from '../components/ProtectedRoute'

function Dashboard() {
  const { response: calculators, refetchData } = useAxiosFetch({
    url: "http://localhost:8080/api/calculator",
  })

  const activeCalculators =
    calculators?.data?.filter(calculator => calculator.is_published) || []
  const draftCalculators =
    calculators?.data?.filter(calculator => !calculator.is_published) || []

  const handleCalculatorDelete = (calculatorId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast("Deleting calculator...", {
          type: "info",
          autoClose: false,
          closeButton: false,
        })

        try {
          const requestOptions = {
            headers: {
              "Content-Type": "application/json",
            },
          }

          await axios.delete("http://localhost:8080/api/calculator/" + calculatorId, requestOptions)

          toast.update(toastId, {
            render: "Calculator deleted successfully",
            type: "success",
            autoClose: 500
          })
        } catch (error) {
          console.log(error)

          toast.update(toastId, {
            render: "Failed to deleted calculator",
            type: "error",
            autoClose: 1500,
            onClose: () => {
              router.replace("/dashboard")
            },
          })
        } finally {
          refetchData()
        }
      }
    })
  }

  return (
    <React.Fragment>
      <Head>
        <title>Admin Dashboard: Customizable Calculator</title>
      </Head>

      <ProtectedRoute>
        <section className="block">
          <Header />
          <div className="flex items-streatch">
            <Sidebar />
            <div className="ml-auto w-8/12 md:w-9/12 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-4 p-5 pt-24 overflow-y-auto">
              <div className="activeCalc">
                <h3 className="text-base md:text-lg font-bold">
                  Active Calculators:
                </h3>

                <hr className="my-2" />

                <ul className="space-y-4 pt-2">
                  {activeCalculators.map(calculator => (
                    <li
                      id={`calc_id_${calculator.id}`}
                      key={calculator.id}
                      className="bg-gray-100 px-3 py-2 rounded-md hover:bg-blue-400/20 duration-300 cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <a href={calculator.id}>{calculator?.calc_name || ""}</a>

                        <div className="flex gap-2">
                          <Link href={`edit-calculator?id=${calculator.id}`}>
                            <a className="text-red-500 underline">Edit</a>
                          </Link>

                          <button
                            onClick={() => handleCalculatorDelete(calculator.id)}
                            className="text-red-500 underline"
                          >
                            Delete
                          </button>

                          <Link href={`test-calculator?calcId=${calculator.id}`}>
                            <a className="text-blue-500 underline">Test</a>
                          </Link>
                        </div>
                      </div>

                      <hr className="mt-2" />

                      <p className="text-sm opacity-70">
                        {calculator?.calc_desc || "No description available"}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="draftCalc">
                <h3 className="text-base md:text-lg font-bold">
                  Draft Calculators:
                </h3>

                <hr className="my-2" />

                <ul className="space-y-4 pt-2">
                  {draftCalculators.map(calculator => (
                    <li
                      id={`calc_id_${calculator.id}`}
                      key={calculator.id}
                      className="bg-gray-100 px-3 py-2 rounded-md hover:bg-blue-400/20 duration-300 cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <a href={calculator.id}>{calculator?.calc_name || ""}</a>

                        <div className="flex gap-2">
                          <Link href={`edit-calculator?id=${calculator.id}`}>
                            <a className="text-red-500 underline">Edit</a>
                          </Link>

                          <button
                            onClick={() => handleCalculatorDelete(calculator.id)}
                            className="text-red-500 underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <hr className="mt-2" />

                      <p className="text-sm opacity-70">
                        {calculator?.calc_desc || "No description available"}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </ProtectedRoute>
    </React.Fragment>
  )
}

export default withRouter(Dashboard)
