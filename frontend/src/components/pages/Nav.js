import {Link} from 'react-router-dom';
import styles from './Nav.module.css';

/**
 * Placeholder Nav Bar
 * 
 * Navigation stuff
 * 
 * @author Jack Wilde w20022384
 */
function Nav() {
    return(
        <div className={styles.menu}>
            <ul>
                <li><Link to= '/'>Home</Link></li>
                <li><Link to= '/admin/files'>Files (Admin)</Link></li>
                <li><Link to= '/admin/users'>Users (Admin)</Link></li>
                <li><Link to= '/upload'>Upload</Link></li>
                <li><Link to= '/signup'>Sign Up</Link></li>
                <li><Link to= '/login'>Login</Link></li>
            </ul>
        </div>
    );
}

export default Nav;