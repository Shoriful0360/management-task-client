import { DragDropContext } from 'react-beautiful-dnd';
import  { useState, useEffect } from 'react';

import axios from 'axios';
import TaskList from "./TaskList";

const Tasktodo = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      fetchTasks();
    }, []);
  
    const fetchTasks = async () => {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    };
  
    const onDragEnd = async (result) => {
      const { destination, source, draggableId } = result;
  
      if (!destination) return;
  
      if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return;
      }
  
      const updatedTasks = Array.from(tasks);
      const [movedTask] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, movedTask);
  
      setTasks(updatedTasks);
  
      // Update task status in the database
      await axios.put(`/api/tasks/${draggableId}`, {
        status: destination.droppableId,
      });
    };
  
    const groupedTasks = {
    //   todo: tasks?.filter(task => task.status === 'todo'),
    //   'in-progress': tasks?.filter(task => task.status === 'in-progress'),
    //   done: tasks?.filter(task => task.status === 'done'),
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-around p-4">
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <TaskList key={status} tasks={tasks} status={status} />
          ))}
        </div>
      </DragDropContext>
    );
};

export default Tasktodo;