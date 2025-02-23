import { useDraggable } from "@dnd-kit/core";
import { FaArrowsTurnToDots } from "react-icons/fa6";
import { GrInProgress } from "react-icons/gr";
import { IoMdDoneAll } from "react-icons/io";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import TaskModal from "./TaskModal";
import { useState } from "react";
const TaskCard = ({ item, deleteHandler }) => {
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
          <button onMouseUp={()=>setIsOpen(true)}  >
           
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