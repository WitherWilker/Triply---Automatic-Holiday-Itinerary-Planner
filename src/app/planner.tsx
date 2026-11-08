// [IDRIS] Halaman form (route "/planner"): user memilih kota, kategori, hari, traveler.
// Modul 2: useState untuk menyimpan pilihan, useEffect untuk bereaksi pada perubahan,
// router.push() ke /result dan router.back() untuk kembali.
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Chip from '../components/Chip';
import PrimaryButton from '../components/PrimaryButton';
import { categories } from '../data/categories';
import { destinations } from '../data/destinations';
import { planner } from '../styles/planner.styles';

const dayOptions = [1, 2, 3, 4, 5];

export default function PlannerScreen() {
  const router = useRouter();
  // useLocalSearchParams: membaca data kiriman dari router.push (params)
  const { city: cityParam } = useLocalSearchParams<{ city?: string }>();

  // useState: setiap pilihan user disimpan di state
  const [city, setCity] = useState<string>(cityParam ?? 'Bali');
  const [selected, setSelected] = useState<string[]>([]);
  const [days, setDays] = useState<number>(2);
  const [travelers, setTravelers] = useState<number>(2);
  const [error, setError] = useState<string>('');

  // useEffect #1: kalau kota dari halaman sebelumnya berubah, ikuti
  useEffect(() => {
    if (cityParam) {
      setCity(cityParam);
    }
  }, [cityParam]);

  // useEffect #2: pesan error hilang otomatis begitu user memilih kategori
  useEffect(() => {
    if (selected.length > 0) {
      setError('');
    }
  }, [selected]);

  // Pilih / batalkan kategori (boleh lebih dari satu)
  const toggleCategory = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((c) => c !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleGenerate = () => {
    if (selected.length === 0) {
      setError('Pick at least one category first.');
      return;
    }
    // params hanya boleh string, jadi angka & array diubah dulu
    router.push({
      pathname: '/result',
      params: { city, days: String(days), travelers: String(travelers), categories: selected.join(',') },
    });
  };

  return (
    <ScrollView style={planner.page} contentContainerStyle={planner.content}>
      <Text style={planner.label}>Where are you going?</Text>
      <Text style={planner.hint}>Choose one destination.</Text>
      <View style={planner.chipWrap}>
        {destinations.map((d) => (
          <Chip key={d.id} label={d.name} selected={city === d.name} onPress={() => setCity(d.name)} />
        ))}
      </View>

      <Text style={planner.label}>What kind of holiday?</Text>
      <Text style={planner.hint}>You can pick more than one.</Text>
      <View style={planner.chipWrap}>
        {categories.map((c) => (
          <Chip key={c.id} label={c.label} selected={selected.includes(c.id)} onPress={() => toggleCategory(c.id)} />
        ))}
      </View>

      <Text style={planner.label}>How many days?</Text>
      <Text style={planner.hint}>Choose the length of your trip.</Text>
      <View style={planner.chipWrap}>
        {dayOptions.map((d) => (
          <Chip key={d} label={d + (d === 1 ? ' Day' : ' Days')} selected={days === d} onPress={() => setDays(d)} />
        ))}
      </View>

      <Text style={planner.label}>Who's coming along?</Text>
      <Text style={planner.hint}>From 1 to 10 travelers.</Text>
      <View style={planner.counterRow}>
        <Pressable accessibilityLabel="Decrease travelers" style={planner.counterButton} onPress={() => setTravelers(Math.max(1, travelers - 1))}>
          <Text style={planner.counterButtonText}>−</Text>
        </Pressable>
        <Text style={planner.counterValue}>{travelers}</Text>
        <Pressable accessibilityLabel="Increase travelers" style={planner.counterButton} onPress={() => setTravelers(Math.min(10, travelers + 1))}>
          <Text style={planner.counterButtonText}>+</Text>
        </Pressable>
      </View>

      {error !== '' && <Text style={planner.error}>{error}</Text>}

      <View style={planner.actions}>
        <PrimaryButton label="Generate My Itinerary" icon="sparkles" onPress={handleGenerate} />
        <View style={planner.actionGap} />
        <PrimaryButton label="Back" variant="outline" onPress={() => router.back()} />
      </View>
    </ScrollView>
  );
}
