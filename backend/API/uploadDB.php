<?php
/**
 * uploadDB endpoint
 * 
 * work in progress
 * 
 * @author Jack Wilde w20022384
 */ 
include 'database.php';
include 'endpoint.php';

Class UploadDB extends Endpoint
{
    protected function initialiseSQL() {
        //get current unix time
        date_default_timezone_set('Europe/London');
        $date = time();

        $query = "SELECT * FROM files";

        $this->setSQL($query);
        $this->setSQLParams([]);
    }
}

