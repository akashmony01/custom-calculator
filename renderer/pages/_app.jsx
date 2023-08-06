import "../styles/main.css"
import 'react-toastify/dist/ReactToastify.css';

import AuthProvider from '../contexts/AuthContext'
import { ToastContainer } from 'react-toastify';

const App = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </AuthProvider>
  )
}

export default App
