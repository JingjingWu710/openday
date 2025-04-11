// App.js
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopicList from './components/TopicList';
import Sidebar from './components/Sidebar';
import ProgramList from './components/ProgramList'
import LocationDetails from './components/LocationDetails';
import { useState, useEffect } from 'react';


function App() {
  const [data, setData] = useState({})
  const [topics, setTopics] = useState([])

  useEffect(() => {
      fetch('/OpenDay.json')
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setTopics(data.topics);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row flex-nowrap min-vh-100">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-danger" style={{ minHeight: '100vh' }}>
            <Sidebar />
          </div>
          <Routes>
            <Route path="/" element={<TopicList data={data} />} />
            <Route path="/topic/:id" element={<ProgramList topics={topics}/>} />
            <Route path='/location/:locationId' element={<LocationDetails topics={topics}/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;

