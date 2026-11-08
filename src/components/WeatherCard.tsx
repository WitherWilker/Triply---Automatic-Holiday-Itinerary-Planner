// [IDRIS] Kartu cuaca satu kota (dipakai di halaman result).
// Memakai fetchWeather() lewat .then() / .catch() / .finally(),
// dan useState + useEffect dari Modul 2.
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { fetchWeather } from '../services/weatherApi';
import { colors } from '../styles/theme';
import { weatherStyles } from '../styles/weather.styles';
import { Weather } from '../types/weather';
import { getWeatherIcon } from '../utils/weather';
import PrimaryButton from './PrimaryButton';

type Props = { city: string };

export default function WeatherCard({ city }: Props) {
  // useState: tiga kemungkinan tampilan -> sedang memuat, gagal, atau berhasil
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [attempt, setAttempt] = useState<number>(0); // dinaikkan oleh tombol "Try again"

  // useEffect: jalan saat kartu muncul, saat kota berganti, atau saat `attempt` naik
  useEffect(() => {
    setLoading(true);
    setError('');

    fetchWeather(city)
      .then((result) => setWeather(result)) // Promise berhasil (resolve)
      .catch((err: Error) => setError(err.message)) // Promise gagal (reject)
      .finally(() => setLoading(false)); // selalu jalan, berhasil atau gagal
  }, [city, attempt]);

  // 1) Sedang memuat
  if (loading) {
    return (
      <View style={weatherStyles.card}>
        <View style={weatherStyles.center}>
          <ActivityIndicator color={colors.deep} />
          <Text style={weatherStyles.loadingText}>Loading weather for {city}...</Text>
        </View>
      </View>
    );
  }

  // 2) Gagal
  if (error !== '' || weather === null) {
    return (
      <View style={weatherStyles.card}>
        <Text style={weatherStyles.errorTitle}>Weather is not available</Text>
        <Text style={weatherStyles.errorText}>{error}</Text>
        <PrimaryButton label="Try again" variant="outline" icon="refresh" onPress={() => setAttempt(attempt + 1)} />
      </View>
    );
  }

  // 3) Berhasil
  const rainLikely = weather.isRainy || weather.forecast[0].rainChance >= 50;

  return (
    <View style={weatherStyles.card}>
      <Text style={weatherStyles.title}>Weather in {weather.city}</Text>

      <View style={weatherStyles.nowRow}>
        <Ionicons name={getWeatherIcon(weather.weatherCode)} size={44} color={colors.accent} />
        <View>
          <Text style={weatherStyles.nowTemp}>{weather.temperature}°C</Text>
          <Text style={weatherStyles.nowDesc}>{weather.description}</Text>
        </View>
      </View>

      <View style={weatherStyles.metricRow}>
        <View style={weatherStyles.metric}>
          <Text style={weatherStyles.metricLabel}>Humidity</Text>
          <Text style={weatherStyles.metricValue}>{weather.humidity}%</Text>
        </View>
        <View style={weatherStyles.metric}>
          <Text style={weatherStyles.metricLabel}>Wind</Text>
          <Text style={weatherStyles.metricValue}>{weather.windSpeed} km/h</Text>
        </View>
      </View>

      <View style={weatherStyles.forecastRow}>
        {weather.forecast.map((day) => (
          <View key={day.label} style={weatherStyles.forecastItem}>
            <Text style={weatherStyles.forecastLabel}>{day.label}</Text>
            <Ionicons name={getWeatherIcon(day.weatherCode)} size={24} color={colors.deep} />
            <Text style={weatherStyles.forecastTemp}>
              {day.maxTemp}° / {day.minTemp}°
            </Text>
            <Text style={weatherStyles.forecastRain}>Rain {day.rainChance}%</Text>
          </View>
        ))}
      </View>

      <View style={weatherStyles.tip}>
        <Text style={weatherStyles.tipText}>
          {rainLikely
            ? 'Rain is likely. Bring an umbrella and keep indoor places as a backup.'
            : 'Good weather for outdoor places. Enjoy your trip!'}
        </Text>
      </View>
    </View>
  );
}
