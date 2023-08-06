import React from "react"
import axios from "axios"
import { FaTimes } from "react-icons/fa"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

function CalculatorDeleteModal({ toggleModal, calcId, refetchData }) {
  const router = useRouter()

  const handleDeleteCalculator = async evt => {
    evt.preventDefault()

    const toastId = toast("Deleting calculator...", {
      type: "info",
      autoClose: false,
      closeButton: false,
    })

    try {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      await axios.delete("http://localhost:8080/api/calculator/" + calcId, requestOptions)

      refetchData()

      toast.update(toastId, {
        render: "Calculator deleted successfully",
        type: "success",
        autoClose: 500
      })
    } catch (error) {
      console.log(error)

      toast.update(toastId, {
        render: "Failed to deleted calculator",
        type: "error",
        autoClose: 1500,
        onClose: () => {
          router.replace("/dashboard")
        },
      })
    } finally {
      toggleModal()
    }
  }

  return (
    <React.Fragment>
      <section className="flex flex-col items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-black/40 z-50">
        <div
          style={{ minWidth: "40%", maxWidth: "90%" }}
          className="relative conatiner bg-white py-6 px-4 rounded-md"
        >
          <span
            onClick={toggleModal}
            className="cursor-pointer hover:opacity-80 duration-300 block absolute top-0 right-0 p-1.5 text-xl"
          >
            <FaTimes />
          </span>

          <h2 className="block text-3xl font-bold text-center">
            Are you sure?
          </h2>

          <div className="w-100 mx-auto text-center">
            <button
              type="button"
              onClick={handleDeleteCalculator}
              className="mt-10 inline-block px-10 py-1 bg-red-600 rounded-md text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default CalculatorDeleteModal
