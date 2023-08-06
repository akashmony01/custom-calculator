import React from "react"

// Contexts
import { useAuth } from "../contexts/AuthContext"

export default function HeaderComp() {
    const { signout } = useAuth()

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
                    onClick={() => signout()}
                    type="button"
                    className="px-4 py-2 rounded-md bg-red-600 text-white"
                >
                    Logout
                </button>
            </div>
        </>
    )
}
