import React from "react"
import Link from "next/link"
import Head from "next/head"


export default function InitHelp() {
  return (
    <>
      <Head>
        <title>Intial Help: Customizable Calculator</title>
      </Head>
      <section className="py-12">
        <div className="container max-w-screen-sm">
            <div className="flex gap-4 justify-between">
              <Link href="/">
                <a className="text-blue-600 underline">Back to home</a>
              </Link>
              <Link href="/about-app">
                <a className="text-blue-600 underline">About App</a>
              </Link>
            </div>
            <h1 className="mt-4 mb-3 text-3xl font-bold">
              How get started!
            </h1>
            <hr />
            <p className="mt-4">
                This is a application where you can create calculators with custom inputs and outputs. You can define the formula/expression to get the output using the inputs.
            </p>
            <div className="mt-5 flex gap-10 sm:gap-0 flex-col sm:flex-row sm:divide-x">
              <div className="mt-4 w-full sm:w-6/12 sm:pr-10">
                <h2 className="text-xl font-bold">
                    As Admin.
                </h2>
                <article className="mt-4 space-y-4">
                  <img className="w-full h-auto shadow-md border border-opacity-50" src="images/login.png" alt="login-screen" />
                  <p>
                    You will see the login page first after you click to proceed as admin and not logged in. If you are not logged in provide login info and click login.
                  </p>
                  <img className="w-full h-auto shadow-md border border-opacity-50" src="images/dashboard.png" alt="dashboard-screen" />
                  <p>
                    Once you logged in you can then see the dashobar where you can create, delete, edit and test calculators. You can now perform your admin action from here.
                  </p>
                </article>
                <div className="mt-5 flex items-center gap-3">
                    Proceed as
                    <Link href="/dashboard">
                        <a className="inline-block text-blue-600 underline">Admin</a>
                    </Link>
                </div>
              </div>
              <div className="mt-4 w-full sm:w-6/12 sm:pl-10">
                <h2 className="text-xl font-bold">
                  As General User.
                </h2>
                <article className="mt-4 space-y-4">
                  <img className="w-full h-auto shadow-md border border-opacity-50" src="images/init.png" alt="init-screen" />
                  <p>
                    After clicking proceed as general user you will see theis screen saying no calculator choosen yet.
                  </p>
                  <img className="w-full h-auto shadow-md border border-opacity-50" src="images/login.png" alt="choosen-screen" />
                  <p>
                    Once you choose a calculator from the list you will get the input fields for this calculator, fill them up and click calculate. 
                    Underneath the button you will see the result.
                  </p>
                  <p>
                    To check how the output is getting calculated. Click on show formula button. You can see what formula is used for this calculator.
                  </p>
                </article>
                <div className="mt-5 flex items-center gap-3">
                    Proceed as
                    <Link href="/calculator-list">
                        <a className="inline-block text-blue-600 underline">General User</a>
                    </Link>
                </div>
              </div>
            </div>
        </div>
      </section>
    </>
  )
}
