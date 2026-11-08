// [IDRIS] External styles: halaman planner (form) dan halaman result.
import { StyleSheet } from 'react-native';
import { colors } from './theme';

export const planner = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 22, paddingBottom: 48 },
  label: { color: colors.ink, fontSize: 20, fontWeight: '800', marginTop: 24 },
  hint: { color: colors.muted, fontSize: 13, marginTop: 2, marginBottom: 12 },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 999, borderWidth: 1.5, borderColor: colors.line, backgroundColor: colors.card, marginRight: 8, marginBottom: 8 },
  chipText: { color: colors.ink, fontSize: 14, fontWeight: '600' },
  counterRow: { flexDirection: 'row', alignItems: 'center' },
  counterButton: { width: 48, height: 48, borderRadius: 24, borderWidth: 1.5, borderColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
  counterButtonText: { color: colors.ink, fontSize: 24, fontWeight: '600' },
  counterValue: { color: colors.ink, fontSize: 30, fontWeight: '800', minWidth: 64, textAlign: 'center' },
  error: { color: '#C2410C', fontSize: 14, marginTop: 20 },
  actions: { marginTop: 28 },
  actionGap: { height: 12 },
});
