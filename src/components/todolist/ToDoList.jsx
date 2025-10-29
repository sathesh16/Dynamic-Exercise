import React, { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([
    { name: "Eat", category: "Personal" },
    { name: "Sleep", category: "Personal" },
    { name: "Repeat", category: "Work" },
  ]);

  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("");

  // Add task with category
  function addTask() {
    if (newTask.trim() === "" || category.trim() === "") return;

    setTasks([...tasks, { name: newTask, category }]);
    setNewTask("");
    setCategory("");
  }

  // Remove task
  function removeTask(index) {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  }

  return (
    <div className="todo-list-ctn" style={{ maxWidth: "400px", margin: "auto" }}>
      <h1>Todo List</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter your task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="">Select Category</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
        </select>

        <button className="add-btn" onClick={addTask}>
          Add
        </button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span>
              <strong>{task.name}</strong> — <em>{task.category}</em>
            </span>
            <button className="remove-btn" onClick={() => removeTask(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
