<?php 
require '../aws-sdk/aws-autoloader.php';
use Aws\S3\Exception\S3Exception;
use Aws\S3\S3Client; 

try{
    // Create an S3 client
    $s3client = new S3Client([
        'profile' => 'default',
        'region'  => 'us-east-2',
        'version' => '2006-03-01'
    ]);

    //path of file to be uploaded
    $source = 'C:\Users\jackw\Desktop\testdir\phpuploadtest.txt';

    // Where the files will be transferred to
    $bucket = 'cyberguardianuseruploads';

    //object name on aws when uploaded
    $key = 'phpuploadtest2.txt';

    $result = $s3client->putObject([
        'Bucket' => $bucket,
        'Key' => $key,
        'SourceFile' => $source
    ]);
} catch(S3Exception $e){
    echo $e->getMessage() . "\n";
}
?>