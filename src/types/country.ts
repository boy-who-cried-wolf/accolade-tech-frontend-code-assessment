export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  area: number;
  flags: {
    png: string;
    svg: string;
  };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages: {
    [key: string]: string;
  };
  borders: string[];
  maps: {
    googleMaps: string;
  };
  gdp?: number;
} 