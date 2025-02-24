import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../shared/Loading";
import { Navigate, replace, useLocation } from "react-router";


const AuthPrivate = ({children}) => {
    const location=useLocation()
    const {user,loading}=useContext(AuthContext)
    if(loading) return <Loading/>
    if(user) return children
    return (
        <div>
            <Navigate to={'/login'} state={{from:location}} replace='true'></Navigate>
        </div>
    );
};

export default AuthPrivate;