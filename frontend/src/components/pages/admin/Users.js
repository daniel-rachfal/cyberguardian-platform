/**
@file UsersPage.js
Admin Users Page component.
This component is responsible for displaying and managing all users on the platform.
The users are fetched from the API and displayed in a table. An admin can also search
through the users using the search bar.
@author Daniel Rachfal
*/

// Import required libraries and components
import { useState, useEffect } from 'react';
import { BASE_API_URL } from '../../Api.js';

/**
UsersPage function component.
This component fetches the users data from the API and renders a table with
the user information. It also provides a search functionality to filter users
based on username or email.
@returns {JSX.Element} The rendered UsersPage component.
*/
function UsersPage() {
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); 
    const [searchTerm, setSearchTerm] = useState("");
    const userIsAdmin = localStorage.getItem("status");

    // Check if the user is an admin, if not show an error message
    useEffect(() => {
        if (!userIsAdmin) {
            setErrorMessage("You are not authorized to access this page");
        }
    })

    // Fetch the users data from the API and store it in the users state
    useEffect(() => {
        fetch (`${BASE_API_URL}/users`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((res) => res.json())
            .then((response) => {
                setUsers(response['data']);
            })
            .catch((error) => {
                setErrorMessage("Something has went wrong when fetching the users. Please contact your administrator for help");
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
    @param {Object} user - The user object containing the user's information.
    @returns {boolean} True if the user's username or email contains the search term, otherwise false.
    */
    const searchFilter = (user) => {
        if (user.username ? user.username.toLowerCase().includes(searchTerm) : false) {
            return true;
        } else if (user.email ? user.email.toLowerCase().includes(searchTerm) : false) {
            return true;
        }
    }

    // Render the UsersPage component
    return (
        <div className="container">
            <div className="card card-primary">
                <div className="card-header">
                    <h2>View All Users</h2>
                </div>
                <div className="card-body bg-white">
                    {/* Only render success message and error message if they're not null */}
                    {successMessage !== "" ? 
                    <div className="p-0 bg-success rounded">
                        <p className="p-2 fw-bold text-light">{successMessage}</p>
                    </div> : null}
                    {errorMessage !== "" ? 
                    <div className="p-0 bg-danger rounded">
                        <p className="py-2 fw-bold">{errorMessage}</p> 
                    </div> : null}
                    {userIsAdmin &&
                    <div className="bg-white">
                    <input type="text" className="form-control m-1" placeholder="Search through users" onChange={handleSearch}/>
                    <div className="table-responsive bg-white">
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
                                {users
                                .sort((a, b) => b.id - a.id)
                                .filter(searchFilter).map((user) => (
                                    <tr key={user.id}>
                                        <th scope="row">{user.id}</th>
                                        <td>{user.username}</td>   
                                        <td>{user.email}</td>
                                        <td>{user.createdAt}</td>
                                        <td>{user.is_admin === "1" ? "Yes" : "No"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default UsersPage;