import React from "react"
import Head from "next/head"
import Link from "next/link"

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Welcome to Customizable Calculator</title>
      </Head>

      <section className="min-h-screen grid grid-cols-1 sm:grid-cols-2">
        <div className="flex flex-col justify-center items-stretch py-10 p-14 text-center">
          <p className="text-base textxl md:text-2xl mb-4 text-gray-900">
            Welcome to the most
          </p>
          <h1 className="text-4xl md:text-5xl space-y-1 font-bold">
            <span className="block text-purple-500">
              Customizable
            </span>
            <span className="block text-teal-500">
              Calculator
            </span>
          </h1>
          <div className="mt-8">
            <div className="toolTipParent relative block text-white bg">
              <Link href="/dashboard">
                <a className="w-full block px-5 py-3 border-2 border-purple-500 text-purple-500 hover:text-white hover:bg-purple-500 rounded-md font-bold uppercase hover:opacity-100 text-sm md:text-base">
                  Proceed as Admin
                </a>
              </Link>
              <div className="toolTipItem hidden sm:block invisible absolute top-2/4 left-full transform ml-28 -translate-y-2/4 w-full duration-300 opacity-0 z-50">
                {/* <span className='block bg-gray-700' /> */}
                <div className="absolute top-2/4 right-full h-0.5 w-28 -translate-y-2/4 bg-purple-500"></div>
                <p className="text-left p-4 rounded-md bg-purple-500/70 border-2 border-purple-500">
                  Proceed as admin to create, delete, update calculators. You
                  need to provide the secret password.
                </p>
              </div>
            </div>
            <div className="mt-5 toolTipParent relative block text-white">
              <Link href="/calculator-list">
                <a className="w-full block px-5 py-3 border-2 border-teal-500 text-teal-500 hover:text-white hover:bg-teal-500 rounded-md font-bold uppercase hover:opacity-100 text-sm md:text-base">
                  Go as General User
                </a>
              </Link>
              <div className="toolTipItem hidden sm:block invisible absolute top-2/4 left-full transform ml-28 -translate-y-2/4 w-full duration-300 opacity-0 z-50">
                {/* <span className='block bg-gray-700' /> */}
                <div className="absolute top-2/4 right-full h-0.5 w-28 -translate-y-2/4 bg-teal-500"></div>
                <p className="text-left p-4 rounded-md bg-teal-500/70 border-2 border-teal-500">
                  Proceed as general user to use pre defined calculators and
                  calculate.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-black relative hidden sm:flex flex-col items-center justify-center">
          <img 
            className="absolute left-0 right-0 w-full h-full object-cover object-center bg-no-repeat opacity-50 z-0"
            src="images/bg.jpg" 
            alt="backgroud image" 
          />
          <Link href="/init-help">
            <a className="animate-bounce sticky z-10 bg-blue-500/80 hover:bg-blue-500/100 hover:opacity-100 p-5 rounded-full shadow-md text-white cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-32 h-32">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            </a>
          </Link>
        </div>
      </section>
    </React.Fragment>
  )
}

export default Home
