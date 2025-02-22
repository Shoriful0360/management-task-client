import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Loading from "../shared/Loading";
import TaskCard from "../component/Home/TaskCard";
import TaskColumn from "../component/TaskColumn";
import { closestCenter, DndContext } from "@dnd-kit/core";
import Swal from 'sweetalert2';


const Task = () => {
const {user,loading}=useContext(AuthContext)
const {data:taskData,isLoading,refetch}=useQuery({
  queryKey:['task'],
  enabled:!loading,
 
  queryFn:async()=>{
    const {data}=await axios.get(`${import.meta.env.VITE_URL}/tasks?email=${user?.email}`)
    return data
  }
})


// category task
const todo=taskData?.filter(item=>item.status==='To-Do')
const InProgress=taskData?.filter(item=>item.status==='In Progress')
const done=taskData?.filter(item=>item.status==='Done')
console.log(InProgress)
if(isLoading) return <Loading/>
// Handle Drag End
const handleDragEnd = async (event) => {
  const { active, over } = event;
  if (!over) return;

  const draggedTask = taskData.find((task) => task._id === active.id);
  if (!draggedTask) return;

  const newStatus =
    over.id === "to-do"
      ? "To Do"
      : over.id === "in-progress"
      ? "In Progress"
      : "Done";

  if (draggedTask.status !== newStatus) {
    try {
      await axios.patch(`${import.meta.env.VITE_URL}/task/${draggedTask._id}`, {
        status: newStatus,
      });
      refetch();
    } catch (err) {
      Swal.fire(`${err.message}`);
    }
  }
};

const deleteHandler = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await axios.delete(`${import.meta.env.VITE_URL}/task/${id}`);
      refetch();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
};
    return (
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="min-h-[90vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 justify-center gap-6">
        <TaskColumn id="to-do" title="To Do" color="bg-blue-100">
          {!todo?.length  ? (
            <h1 className="text-xl font-semibold text-center">No Task Found! Please Add</h1>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {todo?.map((item) => (
                <TaskCard
                  key={item._id}
                  item={item}
                  deleteHandler={deleteHandler}
                />
              ))}
            </div>
          )}
        </TaskColumn>
        <TaskColumn id="in-progress" title="In Progress" color="bg-orange-50">
        {InProgress?.length === 0 ? (
            <h1 className="text-xl font-semibold text-center">No Task Found! Plz Drag & Drop</h1>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {InProgress?.map((item) => (
                <TaskCard
                  key={item._id}
                  item={item}
                  deleteHandler={deleteHandler}
                />
              ))}
            </div>
          )}
        </TaskColumn>
        <TaskColumn id="done" title="Done" color="bg-green-100">
        {done?.length === 0 ? (
            <h1 className="text-xl font-semibold text-center">No Task Found! Drag & Drop</h1>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {done?.map((item) => (
                <TaskCard
                  key={item._id}
                  item={item}
                  deleteHandler={deleteHandler}
                />
              ))}
            </div>
          )}
        </TaskColumn>

        
     
      </div>
    </DndContext>

       
    );
};

export default Task;