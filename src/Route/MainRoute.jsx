import { Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import Home from "../page/Home/Home";
import Login from "../page/authentication/Login";
import SignIn from "../page/authentication/SignIn";


const MainRoute = () => {
    return (
        <>
       
          <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home></Home>}></Route>
            </Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signin" element={<SignIn/>}></Route>
            
            </Routes>  
        </>
    );
};

export default MainRoute;