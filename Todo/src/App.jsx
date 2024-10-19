import { useState } from "react";
import "./App.css";
import EditModal from "./components/EditModal";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editInput, setEditInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const addTodo = () => {
    // Ensure no whitespaces before adding
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput("");
    }
  };

  const editTodo = (index) => {
    setEditInput(todos[index]);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const updateTodo = () => {
    if (editIndex !== null && editInput.trim()) {
      const updatedTodos = todos.map(
        (todo, index) => (index === editIndex ? editInput : todo) // Update the todo at editIndex
      );
      setTodos(updatedTodos);
      setEditInput("");
      setEditIndex(null); // Reset editIndex after updating
      setIsModalOpen(false);
    }
  };

  const removeTodo = (index) => {
    // Keep all items except the one with the passed index
    const newTodos = todos.filter((todo, i) => i !== index);
    setTodos(newTodos);
  };

  // Filter todos based on search term
  const filteredTodos = todos.filter((todo) =>
    todo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold">Todo List</h1>
      {/* Search input */}
      <input
        value={searchTerm}
        placeholder="Search Tasks"
        className="bg-gray-200 p-3 m-2 w-full"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Input for adding new task */}
      <input
        value={input}
        placeholder="Add new Task"
        className="bg-gray-200 p-3 m-2 w-full"
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        className="bg-gray-800 p-2 rounded-xl text-white"
        onClick={addTodo}
      >
        Add Task
      </button>

      <ul>
        {filteredTodos.map((todo, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-100 p-2 m-2 rounded-md shadow-sm"
          >
            <span className="flex-1">{todo}</span>
            <div className="flex gap-2">
              {/* gap 2 is used for the 2 buttons edit and delete for spacing purpose */}
              <button
                className="bg-violet-500 text-white rounded-md p-2 m-2"
                onClick={() => editTodo(index)}
              >
                Edit
              </button>
              {/* Delete button to remove a task */}
              <button
                className="bg-red-400 rounded-md p-2 m-2"
                onClick={() => removeTodo(index)}
              >
                Delete
              </button>
            </div>
            {/*
                Not using onClick={removeTodo()} because in arrow fn method will be called
                after the button is clicked and not immediately when component renders.
                If we directly call the function without an arrow, it will execute
                immediately after the component renders instead of on the button click.
             */}
          </li>
        ))}
      </ul>

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        input={editInput}
        setInput={setEditInput}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default App;
