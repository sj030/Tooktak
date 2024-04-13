import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import RootLayout from "../components/RootLayout";
export default function Root() {
  return <RootLayout left={<Navigation />} right={<Outlet />} />;
}
