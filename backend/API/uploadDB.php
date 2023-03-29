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

        //if request isnt post, kill
        if($_SERVER['REQUEST_METHOD'] != 'POST')
        {
            throw new ClientErrorException("Invalid request method", 405);
        }
        if(!(isset($_POST['fileName']) && isset($_POST['visibility'])))
        {
            throw new ClientErrorException("Invalid params", 400);
        }

        $this->setfileTitle($_POST['fileTitle']);
        $this->setFileName($_POST['fileName']);
        $this->setVisibility($_POST['visibility']);
        $this->setCreatedBy($_POST['createdBy']);
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
        if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['file']))
        {
            $this->validateToken();
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

    //validate token
    private function validateToken() 
    {   
        $allHeaders = getallheaders();
        $authorizationHeader = "";
        
        if (array_key_exists('Authorization', $allHeaders)) 
        {
          $authorizationHeader = $allHeaders['Authorization'];
        } elseif (array_key_exists('authorization', $allHeaders)) 
        {
          $authorizationHeader = $allHeaders['authorization'];
        }
              
        if (substr($authorizationHeader, 0, 7) != 'Bearer ') 
        {
          throw new ClientErrorException("Bearer token required", 401);
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

