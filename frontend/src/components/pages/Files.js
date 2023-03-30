import { useState, useEffect } from 'react';
import { BASE_API_URL } from '../Api.js';
import Moment from 'react-moment';
import { useNavigate } from "react-router-dom";


import { Logger } from "logging-library";
import FileViewer from "react-file-viewer";
import { CustomErrorComponent } from "custom-error";

import PreviewPage from './PreviewPage.js';

/**
 * View Files Page
 * 
 * This page is responsible for viewing files for regular users of the platform
 * 
 * @author Daniel Rachfal
 * Jack Ambler - File Preview
 */
function FilesPage() {
    const [files, setFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleDelete = (message, fileId) => {
        const updatedFiles = files.filter((file) => file.id !== fileId);
        setFiles(updatedFiles);
        setSuccessMessage(message)
    }

    // Fetch the files from the API
    useEffect(() => {
        fetch (`${BASE_API_URL}/files`)
            .then((res) => res.json())
            .then((response) => {
                setFiles(response['data']);
            })
            .catch((error) => {
                setErrorMessage("Something has went wrong when fetching the files. Please contact your administrator for help");
            })
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    }

    const searchFilter = (file) => {
        if (file.fileName ? file.fileName.toLowerCase().includes(searchTerm) : false) {
            return true;
        } else if (file.createdByEmail ? file.createdByEmail.toLowerCase().includes(searchTerm) : false) {
            return true;
        } else if (file.id ? file.id.toString().toLowerCase().includes(searchTerm) : false) {
            return true;
        }
    }

    const handleView = (file_id) => {
        navigate(`/preview/${file_id}`);
    }
    const [view, setView] = useState(false);
    const [viewImage, setView2] = useState(false);
  
    // const handleView = () => {
    //   setView(!view);
    // };
    const handleViewImage = () => {
      setView2(!viewImage);
    };
  
    const onError = (e) => {
      Logger.logError(e, "error in file-viewer");
    };
  
    return (
        <div className="container">
            <div className="card card-primary">
                <div className="card-header">
                    <h2>View All Files</h2>
                </div>
                <div className="card-body bg-white">
                    {/* Only render success message and error message if they're not null */}
                    {successMessage !== "" ? 
                    <div className="p-0 bg-success rounded">
                        <p className="p-2 fw-bold text-light">{successMessage}</p>
                    </div> : null}
                    {errorMessage !== "" ? 
                    <div className="p-0 bg-danger rounded">
                        <p className="p-2 fw-bold">{errorMessage}</p> 
                    </div> : null}
                    <input type="text" className="form-control m-1" placeholder="Search through files" onChange={handleSearch}/>
                    <div className="table-responsive bg-white">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>File Name</th>
                                <th>Visibility</th>
                                <th>Created By</th>
                                <th>Created At</th>
                                <th>Actions</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {files.filter(searchFilter)
                            .sort((a, b) => b.createdAt - a.createdAt)
                            .map((file) => (
                                <tr key={file.id}>
                                    <td>{file.fileName}</td>
                                    <td style={{textTransform: 'capitalize'}}>{file.visibility.toLowerCase()}</td>
                                    <td>{file.createdByEmail}</td>
                                    <td><Moment unix format="DD/MM/YYYY hh:mm">{file.createdAt}</Moment></td>
                                    <td><button type="button" class="btn btn-primary" onClick={() => PreviewPage(file.id)}>View File</button></td>
                                        {view && (
                                            
                                            <FileViewer
                                            //fileType={type}
                                            filePath={file}
                                            errorComponent={CustomErrorComponent}
                                            onError={onError}
                                            />
                                        )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

//<th><PreviewPage /></th>
//<td><button type="button" class="btn btn-primary" onClick={() => handleView(file.id)}>View File</button>
//<td><PreviewPage /></td>
export default FilesPage;