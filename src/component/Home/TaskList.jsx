

import { Droppable, Draggable } from 'react-beautiful-dnd';

import TaskBoard from '../TaskBoard';
const TaskList = ({ tasks, status }) => {
    return (
        <Droppable droppableId={status}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="bg-gray-100 p-4 rounded-lg w-64"
          >
            <h2 className="font-bold mb-4">{status.toUpperCase()}</h2>
            {tasks?.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskBoard task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
};

export default TaskList;