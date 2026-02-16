import { useEffect, useState } from "react";

function App() {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("ALL"); // ALL | DONE | PENDING

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      text: task,
      done: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((t, i) => i !== index));
  };

  const toggleDone = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, done: !t.done } : t
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "DONE") return t.done;
    if (filter === "PENDING") return !t.done;
    return true;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Task Tracker</h2>

        {/* Input + Add */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <button
            onClick={addTask}
            style={{
              padding: "10px 15px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#007bff",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Add
          </button>
        </div>

        {/* Filter Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <button
            onClick={() => setFilter("ALL")}
            style={{
              flex: 1,
              marginRight: "5px",
              padding: "8px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              backgroundColor: filter === "ALL" ? "#28a745" : "#ccc",
              color: "white",
            }}
          >
            All
          </button>

          <button
            onClick={() => setFilter("DONE")}
            style={{
              flex: 1,
              marginRight: "5px",
              padding: "8px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              backgroundColor: filter === "DONE" ? "#28a745" : "#ccc",
              color: "white",
            }}
          >
            Done
          </button>

          <button
            onClick={() => setFilter("PENDING")}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              backgroundColor: filter === "PENDING" ? "#28a745" : "#ccc",
              color: "white",
            }}
          >
            Pending
          </button>
        </div>

        {/* Task List */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredTasks.length === 0 ? (
            <p style={{ textAlign: "center", color: "gray" }}>
              No tasks found.
            </p>
          ) : (
            filteredTasks.map((t, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => toggleDone(index)}
                  />

                  <span
                    style={{
                      textDecoration: t.done ? "line-through" : "none",
                      color: t.done ? "gray" : "black",
                    }}
                  >
                    {t.text}
                  </span>
                </div>

                <button
                  onClick={() => deleteTask(index)}
                  style={{
                    border: "none",
                    backgroundColor: "red",
                    color: "white",
                    padding: "6px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
