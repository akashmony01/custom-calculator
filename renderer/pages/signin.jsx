import React from "react"
import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { signIn, useSession } from "next-auth/react"
import { toast } from "react-toastify"

export default function SigninPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = data => {
    signIn("credentials", {
      ...data,
      callbackUrl: "/",
    }).then(({ ok }) => {
      if (!ok) {
        toast.error(
          "Sign in failed. Check the details you provided are correct."
        )
      }
    })
  }

  if (session) {
    router.push("/")
  }

  return (
    <>
      <Head>
        <title>Welcome to Custom Calculator</title>
      </Head>
      <section className="h-screen flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ minWidth: "40%", maxWidth: "90%" }}
          className="relative conatiner bg-white py-6 px-4 rounded-md"
        >
          <h2 className="text-base md:text-xl font-bold mb-4">
            Login with Admin details
          </h2>

          <div className="block mt-4">
            <label
              htmlFor="username"
              className="inline-block cursor-pointer mb-2"
            >
              Admin Username
            </label>

            <input
              id="username"
              className={`w-full border border-gray-200 focus:border-gray-400 rounded-md outline-none px-4 py-2 focus:outline-none duration-300 ${
                errors.username && "border-red-400 focus:border-red-400"
              }`}
              type="text"
              placeholder="username"
              {...register("username", { required: true })}
            />
          </div>

          <div className="block mt-4">
            <label
              htmlFor="password"
              className="inline-block cursor-pointer mb-2"
            >
              Admin Password
            </label>
            <input
              id="password"
              className={`w-full border border-gray-200 focus:border-gray-400 rounded-md outline-none px-4 py-2 focus:outline-none duration-300 ${
                errors.password && "border-red-400 focus:border-red-400"
              }`}
              type="password"
              placeholder="password"
              {...register("password", { required: true })}
            />
          </div>

          <button
            type="submit"
            className="mt-4 inline-block px-10 py-2 bg-blue-600 rounded-md text-white"
          >
            Login
          </button>
        </form>

        <Link href="/">
          <a className="inline-block bg-blue-600 mt-3 text-white px-3 py-1 rounded-md">
            Go Back To Home
          </a>
        </Link>
      </section>
    </>
  )
}
