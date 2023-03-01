import './App.css';
import HomePage from './components/pages/HomePage';
import AdminHome from './components/pages/admin/AdminHome';
import ViewAllFiles from './components/pages/admin/ViewAllFiles';
import UploadPage from './components/pages/UploadPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/admin" element={<AdminHome />}/>
            <Route path="/admin/files" element={<ViewAllFiles />}/>
            <Route path="/upload" element={<UploadPage />} />
        </Routes>
    </div>
  );
}

export default App;
