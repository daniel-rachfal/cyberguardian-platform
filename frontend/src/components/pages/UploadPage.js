import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BASE_API_URL } from '../Api.js';
import jwt_decode from 'jwt-decode';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

/**
 * Upload Page
 * 
 * Page for uploading files, 100mb hardcoded upload limit to prevent hitting default server upload limit 
 * 
 * @author Jack Wilde w20022384
 * @author Daniel Rachfal
 * @link https://www.filestack.com/fileschool/react/react-file-upload/
 */
function UploadPage (props) {

    const [selectedFile, setSelectedFile] = useState('');
	const [isFilePicked, setIsFilePicked] = useState(false);
	const [title, setTitle] = useState('');

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

    const handleSubmission = (event) => {
		//stop page reload on submission
		event.preventDefault();

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
				//if file is above 100mb upload size limit (CAN CHANGE ON SERVER CONFIG)
				if(selectedFile.size > 100000000)
				{
					feedback.innerHTML = "That file is too big! Please upload a file less than 100MB.";
				}
				else
				{
					//get userID from JWT
					var token1 = localStorage.getItem('token');
					var decoded = jwt_decode(token1);
					var userid = decoded.id;

					//put file data in formData object
					const formData = new FormData();
					formData.append('file', selectedFile);

					//if title input is blank
					if(title === "")
					{
						formData.append('fileTitle', selectedFile.name);
					}
					else
					{
						formData.append('fileTitle', title);
					}
					formData.append('fileName', selectedFile.name);
					formData.append('visibility', vis.value);
					formData.append('createdBy', userid);
					
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
				
			}
			//file isn't a suitable type
			else
			{
				document.getElementById("uploadFeedback").innerHTML = "Error uploading file: This file type isn't allowed!"
			}
			
		}
		//if no file selected
		else
		{
			document.getElementById("uploadFeedback").innerHTML = "Please select a file!"
		}
	};

	var fileData = document.getElementById("file-input");
    return(
        <div>
			{props.authenticated && 
			<div>
				<div className="container mt-5">
					<h1>Upload</h1>
					<Form onSubmit={handleSubmission}>
						<FormGroup>
							<Form.Label>File Title:</Form.Label>
							<FormControl 
								type="text" 
								size="lg"
								placeholder="Enter a file title"
								value={title} 
								onChange={(event) => setTitle(event.target.value)}
							/>
						</FormGroup>
						<FormGroup>
							<Form.Label>File:</Form.Label>
							<FormControl id="file-input"
								type="file"
								size="lg"
								onChange={(event) => 
								{
									if(fileData.files[0])
									{
										setSelectedFile(fileData.files[0]);
										setIsFilePicked(true);
									}
									else
									{
										setSelectedFile(null);
										setIsFilePicked(false);
									}
									}
								}
							/>
						</FormGroup>
						<FormGroup>
							<Form.Label>Privacy Level:</Form.Label>
							<Form.Select size="lg" id="privacy"> 
								<option value="1">Public</option>	
								<option value="2">Private</option>
							</Form.Select>
						</FormGroup>
						<Button variant='primary' type='submit'>Upload</Button>
					</Form>
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