import { Link } from "react-router-dom";

/**
 * Admin Home Page
 * 
 * Responsible for showing links to other pages while 
 * the navigation bar is not implemented
 * 
 * @author Daniel Rachfal
 */
function AdminHome() {
    return (
        <div>
            <h1>Admin Home Page</h1>
            <ul>
                <li><Link to="admin/files">View All Files</Link></li>
            </ul>
        </div>
    );
}

export default AdminHome;