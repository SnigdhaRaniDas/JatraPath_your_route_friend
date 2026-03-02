export type BusData = {
  id: string;
  name: string;
  stops: string[];
  fareMatrix: {
    [from: string]: {
      [to: string]: number;
    };
  };
};

export type RouteSearchResult = {
  id: string;
  name: string;
  stops: string[];
  fareMatrix: {
    [from: string]: {
      [to: string]: number;
    };
  };
};