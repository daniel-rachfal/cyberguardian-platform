import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BASE_API_URL } from '../Api.js';
import jwt_decode from 'jwt-decode';

/**
 * Upload Page
 * 
 * Page for uploading files
 * 
 * @author Jack Wilde w20022384
 * @author Daniel Rachfal
 * @link https://www.filestack.com/fileschool/react/react-file-upload/
 */
function UploadPage (props) {

    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	//is user authd
	useEffect(
        () => {
            if (localStorage.getItem('token')) {
                props.handleAuthenticated(true)
            }
        }
        , [])

    const changeHandler = (event) => {
		if(!event.target.files || event.target.files.length)
		{
			setSelectedFile(event.target.files[0]);
			setIsFilePicked(true);
		}
	};

    const handleSubmission = () => {
		var vis = document.getElementById("privacy");
		var feedback = document.getElementById("uploadFeedback");
		feedback.innerHTML = "";
		//if a file has been selected
		if (isFilePicked)
		{
			//filetype validation(pdf/pptx/docx/doc)
			if(selectedFile.type === "application/pdf" 
			|| selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
			|| selectedFile.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" 
			|| selectedFile.type === "application/msword")
			{
				console.log("file whitelist pass");

				var token1 = localStorage.getItem('token');
				var decoded = jwt_decode(token1);
				var userid = decoded.id;

				//put file data in formData object
				const formData = new FormData();
				formData.append('file', selectedFile);
				formData.append('fileName', selectedFile.name);
				formData.append('visibility', vis.value);
				formData.append('createdBy', userid);
				console.log("file type:" + selectedFile.type);
				
				//request options
				const url = BASE_API_URL + "/upload";
				const token = localStorage.getItem('token');
				const config = {
					headers: {
						'content-type' : 'multipart/form-data',
						'Authorization' : 'Bearer ' + token,
					}
				}

				//send request to API
				axios.post(url, formData, config).then((response) => {
					console.log(response.data);
					if(response.data.message == "Success")
					{
						feedback.innerHTML = "File uploaded!"
					}
					else
					{
						feedback.innerHTML = "There was an error uploading the file!"
					}
				});
			}
			//file isn't a suitable type
			else
			{
				console.log("file type not allowed!");
				document.getElementById("uploadFeedback").innerHTML = "Error uploading file: This file type isn't allowed!"
			}
			
		}
		//if no file selected
		else
		{
			console.log("please select a file!");
		}
	};

    return(
        <div>
			<h1>Upload</h1>
			{props.authenticated && 
			<div>
				<input type="file" name="file" onChange={changeHandler} />
				{isFilePicked ? (
					<div>
						<p>File type: {selectedFile.type}</p>
					</div>
				) : (
					<p>Select a file to show details</p>
				)}
				<label htmlFor="privacy">Select privacy level:</label>
				<select name="privacy" id="privacy">
					<option value="1">Public</option>
					<option value="2">Private</option>
				</select>
				<div>
					<button onClick={handleSubmission}>Submit</button>
				</div>
				<div>
					<p id="uploadFeedback"></p>
				</div>
			</div>
			}
			{!props.authenticated && <p>Please log in to access this page</p>}
            
        </div>
    );
}

export default UploadPage;