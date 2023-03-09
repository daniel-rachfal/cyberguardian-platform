<?php 
include 'database.php';

Class UploadDB
{
    public function __construct()
    {
        $this->upload();
    }

    private function upload()
    {
        $db = new Database("DB/development.sqlite");

        date_default_timezone_set('Europe/London');
        //get current time, unix format
        $date = time();

        $queryResult = $db->executeSQL("INSERT INTO files 
                                    (fileName, visibility, createdBy, createdAt) 
                                    VALUES ('testFileName', 1, 1, ".$date.")");
        print_r($queryResult);
    }
}

