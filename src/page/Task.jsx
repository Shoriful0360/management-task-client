import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



const Task = () => {
 const formSubmit=(e)=>{
e.preventDefault()
const text=e.target.task.value;
console.log(text)
 }
    return (
       <div className="mt-10">
         <div className="card mx-4  bg-neutral text-neutral-content w-96">
  <div className="card-body ">
  <h1 className="text-2xl font-bold">Task</h1> 
  <form onSubmit={formSubmit} >
  <input type="text" name="task" placeholder="write your task" className="input text-black" />
  <button type="submit" className="bg-[#32CD32] btn w-full text-white">Add Task</button>
  </form>
    <div className="bg-amber-400 flex">
    <p className=" py-3 px-2" >We are using cookies for no reason.</p>
   <div className="flex items-center">
   <button className="text-xl"><FaEdit /></button>
   <button className="text-xl"><MdDelete /></button>
   </div>
    </div>
 
  </div>

</div>

       </div>

       
    );
};

export default Task;