import Home from "./../screens/Home";
import LimitedExample from "./../screens/LimitedExample";
import PageNotFound from "./../screens/PageNotFound";
import {
  createBrowserRouter,
  RouterProvider, 
  RouteObject
} from "react-router-dom";

const routeObj : RouteObject[] = [
  { path: "/", element: <Home/> },
  //handle 404s
  { path:'*', element:<PageNotFound/> }
];

//these screens just show a screen explaining this is a code example 
//and the code is limited to just show the home screen in display mode
const limitedExampleScreenPaths : string[] = ['/new', '/comment', '/ask'];
limitedExampleScreenPaths.forEach(path => {
  routeObj.push({
    path, 
    element:<LimitedExample/>
  })
});

const router = createBrowserRouter(routeObj);

export default function Router() {
    return (
        <RouterProvider router={router} />
    );
}