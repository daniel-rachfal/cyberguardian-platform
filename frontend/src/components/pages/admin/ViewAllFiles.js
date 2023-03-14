import { useState, useEffect } from 'react';
/**
 * Admin View All Files Page
 * 
 * This page is responsible for viewing all files on the platform
 * 
 * @author Daniel Rachfal
 */
function ViewAllFiles() {
    const [files, setFiles] = useState([]);
    
    // Fetch the files from the API
    useEffect(() => {
        //! Use a more stable link
        const api_link = "http://localhost/cyberguardian-platform/backend/API/getAllFiles"
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
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>File Name</th>
                        <th>Visibility</th>
                        <th>Created By</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map((file) => (
                        <tr key={file.id}>
                            <td>{file.fileName}</td>
                            {/* Only capitalizes the first letter of the string */}
                            <td style={{textTransform: 'capitalize'}}>{file.visibility.toLowerCase()}</td>
                            <td>{file.createdByEmail}</td>
                            <td>{file.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewAllFiles;