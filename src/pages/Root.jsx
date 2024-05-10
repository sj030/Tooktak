import {Outlet} from "react-router-dom";
import Navigation from "../components/service/Navigation";
import Layout from "../components/layout/./Layout";

export default function Root() {
    return <Layout left={<Navigation/>} right={
        <section className="hero has-background-light	 is-fullheight ">
        <Outlet/>
        </section>
    } ratio={[3, 9]}/>;
}