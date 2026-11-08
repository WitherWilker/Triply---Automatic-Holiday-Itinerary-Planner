// [ADI] Custom function: mengubah kode cuaca (WMO) dari API menjadi teks & ikon.
import type { Ionicons } from '@expo/vector-icons';

// Kode cuaca -> deskripsi (if / else if / else)
export function describeWeather(code: number): string {
  if (code === 0) {
    return 'Clear sky';
  } else if (code === 1 || code === 2) {
    return 'Partly cloudy';
  } else if (code === 3) {
    return 'Overcast';
  } else if (code === 45 || code === 48) {
    return 'Foggy';
  } else if (code >= 51 && code <= 57) {
    return 'Drizzle';
  } else if (code >= 61 && code <= 67) {
    return 'Rain';
  } else if (code >= 80 && code <= 82) {
    return 'Rain showers';
  } else if (code >= 95) {
    return 'Thunderstorm';
  } else {
    return 'Cloudy';
  }
}

// Apakah kode ini termasuk hujan? (true / false)
export function isRainyCode(code: number): boolean {
  return (code >= 51 && code <= 67) || (code >= 80 && code <= 99);
}

// Kode cuaca -> nama ikon Ionicons
export function getWeatherIcon(code: number): keyof typeof Ionicons.glyphMap {
  if (code === 0) {
    return 'sunny-outline';
  } else if (code === 1 || code === 2) {
    return 'partly-sunny-outline';
  } else if (code >= 95) {
    return 'thunderstorm-outline';
  } else if (isRainyCode(code)) {
    return 'rainy-outline';
  } else {
    return 'cloud-outline';
  }
}

// "2026-11-08" -> "Today" / "Tomorrow" / "Mon"
export function formatDayLabel(dateText: string, index: number): string {
  if (index === 0) {
    return 'Today';
  } else if (index === 1) {
    return 'Tomorrow';
  }
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const date = new Date(dateText + 'T00:00:00');
  return dayNames[date.getDay()];
}
