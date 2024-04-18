import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryPreview({ categoryName }) {
  const tasksForCategory = getTasksForCategory(categoryName);
  
  function getTasksForCategory(categoryName) {
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const filteredTasks = allTasks.filter(task => task.Categoory === categoryName && task.createdBy === currentUser.id);
    return filteredTasks;
  }

  return (
    <div className="category_preview">
      <header>
        <h3>{categoryName}</h3>
      </header>
      <div>
        {tasksForCategory.map((task, index) => (
          <div key={index}>
            <Link to={`/Categories/MyTasks/${task.nameTasks}`}>{task.nameTasks}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
