import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); 
    const localStorageKey = 'currentUser';

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true); 

       
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const foundUser = users.find(user => user.email === email && user.password === password);

        if (foundUser) {
          
            setSnackbarMessage('You have successfully logged in.');
            setSnackbarOpen(true);

            
            navigate('/MyTasks');
            localStorage.setItem(localStorageKey, JSON.stringify(foundUser));
        } else {
        
            setSnackbarMessage('Invalid email or password. Please try again.');
            setSnackbarOpen(true);
        }
        setLoading(false); 
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-header">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="login-input">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="login-input">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="login-button-container">
                        <button type="submit" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                    <p className="forgot-password">
                       User Not Found? <Link to='/Registration'>Sign Up here</Link>
                    </p>
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
