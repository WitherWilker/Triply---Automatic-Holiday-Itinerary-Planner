// [IDRIS] Pilihan yang bisa ditekan (kota, kategori, durasi). Berubah warna kalau `selected`.
import { Pressable, Text } from 'react-native';
import { planner } from '../styles/planner.styles';
import { colors } from '../styles/theme';

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void; // callback dari halaman induk
};

export default function Chip({ label, selected, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      // inline style: warna tergantung state `selected`
      style={[planner.chip, selected && { backgroundColor: colors.ink, borderColor: colors.ink }]}
    >
      <Text style={[planner.chipText, selected && { color: colors.white }]}>{label}</Text>
    </Pressable>
  );
}
