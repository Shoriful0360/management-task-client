import { useDraggable } from "@dnd-kit/core";
import { FaArrowsTurnToDots } from "react-icons/fa6";
import { GrInProgress } from "react-icons/gr";
import { IoMdDoneAll } from "react-icons/io";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import TaskModal from "./TaskModal";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
const TaskCard = ({ item, deleteHandler,refetch }) => {

  const{_id,title,description,status}=item || {}
  const [isOpen, setIsOpen] = useState(false);
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: item._id,
       
      });

      const formatDateTime = (time) => {
        const date = new Date(time);
    
        // Extract date in YYYY-MM-DD format
        const formattedDate = date.toISOString().split("T")[0];
    
        // Format time in 12-hour format with AM/PM
        const options = { hour: "2-digit", minute: "2-digit", hour12: true };
        const formattedTime = date.toLocaleTimeString("en-US", options);
    
        return `${formattedDate}, ${formattedTime}`;
      };

      const updateData = async (userId, updatedData) => {
       const {textInput,textArea,selectedOption}=updatedData || {}
     const updateDoc={
      title:textInput,
      description:textArea,
      status:selectedOption
     }
     try{
      await axios.patch(`${import.meta.env.VITE_URL}/tasks-update/${_id}`,updateDoc)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1000
      });
      refetch()
     }catch(err){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
        timer: 1000
      });
     }
     
      };

   const handleEdit=async()=>{
    const { value: formValues } = await Swal.fire({
      title: "Edit Your Details",
      html: `
        <input id="swal-input" class="swal2-input custom-input" value="${title}">
        <textarea id="swal-textarea" class="swal2-textarea custom-input">${description}</textarea>
        <select id="swal-select" class="swal2-select custom-input">
          <option value="To-Do" ${status === "To-Do" ? "selected" : ""}>To-Do</option>
          <option value="In Progress" ${status === "In Progress" ? "selected" : ""}>In Progress</option>
          <option value="Done" ${status=== "Done" ? "selected" : ""}>Done</option>
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Save Changes",
      didOpen: () => {
        document.querySelectorAll(".custom-input").forEach((el) => {
          el.style.width = "90%";
         
        });
      },
      preConfirm: () => {
        return {
          textInput: document.getElementById("swal-input").value,
          textArea: document.getElementById("swal-textarea").value,
          selectedOption: document.getElementById("swal-select").value,
        };
      },
   
    });
  
    if (formValues) {
      await updateData(_id, formValues)
      Swal.fire(`
        <strong>Text Input:</strong> ${formValues.textInput} <br/>
        <strong>Message:</strong> ${formValues.textArea} <br/>
        <strong>Selected Option:</strong> ${formValues.selectedOption}
      `);
    }
   }
    return (
        <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="p-4 flex justify-between items-center bg-white rounded-md shadow-md "
        style={{
          transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : "none",
        }}
      >
        <div className="w-11/12 pr-4 cursor-move">
          <h1 className="font-bold">{item.title}</h1>
          <p className="text-gray-600 text-sm">{item?.description}</p>
          <div className="flex mt-3 justify-between items-center">
            <p
              className={`${item?.status === "To-Do" && "text-blue-800"} ${
                item?.status === "In Progress" && "text-orange-800"
              } ${item?.status === "Done" && "text-green-800"} font-semibold`}
            >
              {item?.status}
            </p>
            <p className="">
            {formatDateTime(item?.time)}
            </p>
          </div>
        </div>
        <div className="w-1/12 flex flex-col justify-between gap-6">

          <button
            className={`${item?.status === "To Do" && "text-blue-800"} ${
              item?.status === "In Progress" && "text-orange-800"
            } ${item?.status === "Done" && "text-green-800"} text-xl`}
          >
            {item?.status === "To Do" && <FaArrowsTurnToDots />}
            {item?.status === "In Progress" && <GrInProgress />}
            {item?.status === "Done" && <IoMdDoneAll />}
          </button>
          <button onMouseUp={handleEdit}  >
           
          <FaRegEdit />
          </button>
          <button
             onMouseUp={() => deleteHandler(item?._id)}
            style={{ pointerEvents: "auto" }}
            className=" cursor-pointer text-red-600 text-xl"
          >
            <RiDeleteBinFill />
          </button>
        </div>
    
        {isOpen && <TaskModal isOpen={isOpen} onClose={()=>setIsOpen(false)} />}
      </div>
    );
};

export default TaskCard;