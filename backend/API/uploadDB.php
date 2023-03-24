<?php
/**
 * uploadDB endpoint
 * 
 * work in progress
 * 
 * @author Jack Wilde w20022384
 * @author Daniel Rachfal
 */ 
include 'database.php';
include 'endpoint.php';

Class UploadDB extends Endpoint
{
    private $fileName;
    private $visibility;
    private $createdBy;

    protected function initialiseSQL() {
        //get current unix time
        date_default_timezone_set('Europe/London');
        $date = time();

        //if request isnt post, kill
        if($_SERVER['REQUEST_METHOD'] != 'POST')
        {
            die();
        }
        $this->setFileName($_POST['fileName']);
        $this->setVisibility($_POST['visibility']);

        $query= 
        (
        "INSERT INTO files 
        (fileName, visibility, createdBy, createdAt) 
        VALUES (:fileName, :visibility, :createdBy, ".$date.")"
        );

        //set PDO params
        $params = [];
        $params[':fileName'] = $this->getFileName();
        $params[':visibility'] = $this->getVisibility();
        $params[':createdBy'] = 1;
        $this->setSQL($query);
        $this->setSQLParams($params);
    }

    public function uploadFile()
    {
        if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['file']))
        {
            //get file data
            $file = $_FILES['file'];
            $fileName = $_POST['fileName'];

            //specify upload dir
            $uploadDir = 'uploads/';

            // Create the upload directory if it doesn't exist
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }

            //specify file path
            $filePath = $uploadDir . basename($fileName);

            // Move the file to the upload directory
            if (move_uploaded_file($file['tmp_name'], $filePath)) {
                $data[0] = "File uploaded successfully";
                $this->setData(array(
                    "data" => $data,
                    "length" => count($data),
                    "message" => "Success"
                ));
            } 
            else 
            {
                $data[0] = "Error uploading file";
                $this->setData(array(
                    "data" => $data,
                    "length" => count($data),
                    "message" => "Error"
                ));
            }
        }
    }

    protected function setFileName($fileName){
        $this->fileName = $fileName;
    }

    protected function getFileName(){
        return $this->fileName;
    }

    protected function setVisibility($visibility){
        $this->visibility = $visibility;
    }

    protected function getVisibility(){
        return $this->visibility;
    }

    protected function setCreatedBy($createdBy){
        $this->createdBy = $createdBy;
    }

    protected function getCreatedBy(){
        return $this->createdBy;
    }
}

