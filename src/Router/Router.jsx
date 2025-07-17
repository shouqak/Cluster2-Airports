import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import AdminLogin from "../Admin/Pages/AdminLogin";
import DashboardAdmin from "../Admin/Pages/DashboardAdmin";
import AddNews from "../Admin/Pages/AddNews";
import EditNews from "../Admin/Pages/EditNews";
import Archivednews from "../Admin/Pages/Archivednews";
import { AdminLayout } from "../Utility/AdminLayout";
import ErorrPage from "../Pages/ErorrPage";

export function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLogin />,
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErorrPage />, // Catch top-level errors
    children: [
      {
        path: "/",
        element: <AdminLayout />,
        children: [
          { path: "dashboardAdmin", element: <DashboardAdmin /> },
          { path: "NewsForm", element: <AddNews /> },
          { path: "NewsEdit/:id", element: <EditNews /> },
          { path: "ArchivedNews", element: <Archivednews /> },
        ],
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
