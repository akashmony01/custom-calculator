import React from "react"
import Link from "next/link"
import { signOut } from "next-auth/react"


export default function HeaderComp() {
  return (
    <>
        <div className="fixed top-0 left-0 right-0 bg-gray-300 px-5 py-3 flex justify-between items-center gap-4 z-50">
            <label
                htmlFor="calc"
                className="block text-lg md:text-xl font-bold"
            >
                Admin Screens
            </label>

            <button
                onClick={() => signOut({ callbackUrl: "/" })}
                type="button"
                className="px-4 py-2 rounded-md bg-red-600 text-white"
            >
                Logout
            </button>
        </div>
    </>
  )
}
