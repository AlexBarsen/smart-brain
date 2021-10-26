export interface AppProps {}

export interface AppState {
  route: string;
  isSingedIn: boolean;
  inputImage: string;
  imageUrl: string;
  detection: {
    detectedValues: DetectionValues[];
    generalConcepts: GeneralConcepts[];
  };
}

export interface DetectionValues {
  id: string;
  celebrityConcepts: {
    id: string;
    name: string;
    value: Number;
  };
  leftcol: Number;
  topRow: Number;
  rightCol: Number;
  bottomRow: Number;
}

export interface GeneralConcepts {
  id: string;
  name: string;
  value: Number;
}

export interface User {}
