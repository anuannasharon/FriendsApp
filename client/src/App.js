import React from 'react';
import './App.scss';
import Friend from './Components/Friend';

function App() {
  return (
    <div className="friends-container d-flex justify-content-center">
    <div className="card mt-2">
      <div className="card-header">Friends List</div>
      <div className="card-body p-0">
         <input className="form-control input-friend" type="text" placeholder="Enter your friend's name"/>
         <Friend/>
      </div>
      </div>
    </div>
    
  );
}

export default App;
