import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Search from "./pages/Search";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Root from "./pages/Root";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="login" element={<Login />} errorElement={<ErrorPage />} />
      <Route path="search" element={<Search />} errorElement={<ErrorPage />} />
      <Route path="admin" element={<Admin />} errorElement={<ErrorPage />} />
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
