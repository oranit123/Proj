import { Snackbar } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditTasks() {
  const { nameTasks } = useParams();
  const [editedTask, setEditedTask] = useState({});
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskToEdit = allTasks.find(task => task.nameTasks === nameTasks);
    setEditedTask(taskToEdit || {});

    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    const allCategories = JSON.parse(localStorage.getItem('categories')) || [];
    const userCategories = allCategories.filter(cat => cat.createdBy === currentUser.id);
    setCategories(userCategories);
  }, [nameTasks]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!editedTask.nameTasks || !editedTask.Categoory || !editedTask.details || !editedTask.datefinist) {
      setSnackbarMessage('Please fill in all the task details');
      setSnackbarOpen(true);
      return;
    }

    const taskDate = new Date(editedTask.datefinist);
    const currentDate = new Date();

    if (taskDate < currentDate) {
      setSnackbarMessage('Task date cannot be in the past');
      setSnackbarOpen(true);
      return;
    }

    let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = allTasks.findIndex(task => task.nameTasks === nameTasks);

    if (taskIndex > -1) {
      allTasks[taskIndex] = editedTask;
    } else {
      allTasks.push(editedTask);
    }

    localStorage.setItem('tasks', JSON.stringify(allTasks));
    setSnackbarMessage('Task updated successfully');
    setSnackbarOpen(true);
    navigate('/MyTasks');
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <div className="edit-tasks-container">
      <div className="edit-tasks-form-wrapper">
        <h1 className="edit-tasks-title">Edit Task</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder='Task Name'
              value={editedTask.nameTasks || ''}
              onChange={(event) => setEditedTask({ ...editedTask, nameTasks: event.target.value })}
              className="edit-tasks-input-field"
            />
          </div>
          <div>
            <select
              value={editedTask.Categoory || ''}
              onChange={(event) => setEditedTask({ ...editedTask, Categoory: event.target.value })}
              className="edit-tasks-input-field"
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
              placeholder='Short Description'
              value={editedTask.details || ''}
              onChange={(event) => setEditedTask({ ...editedTask, details: event.target.value })}
              className="edit-tasks-input-field"
              style={{ minHeight: '100px' }}
            />
          </div>
          <div>
            <input
              type="date"
              placeholder='Due Date'
              value={editedTask.datefinist || ''}
              onChange={(event) => setEditedTask({ ...editedTask, datefinist: event.target.value })}
              className="edit-tasks-input-field"
            />
          </div>
          <div className="text-center">
            <button type='submit' className="edit-tasks-submit-button">Save</button>
          </div>
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000} 
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </div>
    </div>
  );
}