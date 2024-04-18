import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TasksPreview from '../components/TasksPreview';
import DeleteTasks from '../components/DeleteTasks';
import MarkTaskDone from '../components/MarkTaskDone';
import { Container, Typography, Grid, Card, CardContent, Button, IconButton, Snackbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  
  useEffect(() => {
    loadTasks();
  }, [currentUser, currentUser.id]);
  
  function loadTasks() {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const filteredTasks = allTasks.filter(task => task.createdBy === currentUser.id);
    setTasks(allTasks);
    setFilteredTasks(filteredTasks); 
  }
  

  function deleteTask(taskName) {
    let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = allTasks.filter(task => task.nameTasks !== taskName);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  
   
    const completed = updatedTasks.filter(task => task.done).length;
    const notCompleted = updatedTasks.length - completed;
    localStorage.setItem('taskCounts', JSON.stringify({ completed, notCompleted }));
  
    setTasks(updatedTasks);
    setSnackbarMessage('Task deleted successfully');
    setSnackbarOpen(true);
  }
  
  function toggleTaskDone(taskName) {
    let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = allTasks.findIndex(task => task.nameTasks === taskName);
    if (taskIndex !== -1) {
      allTasks[taskIndex].done = !allTasks[taskIndex].done;
      localStorage.setItem('tasks', JSON.stringify(allTasks));
  
 
      const completed = allTasks.filter(task => task.done).length;
      const notCompleted = allTasks.length - completed;
      localStorage.setItem('taskCounts', JSON.stringify({ completed, notCompleted }));
  
      setTasks(allTasks);
      setSnackbarMessage('Task status updated');
      setSnackbarOpen(true);
    }
  }
  

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <>
      <Navbar />
      <Container className="task-container">
        <Typography variant="h1" className="page-title">
          Welcome to my task manager
        </Typography>
        <Grid container spacing={2}>
          {filteredTasks.map((task, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent className="card-content">
                  <TasksPreview {...task} />
                  <div className="action-buttons">
                    <Link to={`/MyTasks/EditTasks/${task.nameTasks}`} className="link-no-decoration">
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <DeleteTasks taskName={task.nameTasks} onDelete={deleteTask} />
                    <MarkTaskDone taskName={task.nameTasks} onToggleDone={toggleTaskDone} />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div className="add-task-button">
          <Link to="/MyTasks/AddTasks" state={{tasks}}className="link-no-decoration">
            <Button variant="contained" color="primary">
              Add Tasks
            </Button>
          </Link>
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </Container>
    </>
  );
}
