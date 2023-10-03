import React, { useState, useEffect } from "react";
import "./TodoList.css";

const TodoList = () => {
  const [inputTask, setInputTask] = useState("");

  let A = JSON.parse(localStorage.getItem("list")) || [];
  const [list, setList] = useState(A);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("list"));
    if (data) {
      setList(data);
    }
  }, []);

  const handleAddTodo = () => {
    if (inputTask.trim() === "") return; // Prevent adding empty tasks
    const newTask = { id: Math.random(), todo: inputTask };
    setList((prevList) => [...prevList, newTask]); // Use functional update for lists
    setInputTask("");
  };

  const handleDeleteTodo = (id) => {
    setList((prevList) => prevList.filter((B) => B.id !== id)); // Use functional update for lists
  };

  const handleInputChange = (event) => {
    setInputTask(event.target.value);
  };

  return (
    <div className="Todo">
      <h1>My To-Do List</h1>
      <div className="Top">
        <input
          className="input"
          type="text"
          value={inputTask}
          onChange={handleInputChange}
          placeholder="Enter a task"
        />
        <button className="btn" onClick={handleAddTodo}>
          ADD
        </button>
      </div>
      <ul>
        {list.map((todo) => (
          <li className="task" key={todo.id}>
            {todo.todo}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
