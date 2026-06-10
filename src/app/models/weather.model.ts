export interface WeatherData {
  city: string;
  country: string;
  temperature: {
    current: number;
    feelsLike: number;
    min: number;
    max: number;
    unit: string;
  };
  humidity: number;
  wind: {
    speed: number;
    unit: string;
  };
  condition: {
    main: string;
    description: string;
    icon: string;
  };
  visibility: number;
  timestamp: string;
}
