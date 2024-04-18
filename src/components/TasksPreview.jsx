import React from 'react';
import { Link } from 'react-router-dom';

export default function TasksPreview({ nameTasks, Categoory, details,datefinist,done }) {
 return (
    <>
      <div >
        <header>
          <Link to={`/MyTasks/${nameTasks}`}><h3>{nameTasks}</h3></Link>
        </header>
        <p>Category: {Categoory}</p>
        <p>Details: {details}</p>
        <p>Date:{datefinist}</p>
        {done ? <p>Status: Done</p> :<p>Status:Still not done</p>}
      </div>
    </>
 );
}
