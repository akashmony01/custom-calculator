import React from "react"
import Link from "next/link"
import {AiFillHome, AiFillPlusSquare} from 'react-icons/ai'
import {BiSolidHelpCircle, BiSolidUserCircle, BiSolidDashboard} from 'react-icons/bi'

export default function SidebarComp() {
  return (
    <>
        <div className="fixed top-0 left-0 bg-gray-200 w-4/12 md:w-3/12 min-h-screen flex flex-col gap-2 p-5 pt-20">
            <Link href="/">
                <a className="flex items-center gap-2">
                <span className="block">
                    <AiFillHome />
                </span>
                <span className="block underline">
                    Back to Home
                </span>
                </a>
            </Link>
            <Link href="/dashboard">
                <a className="flex items-center gap-2">
                <span className="block">
                    <BiSolidDashboard />
                </span>
                <span className="block underline">
                    Back to Dashboard
                </span>
                </a>
            </Link>
            <Link href="/create-calculator">
                <a className="flex items-center gap-2">
                <span className="block">
                    <AiFillPlusSquare />
                </span>
                <span className="block underline">
                    Create New Calculator
                </span>
                </a>
            </Link>
            <Link href="/init-help">
                <a className="flex items-center gap-2">
                <span className="block">
                    <BiSolidHelpCircle />
                </span>
                <span className="block underline">
                    Get Help
                </span>
                </a>
            </Link>
            <Link href="/calculator-list">
                <a className="flex items-center gap-2">
                <span className="block">
                    <BiSolidUserCircle />
                </span>
                <span className="block underline">
                    As General User
                </span>
                </a>
            </Link>
        </div>
    </>
  )
}
