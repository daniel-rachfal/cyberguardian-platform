import { Link } from 'react-router-dom'

/**
 * Placeholder home page component
 * 
 * @author Daniel Rachfal
 */
function HomePage() {
    return (
        <div>
            <div>
                <h1>Cyberguardian Platform</h1>
                <p>This is a placeholder page for the Cyberguardian Platform</p>
                <p>Feel free to yeet all this code (including author) when we get around to this</p>
            </div>
            <div>
                <ul>
                    <li><Link to="/admin">Admin</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default HomePage;