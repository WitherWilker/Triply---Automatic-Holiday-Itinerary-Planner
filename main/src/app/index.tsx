// [ARIF] Halaman utama (route "/"). Modul 2: tombol pindah halaman pakai router.push().
import { useRouter } from 'expo-router';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { generateItinerary, getTotalCost } from '../algorithms/generateItinerary';
import DayCard from '../components/DayCard';
import DestinationCard from '../components/DestinationCard';
import FeatureCard from '../components/FeatureCard';
import HeroSection from '../components/HeroSection';
import PrimaryButton from '../components/PrimaryButton';
import TripSummary from '../components/TripSummary';
import { destinations } from '../data/destinations';
import { features } from '../data/features';
import { places } from '../data/places';
import { samplePreferences } from '../data/samplePreferences';
import { landing } from '../styles/landing.styles';

export default function Index() {
  const router = useRouter();

  // Itinerary contoh dihitung dari preferensi tetap
  const plans = generateItinerary(samplePreferences, places);
  const totalPerPerson = getTotalCost(plans);

  return (
    <ScrollView style={landing.page}>
      <HeroSection />

      {/* Daftar kota memakai FlatList (horizontal) */}
      <View style={landing.section}>
        <Text style={landing.sectionTitle}>Where are you going?</Text>
        <Text style={landing.sectionSubtitle}>Pick a destination to start.</Text>
        <FlatList
          data={destinations}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <DestinationCard destination={item} />}
        />
      </View>

      {/* Contoh hasil itinerary */}
      <View style={landing.section}>
        <Text style={landing.sectionTitle}>Sample itinerary</Text>
        <Text style={landing.sectionSubtitle}>This is what Triply creates for you.</Text>
        <TripSummary prefs={samplePreferences} totalPerPerson={totalPerPerson} />
        {plans.map((plan) => (
          <DayCard key={plan.day} plan={plan} />
        ))}
      </View>

      {/* Why Triply */}
      <View style={landing.section}>
        <Text style={landing.sectionTitle}>Why plan with Triply?</Text>
        <Text style={landing.sectionSubtitle}>Less planning, more traveling.</Text>
        {features.map((f) => (
          <FeatureCard key={f.id} feature={f} />
        ))}
      </View>

      <View style={landing.footer}>
        <Text style={landing.footerTitle}>Ready for your next trip?</Text>
        <PrimaryButton
          label="Start Planning"
          icon="airplane"
          onPress={() => router.push('/planner')}
        />
      </View>
    </ScrollView>
  );
}
