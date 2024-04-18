import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Button } from '@mui/material';

export default function AddCategory() {
  const [category, setCategory] = useState({});
  const navigate = useNavigate();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = (event) => {
    let currentUser = localStorage.getItem("currentUser");
    let obj=JSON.parse(currentUser)
    event.preventDefault();
    if (!category.categoryName) {
      setSnackbarMessage('Please enter a category name');
      setSnackbarOpen(true);
      return;
    }
    let allCategories = JSON.parse(localStorage.getItem('categories')) || [];
    const isExistingCategory = allCategories.some(cat => cat.categoryName === category.categoryName && cat.createdBy === obj.id);
    if (isExistingCategory) {
      setSnackbarMessage('Category already exists');
      setSnackbarOpen(true);
  
      return;
    }
    const categoryWithCreatedBy = {
      ...category,
      createdBy: obj.id
    };
    allCategories.push(categoryWithCreatedBy);
    localStorage.setItem('categories', JSON.stringify(allCategories));
    setCategory({ categoryName: '' });
    setSnackbarMessage('Category added successfully');
    setSnackbarOpen(true);
    navigate('/Categories');
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className="add-category-container">
      <div className="add-category-form">
        <h1 className="add-category-title">Add New Category</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Category Name"
              value={category.categoryName || ''}
              onChange={(event) => setCategory({...category, categoryName: event.target.value})}
              className="add-category-input"
            />
          </div>
          <div className="add-category-submit-button">
            <Button type='submit' variant="contained" color="primary" style={{ fontSize: '18px', borderRadius: '5px', cursor: 'pointer' }}>Add Category</Button>
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