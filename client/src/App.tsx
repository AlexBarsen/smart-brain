import React from "react";
import "./App.css";
import Particles from "react-particles-js";
import SignIn from "./components/SignIn/SignIn";
import Navigation from "./components/Navigation/Navigation";
import Register from "./components/Register/Register";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/ImageDetection";
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
    } else if (route === "home") {
      this.setState({ isSingedIn: true });
    }

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

  celebrityModelAPI = (input: string): void => {
    app.models
      .predict(Clarifai.CELEBRITY_MODEL, input)
      .then((response: ResponseObject) => {
        this.addFaceBox(this.addCelebrityConcepts(response));
      })
      .catch((err: Error) => console.log(err));
  };

  generalModelAPI = (input: string): void => {
    app.models
      .predict(Clarifai.GENERAL_MODEL, input)
      .then((response: ResponseObject) => {
        this.addGeneralConcepts(response);
      })
      .catch((err: Error) => console.log(err));
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
    this.generalModelAPI(this.state.inputImage);
    this.celebrityModelAPI(this.state.inputImage);
  };

  render() {
    console.log(this.state.user);
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
        <Navigation onRouteChange={this.onRouteChange} />
        {this.state.route === "home" ? (
          <>
            <ImageLinkForm
              onImageSubmit={this.onImageSubmit}
              onInputChange={this.onInputChange}
            />
            <FaceRecognition
              detection={this.state.detection}
              imageUrl={this.state.imageUrl}
            />
          </>
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