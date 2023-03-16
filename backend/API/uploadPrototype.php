<?php

/**
 * Prototype endpoint for locally saving uploaded files  
 * 
 * @author Daniel Rachfal
 * @link https://www.filestack.com/fileschool/react/react-file-upload/
 */
class UploadPrototype
{
    public function uploadFile()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['file'])) {
            // Get file data
            $file = $_FILES['file'];
            $fileName = $_POST['fileName'];

            // Define upload directory
            $uploadDir = 'uploads/';

            // Create the upload directory if it doesn't exist
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }

            // Define the file path
            $filePath = $uploadDir . basename($fileName);

            // Move the file to the upload directory
            if (move_uploaded_file($file['tmp_name'], $filePath)) {
                return array(
                    "message" => 'File uploaded successfully.'
                );
            } else {
                return array(
                    "message" => 'Error uploading file.'
                );
            }
        }
    }
}
