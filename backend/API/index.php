<?php
/**
 * no idea really
 * 
 * @author Jack Wilde w20022384
 */
include 'uploadDB.php';
include 'clienterrorexception.php';

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$url = $_SERVER['REQUEST_URI'];
$path = parse_url($url)['path'];

switch($path)
{
    case '/yr3/cyberguardian-platform/backend/API/upload':
    case '/yr3/cyberguardian-platform/backend/API/upload/':
        $uploadDB = new uploadDB;
        $output = $uploadDB->getData();
        break;
    default:
        throw new ClientErrorException("Path not found");
}

echo json_encode($output);