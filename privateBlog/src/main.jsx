import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { createRoot } from "react-dom/client";
import './index.css' // global CSS reset
import App from './App.jsx'
import About from './components/About/About.jsx'
import Index from './components/Index/Index.jsx'
import Error from './components/Error/Error.jsx'
import Login from './components/Login/Login.jsx'
import Logout from './components/Logout/Logout.jsx'
import Register from './components/Register/Register.jsx'
import Blogs from './components/Blogs/Blogs.jsx'
import Comments from './components/Comments/Comments.jsx'
import Users from './components/Users/Users.jsx'
import AddBlog from './components/AddBlog/AddBlog.jsx'

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
          index: true,
          element: <Index />,
      },
      {
          path: 'about',
          element: <About />,
      },
      {
          path: 'blogs',
          element: <Blogs />,
      },
      {
          path: 'add-blog',
          element: <AddBlog />,
      },
      {
          path: 'comments',
          element: <Comments />, 
      },
      {
          path: 'users',
          element: <Users />,
      },
      {
          path: 'register',
          element: <Register />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'logout',
        element: <Logout />
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
