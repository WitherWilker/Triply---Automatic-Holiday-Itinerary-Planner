// [ADI] Halaman hasil (route "/result"): membaca params, lalu membuat itinerary.
// Modul 2: useState menyimpan hasil, useEffect menghitung itinerary saat halaman dibuka,
// router.back() & router.replace() untuk navigasi.
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { generateItinerary, getTotalCost } from '../algorithms/generateItinerary';
import DayCard from '../components/DayCard';
import PrimaryButton from '../components/PrimaryButton';
import TripSummary from '../components/TripSummary';
import { places } from '../data/places';
import { planner } from '../styles/planner.styles';
import { DayPlan, TripPreferences } from '../types';

export default function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ city?: string; days?: string; travelers?: string; categories?: string }>();

  // useState: hasil itinerary & preferensi disimpan di state
  const [prefs, setPrefs] = useState<TripPreferences | null>(null);
  const [plans, setPlans] = useState<DayPlan[]>([]);

  // useEffect: dijalankan saat halaman dibuka (dan kalau params berubah)
  useEffect(() => {
    const newPrefs: TripPreferences = {
      city: params.city ?? 'Bali',
      days: Number(params.days ?? 2), // params berupa string -> ubah ke angka
      travelers: Number(params.travelers ?? 2),
      categories: params.categories ? params.categories.split(',') : [],
      placesPerDay: 3,
    };
    setPrefs(newPrefs);
    setPlans(generateItinerary(newPrefs, places));
  }, [params.city, params.days, params.travelers, params.categories]);

  if (prefs === null) {
    return null; // belum selesai dihitung
  }

  return (
    <ScrollView style={planner.page} contentContainerStyle={planner.content}>
      <TripSummary prefs={prefs} totalPerPerson={getTotalCost(plans)} />

      {plans.map((plan) => (
        <DayCard key={plan.day} plan={plan} />
      ))}

      <View style={planner.actions}>
        <PrimaryButton label="Edit preferences" variant="outline" onPress={() => router.back()} />
        <View style={planner.actionGap} />
        <PrimaryButton label="Back to home" icon="home" onPress={() => router.replace('/')} />
      </View>
    </ScrollView>
  );
}
