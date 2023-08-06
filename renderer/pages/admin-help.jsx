import React, { useEffect, useReducer, useRef } from "react"
import Head from "next/head"

// Components & hooks
import Header from "../components/header"
import Sidebar from "../components/sidebar"


function AdminHelp() {
  return (
    <React.Fragment>
        <Head>
        <title>Admin Help: Customizable Calculator</title>
        </Head>

        <section className="block">
            <Header />
            <div className="flex items-streatch">
            <Sidebar />
            <div className="ml-auto w-8/12 md:w-9/12 min-h-screen p-5 pt-24 overflow-y-auto">
                <h1 className="block text-xl md:text-2xl font-bold mb-3">
                    Get started as Admin.
                </h1>
                <hr />
                <p className="mt-5">
                    This guide is for admin to operate action on calculators such as create, delete, edit and test calcultors.
                </p>

                <article className="mt-8 space-y-3">
                    <h2 className="text-xl font-bold">
                        Creation Guide:
                    </h2>
                    <p>
                        To create a calculator you have to field all the fields that a calculator requires.  
                        The <strong>input fields variable</strong> name must contain the prefix <strong>"inp_"</strong> 
                        and also have to be unique for one calculator so that system can distinguish as variabales.
                    </p>
                    <p>
                        When describing the <strong>expression/formula</strong> of the calculator make sure you only is the 
                        <strong>input fields variable</strong> names for as variable. 
                        You can use basic number 0 to 9, and basic arithmetic signs to complete the expression.
                    </p>
                    <p>
                        You can save calcuylator two ways, either you can save it as draft one so it wont appear in general user list.
                        On the other hand you can save a calkculator as published one which will appear in both users and admin list.
                    </p>
                </article>
                <article className="mt-8 space-y-3">
                    <h2 className="text-xl font-bold">
                        Update Guide:
                    </h2>
                    <p>
                        All the rules for creation is applied for updating a calculator too.
                    </p>
                </article>
                <article className="mt-8 space-y-3">
                    <h2 className="text-xl font-bold">
                        Delete Guide:
                    </h2>
                    <p>
                        To delete a calculator you have to click on delete and then confirm the delete, then it will be deleted from the app permanently.
                    </p>
                </article>
                <article className="mt-5 space-y-3">
                    <h2 className="text-xl font-bold">
                        Test Guide:
                    </h2>
                    <p>
                        You can only test the publish calculators. To test a calculator click on the test button it will open the test poage 
                        with the choosen calculators provide the input and check the output.
                    </p>
                </article>
            </div>
            </div>
        </section>
    </React.Fragment>
  )
}

export default AdminHelp
