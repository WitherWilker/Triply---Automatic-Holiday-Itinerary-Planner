// [ARIF] Hero: gambar berganti otomatis tiap 6 detik (useState + useEffect).
// Tombol memakai router.push() untuk pindah ke halaman planner.
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { destinations } from '../data/destinations';
import { landing } from '../styles/landing.styles';
import PrimaryButton from './PrimaryButton';

export default function HeroSection() {
  const router = useRouter();

  // useState: menyimpan nomor kota yang sedang tampil
  const [index, setIndex] = useState(0);

  // useEffect: jalan sekali saat komponen muncul, membuat timer 6 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % destinations.length);
    }, 6000);

    // cleanup: timer dihentikan saat komponen hilang
    return () => clearInterval(timer);
  }, []);

  const current = destinations[index];

  const handleStart = () => {
    router.push({ pathname: '/planner', params: { city: current.name } });
  };

  return (
    <ImageBackground source={{ uri: current.image }} style={landing.hero}>
      <View style={landing.heroOverlay}>
        <Text style={landing.brand}>Triply</Text>

        <View>
          <Text style={landing.heroTitle}>{'Plan Less.\nTravel More.'}</Text>
          {/* inline style: label kota yang sedang tampil */}
          <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '700', marginTop: 8 }}>{current.name}</Text>
          <Text style={landing.heroText}>{current.description}</Text>
          <PrimaryButton label={'Plan my ' + current.name + ' trip'} icon="arrow-forward" onPress={handleStart} />
        </View>
      </View>
    </ImageBackground>
  );
}
