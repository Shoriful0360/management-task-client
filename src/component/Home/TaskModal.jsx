
import  { useState } from "react";
const TaskModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "pending",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
       console.log('hai')
        onClose(); // Close modal after submission
      };
    return (
        <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">Create Task</h3>
  
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Title Input */}
            <div>
              <label className="label"><span className="label-text">Title</span></label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                className="input input-bordered w-full"
                required
              />
            </div>
  
            {/* Description Textarea */}
            <div>
              <label className="label"><span className="label-text">Description</span></label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="textarea textarea-bordered w-full"
                required
              />
            </div>
  
            {/* Status Select Dropdown */}
            <div>
              <label className="label"><span className="label-text">Status</span></label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
  
            {/* Buttons */}
            <div className="modal-action">
              <button  className="btn btn-outline" onMouseDown={onClose} >Cancel</button>
              <button type="submit"  className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default TaskModal;