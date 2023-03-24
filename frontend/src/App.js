import './App.css';
import HomePage from './components/pages/HomePage';
import AdminHome from './components/pages/admin/AdminHome';
import ViewAllFiles from './components/pages/admin/ViewAllFiles';
import UploadPage from './components/pages/UploadPage';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Nav from './components/pages/Nav';
import PreviewPage from './components/pages/PreviewPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Nav />
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/admin" element={<AdminHome />}/>
            <Route path="/admin/files" element={<ViewAllFiles />}/>
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </div>
  );
}

export default App;
