/**
 * Page for previewing files
 * 
 * @author Jack Ambler
 * https://blog.devgenius.io/how-to-use-react-file-previewer-da7427ec1715
 * 
 * // TO DO LIST:
 * // -- LOOP THROUGH DIRECTORY 
 * //   -- ADD PREVIEW BUTTON FOR EACH ITEM 
 * //-- POSSIBLY NEED TO IMPORT PHP FROM SEPARATE FILE 

 * 
 */


import React, { useState } from "react";
import { Logger } from "logging-library";
import FileViewer from "react-file-viewer";
import { CustomErrorComponent } from "custom-error";

// const file = "excel.xlsx";
// const type = "xlsx";
// const file = "proposal.docx";
// const type = "docx";
// const file = "new_user_credentials.csv";
// const type = "csv";

function PreviewPage () {
<php>
    $url =
    '/PreviewTests/cat.jpg';

    $fileName = '$url';
    $fileNameParts = "explode('.', $fileName)";
    $ext = "end($fileNameParts)";
    echo $ext;

    $url2 =
    '/PreviewTests/Hello.pdf';

    $fileName2 = '$url2';
    $fileNameParts2 = "explode('.', $fileName2)";
    $ext2 = "end($fileNameParts2)";
    echo $ext2;
  </php>

//Gets file url, uses url to get file extension
const filePNG = "<?php echo $url; ?>";
const typePNG = "<?php echo $ext; ?>";

const file = "<?php echo $url2; ?>";
const type = "<?php echo $ext2; ?>";


  const [view, setView] = useState(false);
  const [viewImage, setView2] = useState(false);

  const handleView = () => {
    setView(!view);
  };
  const handleViewImage = () => {
    setView2(!viewImage);
  };

  const onError = (e) => {
    Logger.logError(e, "error in file-viewer");
  };

  return (
    <div>
      <ul>
      <li><button onClick={handleView}>View File</button></li>
      {view && (
        
        <FileViewer
          //fileType={type}
          filePath={file}
          errorComponent={CustomErrorComponent}
          onError={onError}
        />
      )}


      
      </ul>

      

    </div>
  );
};

export default PreviewPage;

//https://blog.devgenius.io/how-to-use-react-file-previewer-da7427ec1715

//export default App;

/*file={{
  data: "<base64 string>",
  mimeType: 'application/pdf',
  name: 'test_pdf.pdf' // for download
}}*/

/*

POSSIBLE DIRECTORY LOOP CODE -- TEST 
<?php
$dir = new DirectoryIterator(dirname(__FILE__));
foreach ($dir as $fileinfo) {
    if (!$fileinfo->isDot()) {
        var_dump($fileinfo->getFilename());
    }
}
?>

<php>
    $directory = 
    './cyberguardian-platform/backend/API/uploads';
    $fileList = scandir(string $directory, int $sorting_order = SCANDIR_SORT_ASCENDING, ?resource $context = null): array|false

    print_r($fileList);
  </php>




  OLD VIEW IMAGE BUTTON

  <li><button onClick={handleViewImage}>View File</button></li>
      {viewImage && (
        <FileViewer
          fileType={typePNG}
          filePath={filePNG}
          errorComponent={CustomErrorComponent}
          onError={onError}
        />
        )}
*/

