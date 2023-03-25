import {Outlet, Link} from 'react-router-dom';

/**
 * Placeholder Nav Bar
 * 
 * Navigation stuff
 * 
 * @author Jack Wilde w20022384
 */
function Nav() {
    return(
        <div>
            <ul>
                <li><Link to= '/'>Home</Link></li>
                <li><Link to= '/admin/files'>Files (Admin)</Link></li>
                <li><Link to= '/upload'>Upload</Link></li>
                <li><Link to= '/signup'>Sign Up</Link></li>
                <li><Link to= '/login'>Login</Link></li>
            </ul>
        </div>
    );
}

export default Nav;