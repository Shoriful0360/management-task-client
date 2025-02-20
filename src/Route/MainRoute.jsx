import { Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import Home from "../page/Home/Home";


const MainRoute = () => {
    return (
        <>
       
          <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home></Home>}></Route>
            </Route>
            
            </Routes>  
        </>
    );
};

export default MainRoute;