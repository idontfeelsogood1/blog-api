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
            <title>Admin Dashboard</title>
          </Helmet>
          <Header user={user} />
          <Outlet context={[user, setUser]} />
          <Footer />
        </>
      )
  }
}

export default App