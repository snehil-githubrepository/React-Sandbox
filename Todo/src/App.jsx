import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    // ensure no whitespaces
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput("");
    }
  };

  const removeTodo = (index) => {
    // Keep all items except the one with the passed index
    const newTodos = todos.filter((todo, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Todo List</h1>
      <input
        value={input}
        placeholder="Add new Task"
        className="bg-gray-200 p-3 m-2"
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-gray-800 p-2 rounded-xl text-white"
        onClick={addTodo}
      >
        Add Task
      </button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button
              className="bg-red-400 rounded-md p-2 m-2"
              onClick={() => removeTodo(index)}
            >
              Delete
            </button>
            {/*
                Not using onClick={removeTodo()} because in arrow fn method will be called
                after the button is clicked and not immediately when component renders
                but if we directly call on fn without arrow it will call function immediately
                after component renders and not on button click
             */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
