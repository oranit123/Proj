import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="navbar-container">
      <nav>
        <ul>
          <li><Link to="/MyTasks">MyTasks</Link></li>
          <li><Link to="/Categories">Categories</Link></li>
          <li><Link to="/AverageGraph">AverageGraph</Link></li>
          <li><Link to="/LogOut">LogOut</Link></li>
        </ul>
      </nav>
    </div>
  );
}
