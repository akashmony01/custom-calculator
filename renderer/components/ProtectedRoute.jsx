import { useEffect, useState } from "react"
import { useRouter } from "next/router"

// Components & contexts
import LoaderScreen from "./LoaderScreen"
import { useAuth } from "../contexts/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/signin")
    } else {
      setLoading(false)
    }
  }, [isAuthenticated])

  if (loading) {
    return <LoaderScreen />
  }

  return <>{children}</>
}

export default ProtectedRoute
