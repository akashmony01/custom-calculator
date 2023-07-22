import React from "react"
import Head from "next/head"
import Link from "next/link"
import { getSession, signOut } from "next-auth/react"
import useAxiosFetch from "../hooks/useAxiosFetch"

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

function Dashboard() {
  const { response: calculators } = useAxiosFetch({
    url: "/api/calculators",
  })

  const activeCalculators =
    calculators?.data?.filter(calculator => calculator.is_published) || []
  const draftCalculators =
    calculators?.data?.filter(calculator => !calculator.is_published) || []

  return (
    <React.Fragment>
      <Head>
        <title>Admin - Dashboard</title>
      </Head>

      <section className="py-4">
        <div className="container">
          <div className="bg-gray-200 rounded-md px-5 py-3 flex justify-between items-center gap-4">
            <label
              htmlFor="calc"
              className="block text-lg md:text-xl font-bold"
            >
              Admin Dashboard
            </label>

            <Link href="/create-calculator">
              <a className="px-4 py-2 rounded-md bg-blue-600 text-white">
                Create New Calculator
              </a>
            </Link>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              type="button"
              className="px-4 py-2 rounded-md bg-red-600 text-white"
            >
              Logout
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
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

                        <Link href="calculator-list">
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

                        <Link href="calculator-list">
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
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default Dashboard
