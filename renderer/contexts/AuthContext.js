import React, { createContext, useContext, useState } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import axios from "axios"

export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  signin: (username, password) => {},
  signout: () => {},
})

export default function AuthProvider({ children }) {
  const router = useRouter()
  const [state, setState] = useState({
    isAuthenticated: false,
    user: null,
  })

  const signin = async (username, password) => {
    try {
      setState({
        isAuthenticated: false,
        user: null,
      })

      const { status, data } = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      setState({
        isAuthenticated: true,
        user: data?.data,
      })

      if (status === 201) {
        router.push("/dashboard")
      } else {
        toast.error("Wrong username or password.")
      }
    } catch (error) {
      console.log(error)
      setState({
        isAuthenticated: false,
        user: null,
      })
    }
  }

  const signout = () => {
    setState({
      isAuthenticated: false,
      user: null,
    })

    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ ...state, signin, signout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
