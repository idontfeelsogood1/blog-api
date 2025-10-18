import { Outlet } from 'react-router'
import { Helmet } from 'react-helmet'
import Header from './components/Header/Header.jsx'

function App() {
  return (
    <>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Blog Api</title>
      </Helmet>
      <Header />
      <Outlet />
    </>
  )
}

export default App

// App 
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