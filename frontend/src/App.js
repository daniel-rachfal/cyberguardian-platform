import './App.css';
import HomePage from './components/pages/HomePage';
import ViewAllFiles from './components/pages/admin/ViewAllFiles';
import UploadPage from './components/pages/UploadPage';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Nav from './components/pages/Nav';
import PreviewPage from './components/pages/PreviewPage';
import { Routes, Route } from 'react-router-dom';
import React, {useState, useEffect} from 'react';

function App() {

  const [authenticated, setAuthenticated] = useState(false);

  const handleAuthenticated = (isAuthenticated) => {setAuthenticated(isAuthenticated)}

  return (
    <div className="App">
        <Nav />
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/admin/files" element={<ViewAllFiles />}/>
            <Route path="/upload" element={<UploadPage authenticated={authenticated} handleAuthenticated={setAuthenticated} />} />
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login authenticated={authenticated} handleAuthenticated={setAuthenticated} />} />
        </Routes>
    </div>
  );
}

export default App;
