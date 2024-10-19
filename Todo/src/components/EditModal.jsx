import React, { useState, useEffect } from "react";

const EditModal = ({ isOpen, onClose, initialInput, updateTodo }) => {
  const [editInput, setEditInput] = useState("");

  // Set initial input value when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setEditInput(initialInput);
    }
  }, [isOpen, initialInput]);

  // Use the `isOpen &&` pattern for conditional rendering
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl text-white font-bold">Edit Task</h2>
          <input
            value={editInput}
            className="bg-gray-200 p-2 rounded-sm mt-2 mb-2 w-full"
            onChange={(e) => setEditInput(e.target.value)} // Update local state
          />
          <div className="flex justify-end">
            <button
              className="bg-green-500 text-white rounded-md p-2 mr-1"
              onClick={() => updateTodo(editInput)} // Pass updated value to updateTodo
            >
              Save
            </button>
            <button
              className="bg-red-400 text-white rounded-md p-2"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditModal;
