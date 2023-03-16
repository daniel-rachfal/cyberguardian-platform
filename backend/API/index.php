<?php

/**
 * no idea really
 * 
 * @author Jack Wilde w20022384
 */
include 'uploadDB.php';
include 'clienterrorexception.php';
include 'uploadPrototype.php';
include 'files.php';

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$url = $_SERVER['REQUEST_URI'];
$path = parse_url($url)['path'];
$path = str_replace("/cyberguardian-platform/backend/API/", "", $path);

switch ($path) {
    case 'upload':
    case 'upload/':
        $uploadDB = new uploadDB;
        $output = $uploadDB->getData();
        break;
    case 'getAllFiles':
    case 'getAllFiles/':
        //! Add Authentication
        $files = new Files;
        $output = $files->getData();
        break;
    case 'uploadPrototype':
        $proto = new UploadPrototype;
        $output = $proto->uploadFile();
        break;
    case '':
        $output = array(
            "message" => "It works!",
        );
        break;
    default:
        throw new ClientErrorException("Path not found");
}

echo json_encode($output);
