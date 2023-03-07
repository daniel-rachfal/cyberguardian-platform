<?php
require '../aws-sdk/aws-autoloader.php';
use Aws\S3\S3Client;  
use Aws\Exception\AwsException;

$s3Client = new S3Client([
'profile' => 'default',
'region' => 'us-east-2',
'version' => 'latest'
]);

$buckets = $s3Client->listBuckets();
foreach ($buckets['Buckets'] as $bucket) {
    echo $bucket['Name'] . "\n";
}

?>