import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';

export default function Registration() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isValidEmail(user.email)) {
            setSnackbarMessage('Please enter a valid email address.');
            setSnackbarOpen(true);
            return;
        }

        if (!isValidPassword(user.password)) {
            setSnackbarMessage('Password must be at least eight characters long and contain both numbers and letters.');
            setSnackbarOpen(true);
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const emailExists = users.some(u => u.email === user.email);
        if (emailExists) {
            setSnackbarMessage('This email is already registered. Please use a different email.');
            setSnackbarOpen(true);
            return;
        }

        const newUser = {
            ...user,
            id: Date.now() //  לעשות ID יחודי
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        setUser({
            email: '',
            password: ''
        });

        setSnackbarMessage('User registered successfully');
        setSnackbarOpen(true);

        navigate('/login');
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; 
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    };

    return (
        <div className="registration-container">
            <div className="registration-box">
                <h1 className="registration-header">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="registration-input">
                        <input
                            type="email"
                            placeholder="Email address"
                            value={user.email}
                            onChange={(event) => setUser({ ...user, email: event.target.value })}
                        />
                    </div>
                    <div className="registration-input">
                        <input
                            type="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={(event) => setUser({ ...user, password: event.target.value })}
                        />
                    </div>
                    <div className="registration-button-container">
                        <button className="registration-button" type="submit">Sign Up</button>
                    </div>
                    <p className="forgot-password">
                        Already registered? <Link to='/login'>Login here</Link>
                    </p>
                </form>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    message={snackbarMessage}
                    className="snackbar"
                />
            </div>
        </div>
    );
}
