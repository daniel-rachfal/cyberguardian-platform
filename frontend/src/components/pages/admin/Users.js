import { useState, useEffect } from 'react';
import { BASE_API_URL } from '../../Api.js';
import Moment from 'react-moment';

/**
 * Admin Users Page
 * 
 * This page is responsible for viewing and managing all users on the platform
 * 
 * @author Daniel Rachfal
 */
function UsersPage() {
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); 

    // Fetch the files from the API
    useEffect(() => {
        fetch (`${BASE_API_URL}/users`)
            .then((res) => res.json())
            .then((response) => {
                setUsers(response['data']);
            })
            .catch((error) => {
                setErrorMessage("Something has went wrong when fetching the users. Please contact your administrator for help");
            })
    }, []);

    return (
        <div className="container">
            <div className="card card-primary">
                <div className="card-header">
                    View All Users
                </div>
                <div className="card-body">
                    {/* Only render success message and error message if they're not null */}
                    {successMessage !== "" ? 
                    <div className="bg-success rounded">
                        <p className="p-2 fw-bold text-light">{successMessage}</p>
                    </div> : null}
                    {errorMessage !== "" ? 
                    <div className="bg-danger rounded">
                        <p className="p-2 fw-bold">{errorMessage}</p> 
                    </div> : null}
                    <div class="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Created At</th>
                                    <th scope="col">Admin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <th scope="row">{user.id}</th>
                                        <td>{user.username}</td>   
                                        <td>{user.email}</td>
                                        <td><td><Moment unix format="DD/MM/YYYY hh:mm">{user.createdAt}</Moment></td></td>
                                        <td>{user.is_admin ? "Yes" : "No"}</td>
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

export default UsersPage;