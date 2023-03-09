<?php
/**
 * no idea really
 * 
 * @author Jack Wilde w20022384
 */
include 'uploadDB.php';

header("Content-Type: application/json; charset=UTF-8");

 $uploadDB = new uploadDB;
 $output = $uploadDB->getData();
 
echo json_encode($output);