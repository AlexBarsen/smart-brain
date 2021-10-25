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
}

interface User {}

const initialState: State = {
  route: "signIn",
  isSingedIn: false,
  inputImage: "",
  imageUrl: "",
};

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

  onImageSubmit = () => {
    console.log("buci");
    this.setState({ imageUrl: this.state.inputImage });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.inputImage)
      .then((response: Object) => console.log(response))
      .catch((err: Error) => console.log(err));
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
            <FaceRecognition imageUrl={this.state.inputImage} />
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
