import React from "react";

const EditModal = ({ isOpen, onClose, input, setInput, updateTodo }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold">Edit Task</h2>
        <input
          value={input}
          className="bg-gray-200 p-3 m-2 w-full"
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-green-500 text-white rounded-md p-2 m-2"
            onClick={updateTodo}
          >
            Save
          </button>
          <button
            className="bg-red-400 text-white rounded-md p-2 m-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
