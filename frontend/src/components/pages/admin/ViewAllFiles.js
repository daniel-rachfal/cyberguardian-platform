import { useState, useEffect } from 'react';
import { BASE_API_URL } from '../../Api.js';
/**
 * Admin View All Files Page
 * 
 * This page is responsible for viewing all files on the platform
 * 
 * @author Daniel Rachfal
 */
function FileVisibility(props) {
    const [selectedOption, setSelectedOption] = useState(props.visibility);
    const [currentVisibility, setCurrentVisibility] = useState(props.visibility);

    useEffect(() => {
        if (selectedOption !== currentVisibility) {
            fetch("${BASE_API_URL}/updateFileVisibility", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    file_id: props.file_id,
                    visibility: selectedOption,
                }),
            })
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => console.log(error))
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
        <div>
          <select
            id="visibility-select"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
}

function ViewAllFiles() {
    const [files, setFiles] = useState([]);

    // Fetch the files from the API
    useEffect(() => {
        //! Use a more stable link
        const api_link = "http://localhost/cyberguardian-platform/backend/API/files"
        fetch (api_link)
            .then(res => res.json())
            .then((response) => {
                setFiles(response['data']);
            })
            .catch((error) => {
                //! Add error handling
                console.log('Something did a bad');
            })
    }, []);

    return (
        <div className="container">
            <div className="card card-primary">
                <div className="card-header">
                    View All Files
                </div>
                <div className="card-body">
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
                            {files.map((file) => (
                                <tr key={file.id}>
                                    <td>{file.fileName}</td>
                                    {/* Only capitalizes the first letter of the string */}
                                    <td style={{textTransform: 'capitalize'}}>
                                        <FileVisibility
                                            file_id={file.id}
                                            visibility={file.visibility}
                                        />
                                    </td>
                                    <td>{file.createdByEmail}</td>
                                    <td>{file.createdAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewAllFiles;