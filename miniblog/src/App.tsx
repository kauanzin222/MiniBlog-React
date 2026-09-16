import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth'

// hooks
import { useState, useEffect } from 'react'
import { useAuthentication } from './hooks/useAuthentication'

// context
import { AuthProvider } from './context/AuthContext'

// pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'

// components
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {

  const [user, setUser] = useState<FirebaseUser | null | undefined>()
  const { auth } = useAuthentication()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  const loadingUser = user === undefined
  if (loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <main>
      <AuthProvider value={null}>
        <BrowserRouter>
          <NavBar />
          <div>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </main>
  )
}

export default App
