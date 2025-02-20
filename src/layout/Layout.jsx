import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";


const Layout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet></Outlet>
        </div>
    );
};

export default Layout;