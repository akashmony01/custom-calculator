import React from "react"
import Link from "next/link"
import Head from "next/head"


export default function SigninPage() {
  return (
    <>
      <Head>
        <title>Help: Custom Calculator</title>
      </Head>
      <section className="py-12">
        <div className="container max-w-screen-sm">
            <Link href="/">
              <a className="text-blue-600 underline">Back to home</a>
            </Link>
            <h1 className="mt-4 mb-3 text-3xl font-bold">
                How get started!
            </h1>
            <hr />
            <p className="mt-4">
                This is a application where you can create calculators with custom inputs and outputs. You can define the formula/expression to get the output using the inputs.
            </p>
            <h2 className="mt-4 text-xl font-bold">
                As Admin.
            </h2>
            <p className="mt-2">
                To create or edit calculators you need to be logged in with predefined username and password.
            </p>
            <h2 className="mt-4 text-xl font-bold">
                As General User.
            </h2>
            <p className="mt-2">
                To use any pre listed calculators you dont need to be logged in. You can just select a calculator and then provide input and click calculate to get the output. 
            </p>
            <div className="mt-5 flex items-center gap-3">
                Proceed as
                <Link href="/dashboard">
                    <a className="inline-block text-blue-600 underline">Admin</a>
                </Link>
                <Link href="/calculator-list">
                    <a className="inline-block text-blue-600 underline">General User</a>
                </Link>
            </div>
        </div>
      </section>
    </>
  )
}
