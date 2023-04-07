/**
@file FilesPage.js
Admin View All Files Page component.
This component is responsible for displaying all files on the platform.
The files are fetched from the API and displayed in a table. An admin can also search
through the files using the search bar. The component provides file preview,
visibility change, and deletion functionalities.
@author Daniel Rachfal
*/

// Import required libraries and components
import { useState, useEffect } from 'react';
import { BASE_API_URL } from '../../Api.js';
import Moment from 'react-moment';

/**
FileVisibility function component.
This component is responsible for displaying the visibility status of a file.
It allows admins to change the visibility status between public and private.
@param {Object} props - The component properties.
@returns {JSX.Element} The rendered FileVisibility component.
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
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: bodyString
            })
                .then((response) => response.json())
                .then((data) => {
                    setCurrentVisibility(selectedOption)
                    onSuccess("Visibility changed");
                })
                .catch((error) => {
                    onFailure("Something went wrong when changing file visibility")
                  });
            }
    }, [selectedOption, currentVisibility]);

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

/**
DeleteButton function component.
This component renders a delete button for each file. When clicked, the file
will be deleted from the database after confirmation.
@param {Object} props - The component properties.
@returns {JSX.Element} The rendered DeleteButton component.
*/
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
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
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

/**
PreviewButton function component.
This component renders a preview button for each file. When clicked, the file
will be opened in a new browser tab for preview.
@param {Object} props - The component properties.
@returns {JSX.Element} The rendered PreviewButton component.
*/
function PreviewButton({ file }) {
    // This code has been adapted from Jack Ambler's
    function openTab(file){
        const fileName = file.id + "_" + file.fileName;
        window.open(`${BASE_API_URL}/uploads/${fileName}`);
        window.focus();
    }

    return (
        <button type="button" class="btn btn-primary btn-sm me-1" onClick={() => openTab(file)}>View File</button>
    );
}

/**
FilesPage function component.
This component fetches the files data from the API and renders a table with
the file information. It also provides a search functionality to filter files
based on file name, email, or ID. The component includes FileVisibility, DeleteButton,
and PreviewButton components for each file.

@returns {JSX.Element} The rendered FilesPage component.
*/
function FilesPage() {
    const [files, setFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const userIsAdmin = localStorage.getItem("status");

    const handleDelete = (message, fileId) => {
        const updatedFiles = files.filter((file) => file.id !== fileId);
        setFiles(updatedFiles);
        setSuccessMessage(message)
    }

    // Check if the user is an admin, if not show an error message
    useEffect(() => {
        if (!userIsAdmin) {
            setErrorMessage("You are not authorized to access this page");
        }
    })

    // Fetch the files from the API and store them in the files state
    useEffect(() => {
        fetch (`${BASE_API_URL}/files`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((res) => res.json())
            .then((response) => {
                setFiles(response['data']);
            })
            .catch((error) => {
                setErrorMessage("Something has went wrong when fetching the files. Please contact your administrator for help");
            })
    }, []);

    /**
    Update the searchTerm state with the user's search input.
    @param {Event} event - The event object containing the user's input.
    */
    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    }

    /**
    Filter the users based on the searchTerm state.
    @param {Object} file - The file object containing the user's information.
    @returns {boolean} True if the file's filename or created by email contains the search term, otherwise false.
    */
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
                        <p className="py-2 fw-bold text-light">{successMessage}</p>
                    </div> : null}
                    {errorMessage !== "" ? 
                    <div className="p-0 bg-danger rounded">
                        <p className="py-2 fw-bold">{errorMessage}</p> 
                    </div> : null}
                    {userIsAdmin &&
                    <div className="bg-white">
                    <input type="text" className="form-control m-1" placeholder="Search through files" onChange={handleSearch}/>
                    <div className="table-responsive bg-white">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>File Name</th>
                                <th>File Title</th>
                                <th>Visibility</th>
                                <th>Created By</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.filter(searchFilter)
                            .sort((a, b) => b.id - a.id)
                            .map((file) => (
                                <tr key={file.id}>
                                    <th scope="row">{file.id}</th>
                                    <td>{file.fileName}</td>
                                    <td>{file.fileTitle}</td>
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
                                    <td><PreviewButton file={file}/>
                                        <DeleteButton 
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
                    }
                </div>
            </div>
        </div>
    );
}

export default FilesPage;