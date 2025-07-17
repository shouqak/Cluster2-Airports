import { createBrowserRouter, Outlet, RouterProvider } from "react-router"
import Home from "../Pages/Home"
import AdminLogin from "../Admin/Pages/AdminLogin"
import DashboardAdmin from "../Admin/Pages/DashboardAdmin"
import NewsForm from "../Admin/components/NewsForm"
import NavBar from "../Admin/components/NavBar"
import AddNews from "../Admin/Pages/AddNews"
import EditNews from "../Admin/Pages/EditNews"
import Archivednews from "../Admin/Pages/Archivednews"
import NewsDetails from "../Pages/NewsDetails"
import { AdminLayout } from "../Utility/AdminLayout"
import { HomeLayout } from "../Utility/HomeLayout"
import ErorrPage from "../Pages/ErorrPage"

export function Layout() {
  return (
    <>
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/AdminLogin", element: <AdminLogin /> }],
  },
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "detailNews/:id", element: <NewsDetails /> },
            { path: "*", element: <ErorrPage/> },

    ],
  },
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { path: "/dashboardAdmin", element: <DashboardAdmin /> },
      { path: "/NewsForm", element: <AddNews /> },
      { path: "/NewsEdit/:id", element: <EditNews /> },
      { path: "/ArchivedNews", element: <Archivednews /> },
      { path: "*", element: <ErorrPage/> },

    ],
  },
])

function Router() {
  return <RouterProvider router={router} />
}

export default Router
