<?php
//getting aws sdk files
require '../aws-sdk/aws-autoloader.php';
use Aws\S3\S3Client;  
use Aws\Exception\AwsException;

//Creation of a aws s3 client specifying relevant options
$s3Client = new S3Client([
'profile' => 'default',
'region' => 'us-east-2',
'version' => 'latest'
]);

//list all buckets that belong to the s3 client (only one in our case)
$buckets = $s3Client->listBuckets();
foreach ($buckets['Buckets'] as $bucket) {
    echo $bucket['Name'] . "\n";
}

?>