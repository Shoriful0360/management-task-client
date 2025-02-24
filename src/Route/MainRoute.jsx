import { Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import Home from "../page/Home/Home";
import Login from "../page/authentication/Login";

import SignUp from "../page/authentication/SignUp";
import AddTask from "../component/AddTask";
import Task from "../page/Task";
import AuthPrivate from "../Private/AuthPrivate";


const MainRoute = () => {
    return (
        <>
   
       
          <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home></Home>}></Route>
                <Route path="/add-task" element={
                    <AuthPrivate>
                        <AddTask/>
                    </AuthPrivate>
                }></Route>
                <Route path="/my-task" element={<Task/>}></Route>
            </Route>
           
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signin" element={<SignUp/>}></Route>
            
            </Routes>  
        </>
    );
};

export default MainRoute;