import { useState } from "react";
import "./App.css";
import EditModal from "./components/EditModal";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const addTodo = () => {
    // ensure no whitespaces
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput("");
    }
  };

  const editTodo = (index) => {
    setInput(todos[index]);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const updateTodo = () => {
    if (editIndex !== null && input.trim()) {
      const updatedTodos = todos.map(
        (todo, index) => (index === editIndex ? input : todo) // Update the todo at editIndex
      );
      setTodos(updatedTodos);
      setInput("");
      setEditIndex(null); // Reset editIndex after updating
      setIsModalOpen(false);
    }
  };

  const removeTodo = (index) => {
    // Keep all items except the one with the passed index
    const newTodos = todos.filter((todo, i) => i !== index);
    setTodos(newTodos);
  };

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

      {editIndex === null ? ( // Check if we're in edit mode
        <button
          className="bg-gray-800 p-2 rounded-xl text-white"
          onClick={addTodo} // Add new todo
        >
          Add Task
        </button>
      ) : (
        <button
          className="bg-gray-800 p-2 rounded-xl text-white"
          onClick={updateTodo} // Update existing todo
        >
          Update Task
        </button>
      )}

      <ul>
        {filteredTodos.map((todo, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-100 p-2 m-2 rounded-md shadow-sm"
          >
            <span className="flex-1">{todo}</span>
            <div className="flex gap-2">
              {/* gap 2 is used for the 2 buttons edit and delete for spacing */}
              <button
                className="bg-violet-500 text-white rounded-md p-2 m-2"
                onClick={() => editTodo(index)} // Call editTodo with the index
              >
                Edit
              </button>
              <button
                className="bg-red-400 rounded-md p-2 m-2"
                onClick={() => removeTodo(index)}
              >
                Delete
              </button>
            </div>
            {/*
                Not using onClick={removeTodo()} because in arrow fn method will be called
                after the button is clicked and not immediately when component renders
                but if we directly call on fn without arrow it will call function immediately
                after component renders and not on button click
             */}
          </li>
        ))}
      </ul>

      {/* <ul>
        {filteredTodos.map((todo, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-100 p-2 m-2 rounded-md shadow-sm"
          >
            <span className="flex-1">{todo}</span>
            <div className="flex gap-2">
              <button
                className="bg-violet-500 text-white rounded-md p-2"
                onClick={() => editTodo(index)}
              >
                Edit
              </button>
              <button
                className="bg-red-400 text-white rounded-md p-2"
                onClick={() => removeTodo(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul> */}

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        input={input}
        setInput={setInput}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default App;
