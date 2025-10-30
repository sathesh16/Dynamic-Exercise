import React, { useState } from "react";

function ToDoList() {
  // Initial tasks
  const [tasks, setTasks] = useState([
    { name: "Eat", category: "Personal", completed: false },
    { name: "Sleep", category: "Personal", completed: false },
    { name: "Repeat", category: "Work", completed: false },
  ]);

  // Initial categories
  const [categories, setCategories] = useState(["Work", "Personal", "Study"]);

  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");

  // Add a new category dynamically
  function addCategory() {

    setCategories([...categories, newCategory]);

    setNewCategory("");
  }

  // Add a new task
  function addTask() {
    setTasks([...tasks, { name: newTask, category, completed: false }]);
    setNewTask("");
    setCategory("");
  }

  // Remove a task
  function removeTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  // Toggle completion status
  function toggleComplete(index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task   //when iterator match index spread task and change completed 
    );
    setTasks(updatedTasks);
  }

  return (
    <div className="todo-list-ctn" style={{ maxWidth: "400px", margin: "auto" }}>
      <h1>Todo List</h1>

      {/*  Add New Category */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={addCategory}>Add Category</button>
      </div>

      {/*  Add New Task */}
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
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button onClick={addTask}>Add Task</button>
      </div>



      {/* Task List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            <span>
              <strong>{task.name}</strong> — <em>{task.category}</em>
            </span>

            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => toggleComplete(index)}>
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => removeTask(index)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
