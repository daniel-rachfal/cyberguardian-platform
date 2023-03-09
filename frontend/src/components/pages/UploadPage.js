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
		console.log("submitted");
		console.log(selectedFile);

		const formData = new FormData();
		formData.append('fileName', selectedFile.name);

		fetch("http://unn-w20022384.newnumyspace.co.uk/yr3/group/api/",
        {
        	method: 'POST',
        	body: formData
        })
        .then(
        	(response) => response.text()
        )
        .catch(
        	(e) => {
        		console.log(e.message)
        	})

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
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
        </div>
    );
}

export default UploadPage;