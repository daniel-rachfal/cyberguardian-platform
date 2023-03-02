import {Outlet, Link} from 'react-router-dom';

/**
 * Nav Bar
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
                <li><Link to= '/admin'>Admin</Link></li>
                <li><Link to= '/upload'>Upload</Link></li>
            </ul>
        </div>
    );
}

export default Nav;