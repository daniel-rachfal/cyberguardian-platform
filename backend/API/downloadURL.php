<?php
require '../aws-sdk/aws-autoloader.php';
use Aws\S3\S3Client;  
use Aws\Exception\AwsException;

//create s3 client
$s3Client = new S3Client([
    'profile' => 'default',
    'region'  => 'us-east-2',
    'version' => 'latest'
]);

//make command
$cmd = $s3Client->getCommand('GetObject', [
    'Bucket' => 'cyberguardianuseruploads',
    'Key' => 'kidor_frog1.jpg'
]);

//create request valid for 20 mins
$request = $s3Client->createPresignedRequest($cmd, '+20 minutes');

//get URL for request
$presignedurl = (string)$request->getUri();
echo($presignedurl);
?>