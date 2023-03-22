<?php
define('DEVELOPMENT_MODE', true);

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
/**
 * no idea really
 * 
 * @author Jack Wilde w20022384
 */
include 'uploadDB.php';
include 'clienterrorexception.php';
include 'clienterror.php';
include 'base.php';
include 'authentication.php';
include 'registration.php';
include 'files.php';

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$url = $_SERVER['REQUEST_URI'];
$path = parse_url($url)['path'];
$path = str_replace("/cyberguardian-platform/backend/API/", "", $path);

try {
    switch ($path) {
        case 'upload':
        case 'upload/':
            $output = new uploadDB;
            $output->uploadFile();
            break;
        case 'index':
        case '/index':
            $output = new Base($path);
            break;
        case 'login':
        case '/login':
            $output = new Authenticate($path);
            break;
        case 'registration':
        case '/registration':
            $output = new Registration($path);
            break;
        case 'getAllFiles':
        case 'getAllFiles/':
            //! Add Authentication
            $files = new Files;
            $output = $files->getData();
            break;
        default:
            $output = new ClientError("Path not found: " . $path, 404);
    }
    $data = $output->getData();
    echo json_encode($data);
} catch (ClientErrorException $e) {
    $endpoint = new ClientError($e->getMessage(), $e->getCode());
}
