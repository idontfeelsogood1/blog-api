import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { createRoot } from "react-dom/client";
import './index.css' // global CSS reset
import App from './App.jsx'
import About from './components/About/About.jsx'
import BlogContainer from './components/BlogContainer/BlogContainer.jsx'
import Index from './components/Index/Index.jsx'
import Blog from './components/Blog/Blog.jsx'
import Error from './components/About/Error.jsx'
import Login from './components/Login/Login.jsx'
import Logout from './components/Logout/Logout.jsx'

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
          path: 'blog',
          element: <BlogContainer />,
      },
      {
          path: 'blog/:blogId',
          element: <Blog />
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
