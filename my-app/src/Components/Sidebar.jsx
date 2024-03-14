// Dashboard.js
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';
const Sidebar = () => {
    const [isOpen,setIsOpen]=useState(false);
    const toggleDropdown=()=>{
        setIsOpen(!isOpen);
    };
    return (
        <div className="dashboard-container">
            <div className="side-panel">
                <div className="side-panel-item">
                    <Link to="/dashboard">Dashboard</Link>
                </div>
                <div className="side-panel-item">
      <div className="tab">
        <Link to="/chats">Chit-Chat</Link>
        <div className="dropdown" onClick={toggleDropdown}>
          <span className="arrow">&#9660;</span>
          {isOpen && (
            <div className="dropdown-content">
              <Link to="/mychats">My Chats</Link>
              <Link to="/discussion">Discussion</Link>
              {/* Add more discussion links as needed */}
            </div>
          )}
        </div>
      </div>
    </div>
                <div className="side-panel-item">
                    <Link to="/codingProfiles">coding profiles</Link>
                </div>
                <div className="side-panel-item">
                    <Link to="/blogs">Blogs</Link>
                </div>

                
                <div className="side-panel-item">
                    <Link to="/resources">Resources</Link>
                </div>
                <div className="side-panel-item">
                    <Link to="/about">About Us</Link>
                </div>
                {/* Add more side panel items as needed */}
            </div>
           
        </div>
    );
};

export default Sidebar;
