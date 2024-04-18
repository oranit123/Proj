import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CategoryPreview from '../components/CategoryPreview';
import DeleteCategory from '../components/DeleteCategory';
import { Container, Typography, Grid, Card, CardContent, Button, IconButton, Snackbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

  useEffect(() => {
    loadCategories();
  }, [currentUser]);

  function loadCategories() {
    const allCategories = JSON.parse(localStorage.getItem('categories')) || [];
    const filteredCategories = allCategories.filter(cat => cat.createdBy === currentUser.id);
    setCategories(filteredCategories);
  }

  function deleteCategory(categoryName) {
    let allCategories = JSON.parse(localStorage.getItem('categories')) || [];

    const updatedCategories = allCategories.filter(cat => cat.categoryName !== categoryName || cat.createdBy !== currentUser.id);

    localStorage.setItem('categories', JSON.stringify(updatedCategories));

    setCategories(updatedCategories);

    setSnackbarMessage('Category deleted successfully');
    setSnackbarOpen(true);

    let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = allTasks.filter(task => task.Categoory !== categoryName || task.createdBy !== currentUser.id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
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
      <Container className="categories-container">
        <Typography variant="h4" align="center" gutterBottom>
          Manage Your Categories
        </Typography>
        <Grid container spacing={2}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="category-card">
                <CardContent>
                  <CategoryPreview {...category} />
                  <div className="category-actions">
                    <Link to={`/Categories/EditCategory/${category.categoryName}`} className="link-no-decoration">
                      <IconButton color="secondary">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <DeleteCategory categoryName={category.categoryName} onDelete={() => deleteCategory(category.categoryName)} />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div className="add-category-button">
          <Link to="/Categories/AddCategory" className="link-no-decoration">
            <Button variant="contained" color="secondary">
              Add Category
            </Button>
          </Link>
        </div>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </>
  );
}