### Project Description

The purpose of this project was to build something which will help me learn the basics of the backend as well as TypeScript. It is an application in which a user can register, copy and submit a _image url_ which contains people in it. The image is then processed by Clarifai through their api which then suggests if a person from the picture is a celebrity and the general concepts of the image. Each user also has a score which get's updated everytime an image was uploaded succesfully.

The project code is split into 2 separate repositories:

- front-end
- back-end

The Front-End is built in React while using the React-Bootstrap library.
The backend is build in NodeJS while using ExpressJS and the database is stored using postgresql. The server is split into seperate files, one containing the server and the controllers of the API calls.

### Built with

- ReactJS
- TypeScript
- React-Bootstrap
- postgresql
- ClarifaiAPI
- NodeJS
