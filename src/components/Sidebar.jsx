import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [topics, setTopics] = useState([]);


  useEffect(() => {
    fetch('/OpenDay.json')
      .then((response) => response.json())
      .then((data) => {
        setTopics(data.topics);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white" style={{ minHeight: '100vh' }}>
      <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-5 d-none d-sm-inline text-start university">Cardiff University Open Day</span>
      </a>

      <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
        <li className="nav-item">
          <a href="/" className="nav-link align-middle px-0">
            <span className="ms-1 d-none d-sm-inline">Home</span>
          </a>
        </li>
        <li>
          <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
            <span className="ms-1 d-none d-sm-inline">Departments</span>
          </a>
          <ul className="collapse show nav flex-column ms-3" id="submenu1" data-bs-parent="#menu">
            {topics.map((topic) => (
              <li key={topic.id} className="w-100">
                <Link to={`/topic/${topic.id}`} className="nav-link px-0 sub-categories">
                  <span className="d-none d-sm-inline">{topic.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};


export default Sidebar