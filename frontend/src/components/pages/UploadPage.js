import React, {useState} from 'react';

/**
 * Upload Page
 * 
 * Page for uploading files
 * 
 * @author Jack Wilde w20022384
 */
function UploadPage () {

    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
		setIsFilePicked(false);
		console.log("change")
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

    const handleSubmission = () => {
		console.log("submit clicked");
		console.log(selectedFile);
		var e = document.getElementById("privacy");
		if (isFilePicked)
		{
			console.log("file picked + submitted")
			const formData = new FormData();
			formData.append('fileName', selectedFile.name);
			formData.append('visibility', e.value);

			//log all values in formdata for testing
			for (const value of formData.values()) 
			{
				console.log(value);
			}

			fetch("http://localhost/cyberguardian-platform/backend/API/upload",
			{
				method: 'POST',
				body: formData
			})
			.then(
				(response) => response.json()
			)
			.then(
				(json) => {
					console.log(json);
				}
			)
			.catch(
				(e) => {
					console.log(e.message)
				})
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