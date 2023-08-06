import React, { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { withRouter } from "next/router"

// Components & hooks
import Header from "../components/header"
import Sidebar from "../components/sidebar"
import useAxiosFetch from "../hooks/useAxiosFetch"
import ProtectedRoute from '../components/ProtectedRoute'
import CalculatorDeleteModal from "../components/Calculator/CalculatorDeleteModal"

function Dashboard() {
  const [showModal, setShowModal] = useState(false)

  const { response: calculators } = useAxiosFetch({
    url: "http://localhost:8080/api/calculator",
  })

  const activeCalculators =
    calculators?.data?.filter(calculator => calculator.is_published) || []
  const draftCalculators =
    calculators?.data?.filter(calculator => !calculator.is_published) || []

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <React.Fragment>
      <Head>
        <title>Admin - Dashboard</title>
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
                            onClick={toggleModal}
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

                      {showModal && (
                        <CalculatorDeleteModal
                          toggleModal={toggleModal}
                          calcId={calculator.id}
                        />
                      )}
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
                            onClick={toggleModal}
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

                      {showModal && (
                        <CalculatorDeleteModal
                          toggleModal={toggleModal}
                          calcId={calculator.id}
                        />
                      )}
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
