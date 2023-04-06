# cyberguardian-platform
## Simple file upload/download with permission levels

## Features

- Upload files easily from your browser
- Set permission levels to restrict who can see your files
- View uploaded files

## Tech

cyberguardian-platform uses a number of open source projects to work properly:

- [ReactJS] - HTML enhanced for web apps
- [React Bootstrap] - Prepackaged styling for forms
- [Axios] - HTTP promise based response client for interacting with API
- [FirebaseJWT] - Authentication and login related bits
- [save video-react] - Displays videos in a basic player for Home Page

## Installation

cyberguardian-platform requires [React](https://react.dev/) to run

Install the dependencies and start the server.

```sh
cd cyberguardian-platform
npm install
npm start
```

The default path URLs follow (set in frontend/src/components/Api.js) may have to be changed depending on your system

Windows: http://localhost/cyberguardianplatform/backend/API

Mac: http://localhost:8000

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