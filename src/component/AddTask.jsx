import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from 'axios'
import toast from "react-hot-toast";
const AddTask = () => {


    const{user}=useContext(AuthContext)
    const formSubmit=async(e)=>{
        e.preventDefault()
        const title=e.target.title.value;
        const description=e.target.description.value;
        const status=e.target.select.value;
       const email=user?.email
       const time=new Date()
       const formInfo={title,description,email,status,time}
  
       try{
     axios.post(`${import.meta.env.VITE_URL}/tasks`,formInfo)
     toast.success('Successfull')
     e.target.reset()
       }catch (err){
console.log(err)
       }
         }

         const handleTitle=(e)=>{
           
            const value=e.target.value
            if(value.length>50){
                // setText(true)
                return alert('You write max 50 character ')
               }
             
         }
         const handleDes=(e)=>{
           
            const value=e.target.value
            if(value.length>200){
                // setText(true)
                return alert('You write max 200 character ')
               }
             
         }
    return (
          <div className="mt-10">
             <h1 className="text-2xl font-bold text-white underline text-center my-4 ">Task</h1> 
       <div className="lg:w-8/12 mx-auto">
       <form className="space-y-2"  onSubmit={formSubmit} >
        <input onChange={handleTitle} type="text"  name="title" placeholder="Enter Your Task Title" className="input text-black w-full" required />

        <textarea className="textarea w-full textarea-bordered" onChange={handleDes} required name="description" placeholder="Enter Your Task Description"></textarea>
     
        <select name="select" required className="select select-bordered w-full ">
  <option disabled selected>select task</option>
  <option>To-Do</option>
  <option>In Progress</option>
  <option>Done</option>
</select>
        <button type="submit" className="bg-[#32CD32] btn w-full text-white">Add Task</button>
        </form>
       </div>
          </div>
    );
};

export default AddTask;