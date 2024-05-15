import {Outlet} from "react-router-dom";
import Navigation from "../components/service/Navigation";
import {useState} from "react";
import {useMode} from "../contexts/AuthContext";
import Layout from "../components/layout/Layout";

export default function Root() {
    const mode = useMode();
    const [hideLeft, setHideLeft] = useState(false);
    const toggleHideLeft = () => setHideLeft(!hideLeft);
    return <Layout left={<Navigation/>}
                   hideLeft={mode === null || hideLeft}
                   toggleHideLeft={toggleHideLeft}
                   right={<Outlet/>}
                   ratio={[3, 9]}
    />;
}