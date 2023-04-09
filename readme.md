# cyberguardian-platform
## Simple file upload/download with permission levels

## Features

- Sign Up
- Login
- Upload files easily from your browser
- Set permission levels to restrict who can see your files
- View uploaded files
- Admin file management system

## Tech

cyberguardian-platform uses a number of open source projects to work properly:

- [ReactJS] - HTML enhanced for web apps
- [React Bootstrap] - Prepackaged styling for forms
- [Axios] - HTTP promise based response client for interacting with API
- [FirebaseJWT] - Authentication and login related bits
- [save video-react] - Displays videos in a basic player for Home Page

## Installation

cyberguardian-platform requires [React](https://react.dev/) to run

### Backend PHP Installation

Move the backend folder to an appropriate directory/deployment site that your server such as Apache or XAMPP can access. No further configuration is needed as the SQLite database is included with the project.

Note: For the markers, the most suitable option is likely uploading the backend to newnumyspace in order to avoid CORS or permission errors.

### Frontend Installation

Install the dependencies and start the server.

```sh
cd cyberguardian-platform/frontend
npm install
npm start
```

The base path for API calls (set in frontend/src/components/Api.js) may have to be changed depending on your system

For local testing, the link will likely be:
- Windows: http://localhost/cyberguardian-platform/backend/API
- Mac/Linux: http://localhost:8000/cyberguardian-platform/backend/API
   - If using MAMP (XAMPP but for Mac), the port for Nikitas was 8888: http://localhost:8888/cyberguardian-platform/backend/API

Alternatively, if hosted onto a hosting service such as newnumyspace, an appropriate link should be used. 

### Frontend Deployment

```sh
cd cyberguardian-platform/frontend
npm run build
```

Follow the API changes noted in the Frontend Installation section. Deployment files should be generated in the frontend/build folder. Copy the contents of the folder (not the folder itself) along with the .htaccess file located in the root cyberguardian-platform folder. The frontend should be ready to view. 

## Notes

The default POST file upload on most systems is set to 128mb, however this will vary from system to system.
There is a hardcoded limit of 100mb set in /frontend/src/components/pages/UploadPage.js which can be changed.

## License

None

   [ReactJS]: <https://react.dev/>
   [Axios]: <https://axios-http.com/docs/intro>
   [FirebaseJWT]: <https://github.com/firebase/php-jwt>
   [React Bootstrap]: <https://react-bootstrap.github.io/>
   [save video-react]: <https://video-react.js.org/>
