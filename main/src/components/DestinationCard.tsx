// [ARIF] Satu kartu kota. Tombol mengirim nama kota ke halaman planner lewat router.push().
import { useRouter } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { landing } from '../styles/landing.styles';
import { Destination } from '../types';
import PrimaryButton from './PrimaryButton';

type Props = { destination: Destination };

export default function DestinationCard({ destination }: Props) {
  const router = useRouter();

  const handlePlan = () => {
    router.push({ pathname: '/planner', params: { city: destination.name } });
  };

  return (
    <View style={landing.destCard}>
      <Image source={{ uri: destination.image }} style={landing.destImage} />
      <View style={landing.destBody}>
        <Text style={landing.destName}>{destination.name}</Text>
        <Text style={landing.destDesc}>{destination.description}</Text>
        <PrimaryButton label="Plan trip" variant="outline" onPress={handlePlan} />
      </View>
    </View>
  );
}
