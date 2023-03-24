/**
 * Page for previewing files
 * 
 * @author Jack Ambler
 */


import React, { useState } from "react";
import { Logger } from "logging-library";
import FileViewer from "react-file-viewer";
import { CustomErrorComponent } from "custom-error";

const filePNG = "cat.jpg";
const typePNG = "jpg";
const file = "Hello.pdf";
const type = "pdf";
// const file = "excel.xlsx";
// const type = "xlsx";
// const file = "proposal.docx";
// const type = "docx";
// const file = "new_user_credentials.csv";
// const type = "csv";

const App = () => {
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
    <>
      <button onClick={handleView}>View PDF</button>
      {view && (
        <FileViewer
          fileType={type}
          filePath={file}
          errorComponent={CustomErrorComponent}
          onError={onError}
        />
      )}

<button onClick={handleViewImage}>View Image</button>
      {viewImage && (
        <FileViewer
          fileType={typePNG}
          filePath={filePNG}
          errorComponent={CustomErrorComponent}
          onError={onError}
        />
      )}
    </>
  );
};

export default App;

//https://blog.devgenius.io/how-to-use-react-file-previewer-da7427ec1715

//export default App;

/*file={{
  data: "<base64 string>",
  mimeType: 'application/pdf',
  name: 'test_pdf.pdf' // for download
}}*/