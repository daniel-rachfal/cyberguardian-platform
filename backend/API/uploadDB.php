<?php
/**
 * uploadDB endpoint
 * 
 * Functionality for uploading files to server and updating records in DB
 * 
 * @author Jack Wilde w20022384
 * @author Daniel Rachfal
 */ 

include 'database.php';
include 'endpoint.php';

header("Access-Control-Allow-Origin: *");

Class UploadDB extends Endpoint
{
    private $fileTitle;
    private $fileName;
    private $visibility;
    private $createdBy;

    protected function initialiseSQL() {
        //get current unix time
        date_default_timezone_set('Europe/London');
        $date = time();

        //check request is POST
        $this->validateRequestMethod("POST");
        //check params are set
        $this->validateParams();

        $this->setfileTitle($_POST['fileTitle']);
        $this->setFileName($_POST['fileName']);
        $this->setVisibility($_POST['visibility']);
        $this->setCreatedBy($_POST['createdBy']);

        //create SQL query
        $query= 
        (
        "INSERT INTO files 
        (fileTitle,fileName, visibility, createdBy, createdAt) 
        VALUES (:fileTitle, :fileName, :visibility, :createdBy, ".$date.")"
        );

        //set PDO params
        $params = [];
        $params[':fileTitle'] = $this->getFileTitle();
        $params[':fileName'] = $this->getFileName();
        $params[':visibility'] = $this->getVisibility();
        $params[':createdBy'] = $this->getCreatedBy();
        $this->setSQL($query);
        $this->setSQLParams($params);
    }

    public function uploadFile()
    {
        $db = new Database("DB/development.sqlite");
        //select newest file id
        $query = 
        (
            "SELECT id
            FROM files
            ORDER BY id DESC
            LIMIT 1"
        );
        $params = [];
        $data = $db->executeSQL($query, $params);
        $x = $data[0]['id'];
        $latest = strval($x);
        $latest = $latest . "_";

        //validate user logged in
        $this->validateJWT();
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
        $filePath = $uploadDir . $latest . basename($fileName);

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

    //check expected params have been set
    private function validateParams()
    {
        if(!isset($_POST['fileTitle']) || !isset($_POST['fileName']) || !isset($_POST['visibility']) || !isset($_POST['createdBy']) || !isset($_FILES['file']))
        {
            throw new ClientErrorException("Params not set", 400);
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

    protected function setFileTitle($fileTitle){
        $this->fileTitle = $fileTitle;
    }

    protected function getFileTitle(){
        return $this->fileTitle;
    }
}

