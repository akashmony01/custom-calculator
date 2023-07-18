import React from "react"
import Head from "next/head"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

function Home() {
  const { data: session } = useSession()

  return (
    <React.Fragment>
      <Head>
        <title>Welcome to Custom Calculator</title>
      </Head>

      <section className="min-h-screen flex justify-center items-center">
        <div className="container text-center">
          <p className="text-base md:text-lg mb-4">Welcome to the most</p>
          <h1 className="relative text-2xl md:text-4xl font-bold">
            <span className="inline-block sticky z-10 bg-white px-2">
              Customizeable Calculator
            </span>
            <span className="absolute top-2/4 block w-full h-px bg-gray-200 z-0" />
          </h1>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <div className="toolTipParent relative inline-block text-white">
              <Link href="/dashboard">
                <a className="px-4 py-2 bg-blue-600 rounded-md">
                  Proceed as Admin
                </a>
              </Link>
              <div className="toolTipItem invisible mt-4 absolute top-full left-2/4 transform -translate-x-2/4 w-60 inline-block duration-300 opacity-0">
                {/* <span className='block bg-gray-700' /> */}
                <div className="absolute -top-4 left-2/4 h-4 w-4 origin-bottom-left -translate-x-2/4 transform rotate-45 bg-gray-700"></div>
                <p className="px-2 py-2 rounded-md bg-gray-700 text-sm">
                  Proceed as admin to create, delete, update calculators. You
                  need to provide the secret password.
                </p>
              </div>
            </div>
            <div className="toolTipParent relative inline-block text-white">
              <Link href="/calculator-list">
                <a className="block px-4 py-2 bg-green-600 text-white rounded-md">
                  Go as General User
                </a>
              </Link>
              <div className="toolTipItem invisible mt-4 absolute top-full left-2/4 transform -translate-x-2/4 w-60 inline-block duration-300 opacity-0">
                {/* <span className='block bg-gray-700' /> */}
                <div className="absolute -top-4 left-2/4 h-4 w-4 origin-bottom-left -translate-x-2/4 transform rotate-45 bg-gray-700"></div>
                <p className="px-2 py-2 rounded-md bg-gray-700 text-sm">
                  Proceed as general user to use pre defined calculators and
                  calculate.
                </p>
              </div>
            </div>
          </div>

          {session && (
            <button
              onClick={() => signOut()}
              className="inline-block bg-red-600 mt-10 text-white px-3 py-1 rounded-md"
            >
              Logout
            </button>
          )}
        </div>
      </section>
    </React.Fragment>
  )
}

export default Home
