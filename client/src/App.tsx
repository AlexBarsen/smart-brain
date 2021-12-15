import React from "react";
import "./App.css";
import Particles from "react-particles-js";
import SignIn from "./components/SignIn/SignIn";
import Navigation from "./components/Navigation/Navigation";
import Register from "./components/Register/Register";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/ImageDetection/ImageDetection";
import Dashboard from "./components/Dashboard/Dashboard";
import Clarifai from "clarifai";

import {
  DetectionValues,
  GeneralConcepts,
  User,
} from "./components/interfaces";

interface AppProps {}

interface AppState {
  route: string;
  isSingedIn: boolean;
  inputImage: string;
  imageUrl: string;
  user: User;
  detection: {
    detectedValues: DetectionValues[];
    generalConcepts: GeneralConcepts[];
  };
}

interface ResponseObject {
  outputs: Array<any>;
  rawData: Object;
  status: Object;
}

interface ConceptsObject {
  id: string;
  name: string;
  value: number;
  app_id: string;
}

interface RegionObject {
  data: {
    concepts: Array<any>;
  };
  id: string;
  region_info: {
    bounding_box: {
      bottom_row: number;
      left_col: number;
      right_col: number;
      top_row: number;
    };
  };
  value: number;
}

const app = new Clarifai.App({
  apiKey: "6f6968867f3c4783ac2dd9f11db5bf79",
});

const initialState: AppState = {
  route: "signIn",
  isSingedIn: false,
  inputImage: "",
  imageUrl: "",
  user: {
    id: null,
    email: "",
    username: "",
    entries: null,
    joined: null,
  },
  detection: {
    detectedValues: [],
    generalConcepts: [],
  },
};

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppState) {
    super(props);
    this.state = initialState;
  }

  loadUser = (user: User) => {
    this.setState({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        entries: user.entries,
        joined: user.joined,
      },
    });
    this.onRouteChange("home");
  };

  onRouteChange = (route: string) => {
    if (route === "signOut") {
      this.setState({ isSingedIn: false });
    } else if (route === "signIn") {
      this.setState({ isSingedIn: false });
    } else if (route === "home") {
      this.setState({ isSingedIn: true });
    }
    console.log(route);

    this.setState({ route: route });
  };

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputImage: event?.target.value });
  };

  convertToPercentage = (value: number) => {
    const percentage = value * 100;
    return percentage.toString().substring(0, 4) + "%";
  };

  capitalizeName = (name: string) => {
    const fullName = name.split(" ");
    return fullName
      .map((name: string) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(" ");
  };

  addCelebrityConcepts = (data: ResponseObject) => {
    const regions = data.outputs[0].data.regions;

    const image: any = document.getElementById("inputImage");

    const width = Number(image.width);
    const height = Number(image.height);

    const detection = regions.map((region: RegionObject) => {
      const { id } = region;
      const face = region.region_info.bounding_box;

      const celebrityConcepts = region.data.concepts
        .map((celebrity: ConceptsObject) => {
          return {
            id: celebrity.id,
            name: this.capitalizeName(celebrity.name),
            probability: this.convertToPercentage(celebrity.value),
          };
        })
        .slice(0, 5);

      return {
        id: id,
        celebrityConcepts: celebrityConcepts,
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - face.right_col * width,
        bottomRow: height - face.bottom_row * height,
      };
    });

    return detection;
  };

  addGeneralConcepts = (data: ResponseObject) => {
    const generalConcepts = data.outputs[0].data.concepts
      .map((concept: ConceptsObject) => {
        return {
          id: concept.id,
          name: concept.name.charAt(0).toUpperCase() + concept.name.slice(1),
          probability: this.convertToPercentage(concept.value),
        };
      })
      .slice(0, 10);

    this.setState((prevState) => ({
      ...prevState,
      detection: {
        ...prevState.detection,
        generalConcepts: generalConcepts,
      },
    }));
  };

  addFaceBox = (detectedValues: DetectionValues[]): void => {
    this.setState((prevState) => ({
      ...prevState,
      detection: { ...prevState.detection, detectedValues },
    }));
  };

  onImageSubmit = () => {
    this.setState((prevState) => ({
      ...prevState,
      detection: {
        detectedValues: [],
        generalConcepts: [],
      },
    }));
    this.setState({ imageUrl: this.state.inputImage });
    Promise.all([
      app.models.predict(Clarifai.GENERAL_MODEL, this.state.inputImage),
      app.models.predict(Clarifai.CELEBRITY_MODEL, this.state.inputImage),
    ]).then((responses) => {
      if (responses) {
        fetch("http://localhost:3001/image", {
          method: "put",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ id: this.state.user.id }),
        })
          .then((response) => response.json())
          .then((entries) =>
            this.setState((prevState) => ({
              ...prevState,
              user: {
                id: this.state.user.id,
                email: this.state.user.email,
                username: this.state.user.username,
                entries: entries,
                joined: this.state.user.joined,
              },
            }))
          )
          .catch((err) => console.log(err));

        Promise.all(
          responses.map((response) =>
            response.outputs[0].model.name === "general"
              ? this.addGeneralConcepts(response)
              : this.addFaceBox(this.addCelebrityConcepts(response))
          )
        );
      }
    });
  };

  render() {
    return (
      <div className="App">
        <Particles
          className="particles"
          params={{
            particles: {
              number: {
                value: 30,
                density: {
                  enable: true,
                  value_area: 800,
                },
              },
            },
          }}
        />
        <Navigation
          isSignedIn={this.state.isSingedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? (
          <div className="d-flex justify-content-center home">
            <Dashboard
              entries={this.state.user.entries}
              user={this.state.user}
            />
            <div className="d-flex flex-column justify-content-center image-detection-wrapper">
              <ImageLinkForm
                onImageSubmit={this.onImageSubmit}
                onInputChange={this.onInputChange}
              />
              <FaceRecognition
                detection={this.state.detection}
                imageUrl={this.state.imageUrl}
              />
            </div>
          </div>
        ) : this.state.route === "signIn" ? (
          <SignIn loadUser={this.loadUser} />
        ) : (
          <Register loadUser={this.loadUser} />
        )}
      </div>
    );
  }
}

export default App;
