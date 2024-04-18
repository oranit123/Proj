import React, { useEffect, useState } from 'react'; 
import TaskCounts from '../components/TaskCounts';

export default function AverageGraph() {
  const [taskCounts, setTaskCounts] = useState({ completed: 0, notCompleted: 0 });
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

  useEffect(() => {
    loadTasks();
  }, []);

  function loadTasks() {
    let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    const userTasks = allTasks.filter(task => task.createdBy === currentUser.id);
    
   
    updateTaskCounts(userTasks);
  }

  function updateTaskCounts(tasks) {
    let completed = tasks.filter(task => task.done).length;
    let notCompleted = tasks.length - completed;
    setTaskCounts({ completed, notCompleted });
  }

  return (
    <div>
      <TaskCounts data={[
        { name: "Completed Tasks", value: taskCounts.completed },
        { name: "Not Completed Tasks", value: taskCounts.notCompleted }
      ]} />
    </div>
  );
}

