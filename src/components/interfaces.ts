export interface DetectionValues {
  id: string;
  celebrityConcepts: {
    id: string;
    name: string;
    probability: string;
  };
  leftcol: Number;
  topRow: Number;
  rightCol: Number;
  bottomRow: Number;
}

export interface GeneralConcepts {
  id: string;
  name: string;
  probability: string;
}

export interface User {}
