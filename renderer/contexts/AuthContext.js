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

const getAuthDataFromSession = () => {
  try {
    const authDataString = sessionStorage.getItem("authData")
    const authData = authDataString ? JSON.parse(authDataString) : null

    return {
      isAuthenticated: authData.isAuthenticated || false,
      user: authData.user || null,
    }
  } catch (error) {
    return {
      isAuthenticated: false,
      user: null,
    }
  }
}

function setAuthDataInSession(authData) {
  sessionStorage.setItem("authData", JSON.stringify(authData))
}

export default function AuthProvider({ children }) {
  const router = useRouter()
  const [state, setState] = useState(getAuthDataFromSession())

  const signin = async (username, password) => {
    try {
      setState({
        isAuthenticated: false,
        user: null,
      })

      const { data } = await axios.post(
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

      const authData = {
        isAuthenticated: true,
        user: data?.data,
      }

      setAuthDataInSession(authData)
      setState(authData)

      if (data?.data?.id) {
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
    const authData = {
      isAuthenticated: false,
      user: null,
    }

    setAuthDataInSession(authData)
    setState(authData)

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
