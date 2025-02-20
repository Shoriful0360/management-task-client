import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";


const Layout = () => {
    return (
        <div>
         <header>
         <Navbar/>
         </header>
        <main >
      <div className="min-h-[calc(100vh-260px)] bg-[#5C8BCE]">
      <Outlet></Outlet>
      </div>
        </main>
        <footer>
            <Footer/>
        </footer>
        </div>
    );
};

export default Layout;