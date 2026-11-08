// [ADI] Inti Modul 3: mengambil data cuaca dari API eksternal (Open-Meteo, tanpa API key).
//
// Alur: fetchWeather(city)
//   -> getCoordinates(city)        (Promise buatan sendiri: resolve / reject)
//   -> fetch(url)                  (fungsi async bawaan)
//   -> response.json()             (fungsi async bawaan)
//   -> toWeather(...)              (data mentah -> objek Weather sesuai interface)
import { cityCoordinates } from '../data/cityCoordinates';
import { Coordinates, DailyForecast, Weather, WeatherApiResponse } from '../types/weather';
import { describeWeather, formatDayLabel, isRainyCode } from '../utils/weather';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

// Cache sederhana: kota -> data cuaca. Hilang saat aplikasi ditutup.
const cache: { [city: string]: Weather } = {};

// 1) Promise buatan sendiri.
//    resolve(x) = "berhasil, ini hasilnya"   reject(e) = "gagal, ini alasannya"
export function getCoordinates(city: string): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    const found = cityCoordinates.find((c) => c.city === city);
    if (found) {
      resolve(found);
    } else {
      reject(new Error('City "' + city + '" is not supported'));
    }
  });
}

// Menyusun alamat (URL) permintaan ke API
export function buildUrl(coords: Coordinates): string {
  return (
    BASE_URL +
    '?latitude=' + coords.latitude +
    '&longitude=' + coords.longitude +
    '&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max' +
    '&timezone=Asia%2FJakarta&forecast_days=3'
  );
}

// Mengubah data mentah API -> objek Weather (memakai interface)
function toWeather(city: string, data: WeatherApiResponse): Weather {
  const forecast: DailyForecast[] = [];
  for (let i = 0; i < data.daily.time.length; i++) {
    forecast.push({
      label: formatDayLabel(data.daily.time[i], i),
      maxTemp: Math.round(data.daily.temperature_2m_max[i]),
      minTemp: Math.round(data.daily.temperature_2m_min[i]),
      rainChance: data.daily.precipitation_probability_max[i] ?? 0,
      weatherCode: data.daily.weather_code[i],
      description: describeWeather(data.daily.weather_code[i]),
    });
  }

  return {
    city: city,
    temperature: Math.round(data.current.temperature_2m),
    humidity: data.current.relative_humidity_2m,
    windSpeed: Math.round(data.current.wind_speed_10m),
    weatherCode: data.current.weather_code,
    description: describeWeather(data.current.weather_code),
    isRainy: isRainyCode(data.current.weather_code),
    forecast: forecast,
  };
}

// 2) Custom async function: `await` menunggu Promise selesai sebelum lanjut ke baris berikutnya.
export async function fetchWeather(city: string): Promise<Weather> {
  // Sudah pernah diambil? Langsung selesai (resolve) tanpa memanggil API lagi.
  if (cache[city]) {
    return Promise.resolve(cache[city]);
  }

  const coords = await getCoordinates(city); // menunggu Promise buatan sendiri
  const response = await fetch(buildUrl(coords)); // fungsi async bawaan: kirim permintaan

  // Server membalas, tapi dengan kode error (404, 500, dst.) -> gagal (reject)
  if (!response.ok) {
    return Promise.reject(new Error('Server error (' + response.status + ')'));
  }

  const data: WeatherApiResponse = await response.json(); // fungsi async bawaan: baca isi balasan

  // Bentuk data tidak sesuai harapan -> gagal (reject)
  if (!data.current || !data.daily) {
    return Promise.reject(new Error('Unexpected weather data format'));
  }

  const weather = toWeather(city, data);
  cache[city] = weather; // simpan agar panggilan berikutnya lebih cepat
  return weather;
}
