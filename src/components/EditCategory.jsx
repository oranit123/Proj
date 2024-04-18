import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Snackbar, Button } from '@mui/material';

export default function EditCategory() {
  const { categoryName } = useParams();
  const [editedCategory, setEditedCategory] = useState({});
  const navigate = useNavigate();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const allCategories = JSON.parse(localStorage.getItem('categories')) || [];
    const categoryToEdit = allCategories.find(cat => cat.categoryName === categoryName);
    setEditedCategory(categoryToEdit || {});
  }, [categoryName]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!editedCategory.categoryName) {
      setSnackbarMessage('Please enter a category name');
      setSnackbarOpen(true);
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const allCategories = JSON.parse(localStorage.getItem('categories')) || [];
    
    const userCategories = allCategories.filter(cat => cat.createdBy === currentUser.id);

    const isNameExists = userCategories.some(cat => cat.categoryName === editedCategory.categoryName);
    
    if (isNameExists) {
      setSnackbarMessage('Category name already exists. Please enter another name.');
      setSnackbarOpen(true);
      return;
    }

    const categoryIndex = allCategories.findIndex(cat => cat.categoryName === categoryName);
    
    if (categoryIndex > -1) {
      allCategories[categoryIndex] = editedCategory;
      localStorage.setItem('categories', JSON.stringify(allCategories));

      let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      allTasks.forEach(task => {
        if (task.Categoory === categoryName) {
          task.Categoory = editedCategory.categoryName;
        }
      });
      localStorage.setItem('tasks', JSON.stringify(allTasks));

      setSnackbarMessage('Category updated successfully');
      setSnackbarOpen(true);
      navigate('/Categories');
    } else {
      setSnackbarMessage('Category not found');
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
    <div className="edit-category-container">
      <div className="edit-category-form">
        <h1 className="edit-category-title">Edit Category</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Category Name"
              value={editedCategory.categoryName || ''}
              onChange={(event) =>
                setEditedCategory({ ...editedCategory, categoryName: event.target.value })
              }
              className="edit-category-input"
            />
          </div>
          <div className="edit-category-submit-button">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ fontSize: '18px', borderRadius: '5px', cursor: 'pointer' }}
            >
              Save
            </Button>
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