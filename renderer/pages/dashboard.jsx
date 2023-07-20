import React from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import useSWR from "swr"
import { useSession } from "next-auth/react"

const fetcher = url => fetch(url).then(res => res.json())

function Dashboard() {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === "loading") {
    return "Loading..."
  }

  if (status === "unauthenticated" || !session?.user) {
    router.push("/signin")
  }

  const { data: calculators } = useSWR("api/calculators/find", fetcher)

  const activeCalculators =
    calculators?.filter(calculator => calculator.status) || []
  const draftCalculators =
    calculators?.filter(calculator => !calculator.status) || []

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
              <br />
              {/* <small>{session.user.username}</small> */}
            </label>

            <Link href="/create-calculator">
              <a className="px-4 py-2 rounded-md bg-blue-600 text-white">
                Create New Calculator
              </a>
            </Link>

            <Link href="/">
              <a className="text-blue-600 underline">Back to home</a>
            </Link>
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
                    key={calculator.id}
                    className="bg-gray-100 px-3 py-2 rounded-md hover:bg-blue-400/20 duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <a href={calculator.id}>{calculator.name}</a>

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
                      {calculator?.desc || "No description available"}
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
                    key={calculator.id}
                    className="bg-gray-100 px-3 py-2 rounded-md hover:bg-blue-400/20 duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <a href={calculator.id}>{calculator.name}</a>

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
                      {calculator?.desc || "No description available"}
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