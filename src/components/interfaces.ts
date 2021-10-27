export interface DetectionValues {
  id: string;
  celebrityConcepts: [
    {
      id: string;
      name: string;
      probability: string;
    }
  ];
  leftCol: number;
  topRow: number;
  rightCol: number;
  bottomRow: number;
}

export interface CelebrityConcepts {
  id: string;
  name: string;
  probability: string;
}

export interface GeneralConcepts {
  id: string;
  name: string;
  probability: string;
}

export interface BoundingBox {
  id: string;
  celebrityConcepts: [
    {
      id: string;
      name: string;
      probability: string;
    }
  ];
  leftCol: number;
  topRow: number;
  rightCol: number;
  bottomRow: number;
}

export interface User {}
