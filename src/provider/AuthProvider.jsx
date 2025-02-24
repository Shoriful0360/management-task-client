import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";



export const AuthContext=createContext('')

const AuthProvider = ({children}) => {
    const provider=new GoogleAuthProvider()
    const [loading,setLoading]=useState(true)
    const [user,setUser]=useState('')

    // user create
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    // logout user
    const logOut=()=>{
        return signOut(auth)
    }  

    // login with email and passwore
 
const loginUser=(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
}


// login with google
const googleLogin=()=>{
    setLoading(true)
return signInWithPopup(auth,provider)

}

// update user profile
const updateUserProfile=(name,photoUrl)=>{

    return updateProfile(auth.currentUser,{
        displayName:name,photoURL:photoUrl
    })
}

// forget  password
const forgetPassword=(email)=>{
    setLoading(true)
return sendPasswordResetEmail(auth,email)
}
    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth,async (currentUser)=>{
            setUser(currentUser)
            setLoading(false)
         
          
        })
        return()=>{
            unSubscribe()
        }
    },[])
    const info={
        createUser,forgetPassword,user,setUser,logOut,loginUser,googleLogin,updateUserProfile,loading
    }
    return (
        <div>
             <AuthContext.Provider value={info}>
            {children}
            </AuthContext.Provider>   
        </div>
    );
};

export default AuthProvider;