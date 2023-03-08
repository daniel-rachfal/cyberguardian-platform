<?php 
include 'database.php';

$db = new Database("DB/development.sqlite");

date_default_timezone_set('Europe/London');
$date = time();

$queryResult = $db->executeSQL("INSERT INTO files 
                              (fileName, visibility, createdBy, createdAt) 
                              VALUES ('testFileName', 1, 1, '08/03/2023')");
print_r($queryResult);