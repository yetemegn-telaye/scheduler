import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import gsap from 'gsap';
import { deleteTask } from '../redux/action';
import { Task } from '../interfaces/common';

interface TaskCardProps {
  task: Task;
  index: number;
  date: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  const dispatch = useDispatch();
  const cardRef = useRef<HTMLDivElement>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ taskId: task.id, index }));
  };

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleDeleteTask = (taskId: number) => {
    setShowConfirm(false); // Close the confirmation dialog
    // Proceed with the deletion animation and logic
    gsap.to(cardRef.current, {
      duration: 0.3,
      opacity: 0,
      x: 100,
      onComplete: () => {
        dispatch(deleteTask(taskId));
      },
    });
  };

  return (
    <>
      <div ref={cardRef} draggable="true" onDragStart={handleDragStart} className="task-card bg-white rounded-lg shadow-lg p-4 mb-4 relative overflow-hidden cursor-move">
        <div className="flex justify-between items-start mb-2">
          <div className="flex space-x-1">
            {task.labels.map((label) => (
              <span key={label.id} title={label.text} className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: label.color }}></span>
            ))}
          </div>
          <button onClick={handleDeleteClick} className="text-red-500 hover:text-red-600 absolute top-2 right-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="text-gray-800 text-sm focus:outline-none" suppressContentEditableWarning={true}>
          {task.title}
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                {/* Warning Icon or Image */}
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Task</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this task? This action cannot be undone.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button id="delete-button" className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-24 shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </button>
                <button id="cancel-button" className="mx-4 px-4 py-2 bg-white text-red-500 text-base font-medium rounded-md w-24 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        onClick={() => setShowConfirm(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
