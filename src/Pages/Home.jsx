import React from 'react';

import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      
      <div className="home-container">
        <div className="intro-section">
          <h1>Welcome to Your Task Manager</h1>
          <p>Organize your tasks efficiently and enjoy a more productive day.</p>
          <Link to='/Home/Login' className="intro-login-button">Get Started</Link>
        </div>
      </div>
    </>
  );
}
