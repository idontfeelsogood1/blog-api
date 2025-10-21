import { Outlet } from 'react-router'
import { Helmet } from 'react-helmet'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import { useState, useEffect } from 'react'
import { verifyToken } from './api/auth.js'

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    async function verify() {
      try {
        const user = await verifyToken()
        if (!user) {
          setUser(null)
          setLoading(false)
        } else {
          setUser(user)
          setLoading(false)
          }
      } catch(err) {
        console.log("Error at App: ", err)
      }
    }
    verify()
  } ,[])

  if (isLoading) {
    return (
      <>
        <h1>Loading App</h1>
      </>
    )
  } else {
      return (
        <>
          <Helmet>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Blog Api</title>
          </Helmet>
          <Header user={user} />
          <Outlet context={[user, setUser]} />
          <Footer />
        </>
      )
  }
}

export default App

// App 
  // Do authorization and keep track if user has logged in or not
  // Contains header
    // Home button Link to "/"
    // About button Link to "/about"
    // Blog button Link to "/blog"
    // Render login or logout button based on jwt presence
      // Login button Link to "/login"
      // Logout button Link to "/logout"
  // Contains outlet for child components

// Router
  // parent path:"/" render Index
    // path:"/about" render About
    // path:"/blog" render BlogContainer
    // path:"/blog/:blogId" render Blog
    // path: "/login" render Login
    // path: "/logout" logs user out and back to "/"