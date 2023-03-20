import React, {useState} from 'react';
import axios from 'axios';

/**
 * Upload Page
 * 
 * Page for uploading files
 * 
 * @author Jack Wilde w20022384
 * @author Daniel Rachfal
 * @link https://www.filestack.com/fileschool/react/react-file-upload/
 */
function UploadPage () {

    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
		if(!event.target.files || event.target.files.length)
		{
			setSelectedFile(event.target.files[0]);
			setIsFilePicked(true);
		}
	};

    const handleSubmission = () => {
		var e = document.getElementById("privacy");
		if (isFilePicked)
		{
			//put file data in formData object
			const formData = new FormData();
			formData.append('file', selectedFile);
			formData.append('fileName', selectedFile.name);
			formData.append('visibility', e.value);

			//request options
			const url = "http://localhost/cyberguardian-platform/backend/API/upload";
			const config = {
				headers: {
					'content-type' : 'multipart/form-data',
				}
			}

			//send request to API
			axios.post(url, formData, config).then((response) => {
				console.log(response.data);
			});
		}
	};

    return(
        <div>
            <h1>Upload</h1>
            <input type="file" name="file" onChange={changeHandler} />
            {isFilePicked ? (
				<div>
					<p>File name: {selectedFile.name}</p>
					<p>File type: {selectedFile.type}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
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
        </div>
    );
}

export default UploadPage;