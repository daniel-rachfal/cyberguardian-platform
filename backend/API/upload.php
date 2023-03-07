<?php 
require '../aws-sdk/aws-autoloader.php';
use Aws\S3\Exception\S3Exception;
use Aws\S3\S3Client; 

try{
    // Create an S3 client
    $s3Client = new S3Client([
        'profile' => 'default',
        'region'  => 'us-east-2',
        'version' => 'latest'
    ]);

    //path of file to be uploaded
    $source = 'C:\Users\jackw\Desktop\testdir\phpuploadtest.txt';

    // Where the files will be transferred to
    $bucket = 'cyberguardianuseruploads';

    //object name on aws when uploaded
    $key = 'phpuploadtest2.txt';

    $result = $s3Client->putObject([
        'Bucket' => $bucket,
        'Key' => $key,
        'SourceFile' => $source
    ]);
} catch(S3Exception $e){
    echo $e->getMessage() . "\n";
}
echo $result;
?>