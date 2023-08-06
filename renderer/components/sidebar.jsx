import React from "react"
import Link from "next/link"
import {AiOutlineUser, AiOutlineHome, AiOutlinePlus, AiOutlineQuestion} from 'react-icons/ai'
import {LuLayoutDashboard} from 'react-icons/lu'
import {BsInfoLg} from 'react-icons/bs'

export default function SidebarComp() {
  return (
    <>
        <div className="fixed top-0 left-0 bg-gray-200 w-4/12 md:w-3/12 min-h-screen flex flex-col gap-2 p-5 pt-20">
            <Link href="/">
                <a className="flex items-center gap-2">
                <span className="block">
                    <AiOutlineHome />
                </span>
                <span className="block underline">
                    Back to Home
                </span>
                </a>
            </Link>
            <Link href="/dashboard">
                <a className="flex items-center gap-2">
                <span className="block">
                    <LuLayoutDashboard />
                </span>
                <span className="block underline">
                    Back to Dashboard
                </span>
                </a>
            </Link>
            <Link href="/create-calculator">
                <a className="flex items-center gap-2">
                <span className="block">
                    <AiOutlinePlus />
                </span>
                <span className="block underline">
                    Create New Calculator
                </span>
                </a>
            </Link>
            <Link href="/admin-help">
                <a className="flex items-center gap-2">
                <span className="block">
                    <AiOutlineQuestion />
                </span>
                <span className="block underline">
                    Admin Guide
                </span>
                </a>
            </Link>
            <Link href="/calculator-list">
                <a className="flex items-center gap-2">
                <span className="block">
                    <AiOutlineUser />
                </span>
                <span className="block underline">
                    As General User
                </span>
                </a>
            </Link>
            <Link href="/about-app">
                <a className="flex items-center gap-2">
                <span className="block">
                    <BsInfoLg />
                </span>
                <span className="block underline">
                    Aout this App
                </span>
                </a>
            </Link>
        </div>
    </>
  )
}
