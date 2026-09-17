import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
import CreatePost from './pages/CreatePost/CreatePost'
import Dashboard from './pages/Dashboard/Dashboard'

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
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <NavBar />
          <div>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to='/'/>} />
              <Route path='/register' element={<Register />} />
              <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to='/login'/>} />
              <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to='/login'/>} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </main>
  )
}

export default App
