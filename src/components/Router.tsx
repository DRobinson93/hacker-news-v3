import Home from "./../screens/Home";
import VersionFour from "./../screens/VersionFour";
import About from "./../screens/About";
import PageNotFound from "./../screens/PageNotFound";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Home/> },
  { path: "/v4", element: <VersionFour/> },
  { path: "/about", element: <About/> },
  //handle 404s
  { path:'*', element:<PageNotFound/> }
]);

export default function Router() {
    return (
        <RouterProvider router={router} />
    );
}