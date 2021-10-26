import React from "react";
import "./App.css";
import Particles from "react-particles-js";
import SignIn from "./components/SignIn/SignIn";
import Navigation from "./components/Navigation/Navigation";
import Register from "./components/Register/Register";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "6f6968867f3c4783ac2dd9f11db5bf79",
});

interface Props {}

interface State {
  route: string;
  isSingedIn: boolean;
  inputImage: string;
  imageUrl: string;
  boundingBoxes: any;
}

interface boundingBox {
  id: string;
  celebrityConcepts: any;
  generalConcepts: any;
  leftcol: Number;
  topRow: Number;
  rightCol: Number;
  bottomRow: Number;
}

interface User {}

const initialState: State = {
  route: "signIn",
  isSingedIn: false,
  inputImage: "",
  imageUrl: "",
  boundingBoxes: {
    id: "",
    celebrityConcepts: [],
    generalConcepts: [],
    leftcol: 0,
    topRow: 0,
    rightCol: 0,
    bottomRow: 0,
  },
};

// {
//   id: "",
//   celebrityConcepts: [],
//   generalConcepts: [],
//   leftcol: 0,
//   topRow: 0,
//   rightCol: 0,
//   bottomRow: 0,
// },

class App extends React.Component<Props, State> {
  constructor(props: State) {
    super(props);
    this.state = initialState;
  }

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

  calculateFaceLocation = (data: any) => {
    const regions = data.outputs[0].data.regions;
    const image: any = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    const boundingBoxes = regions.map((region: any) => {
      const { id } = region;
      const face = region.region_info.bounding_box;

      const celebrityConcepts = region.data.concepts
        .map((celebrity: any) => {
          return {
            id: celebrity.id,
            name: celebrity.name,
            value: celebrity.value,
          };
        })
        .slice(0, 3);

      return {
        celebrityConcepts: celebrityConcepts,
        id: id,
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - face.right_col * width,
        bottomRow: height - face.bottom_row * height,
      };
    });

    return boundingBoxes;
  };

  addGeneralConcepts = (data: any) => {
    console.log(data);
    const concepts = data.outputs[0].data.concepts
      .map((concept: any) => {
        return {
          id: concept.id,
          name: concept.name,
          value: concept.value,
        };
      })
      .slice(0, 5);

    console.log(this.state.boundingBoxes);
    console.log(concepts);
    this.setState((prevState) => ({
      boundingBoxes: [...prevState.boundingBoxes, concepts],
    }));
  };

  displayFaceBox = (boundingBox: any): void => {
    this.setState({ boundingBoxes: boundingBox });
  };

  celebrityModelAPI = (input: string): void => {
    app.models
      .predict(Clarifai.CELEBRITY_MODEL, this.state.inputImage)
      .then((response: Object) => {
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err: Error) => console.log(err));
  };

  generalModelAPI = (input: string): void => {
    app.models
      .predict(Clarifai.GENERAL_MODEL, this.state.inputImage)
      .then((response: Object) => {
        this.addGeneralConcepts(response);
      })
      .catch((err: Error) => console.log(err));
  };

  onImageSubmit = () => {
    this.setState({ boundingBoxes: [] });
    this.setState({ imageUrl: this.state.inputImage });
    this.celebrityModelAPI(this.state.inputImage);
    // this.generalModelAPI(this.state.inputImage);
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
        <Navigation onRouteChange={this.onRouteChange} />
        {this.state.route === "home" ? (
          <>
            <ImageLinkForm
              onImageSubmit={this.onImageSubmit}
              onInputChange={this.onInputChange}
            />
            <FaceRecognition
              boundingBoxes={this.state.boundingBoxes}
              imageUrl={this.state.inputImage}
            />
          </>
        ) : this.state.route === "signIn" ? (
          <SignIn onRouteChange={this.onRouteChange} />
        ) : (
          <Register />
        )}
      </div>
    );
  }
}

export default App;
