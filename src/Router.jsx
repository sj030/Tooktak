import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import Search from "./pages/SearchPage";
import Admin from "./pages/AdminPage";
import Login from "./pages/LoginPage";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Upload from "./pages/UploadPage";
import LogPage from "./pages/LogPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root/>}>
            <Route path="login" element={<Login/>} errorElement={<ErrorPage/>}/>
            <Route path="search" element={<Search/>} errorElement={<ErrorPage/>}/>
            <Route path="upload" element={<Upload/>} errorElement={<ErrorPage/>}/>
            <Route path="account" element={<Admin/>} errorElement={<ErrorPage/>}/>
            <Route path="log" element={<LogPage/>} errorElement={<ErrorPage/>}/>
        </Route>
    )
);

export default function Router() {
    return <RouterProvider router={router}/>;
}
