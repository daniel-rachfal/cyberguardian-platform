/**
 * Admin View All Files Page
 * 
 * This page is responsible for viewing all files on the platform
 * 
 * @author Daniel Rachfal
 */
function ViewAllFiles() {
    const files = [
        {
            fileName: "Potato",
            visibility: "Public",
            createdBy: "Daniel Rachfal",
            createdAt: Date.now(),
        },
        {
            fileName: "Potato",
            visibility: "Private",
            createdBy: "Daniel Rachfal",
            createdAt: Date.now(),
        },
    ]

    return (
        <div>
            <table>
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
                        <tr>
                            <td>{file.fileName}</td>
                            <td>{file.visibility}</td>
                            <td>{file.createdBy}</td>
                            <td>{file.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewAllFiles;