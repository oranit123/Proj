import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";

export default function AddTasks() {
  const { state } = useLocation();
  const [task, setTask] = useState({});
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    const allCategories = JSON.parse(localStorage.getItem('categories')) || [];
    const filteredCategories = allCategories.filter(cat => cat.createdBy === currentUser.id);
    setCategories(filteredCategories);
  }, []);

  function saveTasks(event) {
    event.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

    if (
      !task.nameTasks ||
      !task.Categoory ||
      !task.details ||
      !task.datefinist
    ) {
      setSnackbarMessage("Please fill in all the task details");
      setSnackbarOpen(true);
      return;
    }

    const taskDate = new Date(task.datefinist);
    const currentDate = new Date();

    if (taskDate < currentDate) {
      setSnackbarMessage("Task date cannot be in the past");
      setSnackbarOpen(true);
      return;
    }

    const taskWithCreatedBy = {
      ...task,
      createdBy: currentUser.id
    };
    
    state.tasks.push(taskWithCreatedBy); 
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
    
    setSnackbarMessage("Task added successfully");
    setSnackbarOpen(true);
    setTask({
      nameTasks: "",
      Categoory: "",
      details: "",
      datefinist: "",
    });

    navigate("/MyTasks");
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <div className="add-tasks-container">
      <div className="add-tasks-form-wrapper">
        <h1 className="add-tasks-title">Add New Task</h1>
        <form onSubmit={saveTasks}>
          <div>
            <input
              type="text"
              placeholder="Task Name"
              value={task.nameTasks || ""}
              onChange={(event) =>
                setTask({ ...task, nameTasks: event.target.value })
              }
              className="add-tasks-input-field"
            />
          </div>
          <div>
            <select
              value={task.Categoory || ""}
              onChange={(event) =>
                setTask({ ...task, Categoory: event.target.value })
              }
              className="add-tasks-input-field"
            >
              <option value="">Select a category</option>
              {categories.map((category, index) => (
                <option key={index} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <textarea
              placeholder="Short Description"
              value={task.details || ""}
              onChange={(event) =>
                setTask({ ...task, details: event.target.value })
              }
              className="add-tasks-input-field"
              style={{ minHeight: "100px" }}
            />
          </div>
          <div>
            <input
              type="date"
              placeholder="Due Date"
              value={task.datefinist || ""}
              onChange={(event) =>
                setTask({ ...task, datefinist: event.target.value })
              }
              className="add-tasks-input-field"
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              className="add-tasks-submit-button"
            >
              Save
            </button>
          </div>
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000} // Adjust the duration as needed
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </div>
    </div>
  );
}