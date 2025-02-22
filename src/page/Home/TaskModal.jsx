import { useState } from "react";

const TaskModal = ({ onClose, onTaskCreated }) => {
    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onTaskCreated({ id: Date.now().toString(), title, status: "todo" });
        onClose();
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded">
                <h2 className="text-xl">Create Task</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" className="border p-2 w-full my-2" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
                    <button onClick={onClose} className="ml-2 text-red-500">Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;