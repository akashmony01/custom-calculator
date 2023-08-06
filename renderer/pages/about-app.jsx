import React from "react"
import Link from "next/link"
import Head from "next/head"


export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About app: Custom Calculator</title>
      </Head>
      <section className="py-12">
        <div className="container max-w-screen-sm">
            <div className="flex gap-4 justify-between">
              <Link href="/">
                <a className="text-blue-600 underline">Back to home</a>
              </Link>
              <Link href="/dashboard">
                <a className="text-blue-600 underline">Back to Dashboard</a>
              </Link>
            </div>
            <h1 className="mt-4 mb-3 text-3xl font-bold">
              About this app
            </h1>
            <hr />
            <p className="mt-4">
                This application has been created as project for the <strong>Software Developemnt Project 2</strong> (SDP2). 
                By the team <strong>CodeCrafters</strong>.
            </p>
            <p className="mt-4">
                The five members of our team are:
            </p>
            <ul className="mt-4 space-y-4">
                <li>
                    <div className="flex gap-3">
                        <img className="mt-1.5 w-8 h-8 rounded-full" src="images/logo.png" alt="Akash" />
                        <div className="block">
                            <h4 className="text-lg font-bold">
                                Mohammed Akash
                            </h4>
                            <p>
                                ID: 21221203019
                                <span className="ml-1.5 text-sm text-gray-500">
                                    (CSE 40/1)
                                </span>
                            </p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="flex gap-3">
                        <img className="mt-1.5 w-8 h-8 rounded-full" src="images/logo.png" alt="Akash" />
                        <div className="block">
                            <h4 className="text-lg font-bold">
                                Jahidul Islam
                            </h4>
                            <p>
                                ID: 21221203044
                                <span className="ml-1.5 text-sm text-gray-500">
                                    (CSE 40/1)
                                </span>
                            </p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="flex gap-3">
                        <img className="mt-1.5 w-8 h-8 rounded-full" src="images/logo.png" alt="Akash" />
                        <div className="block">
                            <h4 className="text-lg font-bold">
                                Rakibul Hasan
                            </h4>
                            <p>
                                ID: 21221203017
                                <span className="ml-1.5 text-sm text-gray-500">
                                    (CSE 40/1)
                                </span>
                            </p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="flex gap-3">
                        <img className="mt-1.5 w-8 h-8 rounded-full" src="images/logo.png" alt="Akash" />
                        <div className="block">
                            <h4 className="text-lg font-bold">
                                Setara Akter
                            </h4>
                            <p>
                                ID: 21221203045
                                <span className="ml-1.5 text-sm text-gray-500">
                                    (CSE 40/1)
                                </span>
                            </p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="flex gap-3">
                        <img className="mt-1.5 w-8 h-8 rounded-full" src="images/logo.png" alt="Akash" />
                        <div className="block">
                            <h4 className="text-lg font-bold">
                                Saiful Islam
                            </h4>
                            <p>
                                ID: 21221203026
                                <span className="ml-1.5 text-sm text-gray-500">
                                    (CSE 40/1)
                                </span>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
            <h2 className="mt-6 text-xl font-bold">
                Short Description:
            </h2>
            <p className="mt-4">
                The "Programmable Calculator" application was built using ElectronJS, a framework for developing cross-platform desktop applications. The architecture allowed for easy compatibility with Linux, macOS, and Windows operating systems.
            </p>
            <p className="mt-4">
                We also used Next.js as frontend framework to make our components more reusable and robust. The user interface was carefully designed to be simple, intuitive, and visually appealing. Administrators can create and manage custom calculators, defining inputs and expressions. General users could then use these calculators to perform calculations by providing appropriate input values.
            </p>
            <p className="mt-4">
                We used SQL for our backend database and Prisma build queries and perform post and get actions on our database.
            </p>
        </div>
      </section>
    </>
  )
}
