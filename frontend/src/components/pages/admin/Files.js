import { useState, useEffect } from 'react';
import { BASE_API_URL } from '../../Api.js';
import Moment from 'react-moment';

/**
 * Admin View All Files Page
 * 
 * This page is responsible for viewing all files on the platform
 * 
 * @author Daniel Rachfal
 */
function FileVisibility( { fileId, visibility, onSuccess, onFailure } ) {
    const [selectedOption, setSelectedOption] = useState(visibility);
    const [currentVisibility, setCurrentVisibility] = useState(visibility);

    const visibilityMap = {
        'PUBLIC': 1,
        'PRIVATE': 2
    };

    useEffect(() => {
        if (selectedOption !== currentVisibility) {
            const bodyString = "file_id=" + fileId + "&visibility=" + visibilityMap[selectedOption]
            fetch(`${BASE_API_URL}/updateFileVisibility`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: bodyString
            })
                .then((response) => response.json())
                .then((data) => {
                    onSuccess("Visibility changed");
                })
                .catch((error) => {
                    onFailure("Something went wrong when changing file visibility")
                  });
            }
    }, [selectedOption]);

    const options = [
        { label: "Public", value: "PUBLIC" },
        { label: "Private", value: "PRIVATE" },
    ];

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    }

    return (
          <select
            id="visibility-select"
            value={selectedOption}
            onChange={handleSelectChange}
            className="form-select form-select-sm"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
      );
}

function DeleteButton({ fileId, onDelete, onFailure }) {
    const [isDeleting, setIsDeleting] = useState(false);
  
    const handleDelete = () => {
      setIsDeleting(true);

      if (!window.confirm("Are you sure you want to delete this file?"))
      {
        setIsDeleting(false);
        return;
      }

      fetch(`${BASE_API_URL}/deleteFile`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `file_id=${fileId}` 
      })
        .then((response) => response.json())
        .then((data) => {
          setIsDeleting(false);
          onDelete("File deleted successfully", fileId);
        })
        .catch((error) => {
          setIsDeleting(false);
          onFailure("Something went wrong when attempting to delete the file")
        });
    };
  
    return (
      <button
        className="btn btn-danger btn-sm"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    );
  }

function FilesPage() {
    const [files, setFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

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
                                <th>Id</th>
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
                                    <th scope="row">{file.id}</th>
                                    <td>{file.fileName}</td>
                                    {/* Only capitalizes the first letter of the string */}
                                    <td style={{textTransform: 'capitalize'}}>
                                        <FileVisibility
                                            fileId={file.id}
                                            visibility={file.visibility}
                                            onSuccess={setSuccessMessage}
                                            onFailure={setErrorMessage}
                                        />
                                    </td>
                                    <td>{file.createdByEmail}</td>
                                    <td><Moment unix format="DD/MM/YYYY hh:mm">{file.createdAt}</Moment></td>
                                    <td><DeleteButton 
                                        fileId={file.id}
                                        onDelete={handleDelete}
                                        onFailure={setErrorMessage}
                                    /></td>
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

export default FilesPage;