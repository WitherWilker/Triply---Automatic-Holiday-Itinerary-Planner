// [ADI] Interface untuk data cuaca dari API Open-Meteo.
// Ada 2 lapis: (1) bentuk data MENTAH dari API, (2) objek BERSIH yang dipakai aplikasi.

// (1) Data mentah dari API (nama field mengikuti API, jadi pakai underscore)
export interface WeatherApiResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  daily: {
    time: string[]; // contoh: ["2026-11-08", "2026-11-09", ...]
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: (number | null)[]; // peluang hujan (%)
  };
}

// Koordinat kota (dikirim ke API)
export interface Coordinates {
  city: string;
  latitude: number;
  longitude: number;
}

// Prakiraan satu hari
export interface DailyForecast {
  label: string; // "Today", "Tomorrow", "Mon", ...
  maxTemp: number;
  minTemp: number;
  rainChance: number;
  weatherCode: number;
  description: string;
}

// (2) Objek cuaca yang dipakai komponen
export interface Weather {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  description: string;
  isRainy: boolean;
  forecast: DailyForecast[];
}
