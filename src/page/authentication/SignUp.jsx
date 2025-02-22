import Lottie from "lottie-react";
import Register_animate from '../../assets/signin/Animation - 1740064651761.json'
import { Link, useNavigate } from "react-router-dom";
import { GoEye } from "react-icons/go";
import { IoEyeOffOutline } from "react-icons/io5";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";


const SignUp = () => {
    const [visible,setVisible]=useState(false)
    const navigate=useNavigate()
    const {createUser,setUser,googleLogin,profileUpdate}=useContext(AuthContext)

    const handleFormSubmit=async(e)=>{
        e.preventDefault()
        const form=e.target;
        const name=form.name.value;
        const email=form.email.value;
        const photoUrl=form.photoUrl.value;
        const password=form.password.value;
        const checkbox=e.target.terms.checked;
    //  console.log(name,email,password,photoUrl)
     const strongPassword=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/; 
     if (password.length < 6) {
        toast.error('password atleast 6 character')
        return;
      }
      if(!strongPassword.test(password)){
        toast.error('at least  one uppercase,one lowercase,one number and on special simble')
        return;
      }
      if(!checkbox){
        toast.error('check terms and conditon')
        return;
      }  
      try{
        const result=await createUser(email,password)

       await profileUpdate(name,photoUrl)
      setUser({...result?.user, displayName:name,photoURL:photoUrl})
      toast.success('Signup is successfuylly')
      form.reset()
      navigate('/')
      }catch {
        // console.log(err)
      }
    
    
    
      }

    //   login with google
    const handleGoogle=async()=>{
        try{
         const {user}=await googleLogin()
         setUser(user)
         toast.success('login is successfully')
         navigate(location?.state?location?.state :'/')
        }
        catch{
        toast.error('something is wrong')
        }
            }
    return (
        <div className="mt-10">
        <h1 className="text-center text-4xl font-bold">Register Now</h1>
        <div className="hero mt-10 ">
    <h1 className="text-red-800">heool</h1>
<div className="hero-content flex-col lg:flex-row-reverse">

<div className=" lg:text-left ">
 
 <Lottie className="w-80" animationData={Register_animate}></Lottie>
</div>

<div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
<form onSubmit={handleFormSubmit} className="card-body">
                <h1 className="text-2xl font-bold  text-center">Rigister Now!</h1>
                <div className="divider"></div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name="name" placeholder="Enter your name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="url" name="photoUrl" placeholder="Enter your photo URL" className="input input-bordered"  />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <div className='absolute right-2 top-[35px] cursor-pointer'>
                    {
                visible ? <div onClick={()=>setVisible(false)}>  <GoEye></GoEye></div> :<div onClick={()=>setVisible(true)}><IoEyeOffOutline></IoEyeOffOutline> </div>
              }
                    </div>
                    <input type={visible?'text':'password'} name="password" placeholder="password" className="input input-bordered" required />

                </div>
                <div className=" ">
                    <label className=" flex gap-2 items-center  cursor-pointer">
                        <input type="checkbox" name="terms"  className="checkbox checkbox-primary" />
                        <span className="label-text text-lg">Accept <small className="text-neutral-500 text-lg">Terms $ Conditions</small> </span>
                    </label>
                </div>
             
                <div className="form-control mt-6">
                    <button className="btn text-lg bg-neutral-600 text-white">Register</button>
                </div>
              
            </form>
  <div className='my-4 mx-4'>
    <h1>Already have an account? <Link to={'/login'}><span className='text-blue-400 text-xl font-semibold'>LogIn</span></Link></h1>
  </div>
    <div className="divider">Log in with Google</div>
    <div className='flex justify-center'>
      <FcGoogle onClick={handleGoogle} className='text-5xl hover:cursor-pointer'/>
    </div>
</div>
</div>
</div>
      </div>
    );
};

export default SignUp;