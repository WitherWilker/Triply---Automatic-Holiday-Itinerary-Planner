// [IDRIS] External styles: kartu cuaca di halaman result.
import { StyleSheet } from 'react-native';
import { colors } from './theme';

export const weatherStyles = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: 20, padding: 18, marginBottom: 16 },
  title: { color: colors.ink, fontSize: 18, fontWeight: '800', marginBottom: 12 },

  // Loading & error
  center: { alignItems: 'center', paddingVertical: 12 },
  loadingText: { color: colors.muted, fontSize: 14, marginTop: 8 },
  errorTitle: { color: colors.ink, fontSize: 16, fontWeight: '700' },
  errorText: { color: colors.muted, fontSize: 14, marginTop: 4, marginBottom: 14 },

  // Cuaca sekarang
  nowRow: { flexDirection: 'row', alignItems: 'center' },
  nowTemp: { color: colors.ink, fontSize: 44, fontWeight: '800', marginLeft: 12 },
  nowDesc: { color: colors.muted, fontSize: 14, marginLeft: 12, marginTop: 2 },
  metricRow: { flexDirection: 'row', marginTop: 14 },
  metric: { flex: 1 },
  metricLabel: { color: colors.muted, fontSize: 12 },
  metricValue: { color: colors.ink, fontSize: 16, fontWeight: '700' },

  // Prakiraan 3 hari
  forecastRow: { flexDirection: 'row', marginTop: 16, paddingTop: 14, borderTopWidth: 1, borderTopColor: colors.line },
  forecastItem: { flex: 1, alignItems: 'center' },
  forecastLabel: { color: colors.ink, fontSize: 13, fontWeight: '700', marginBottom: 4 },
  forecastTemp: { color: colors.ink, fontSize: 13, marginTop: 4 },
  forecastRain: { color: colors.deep, fontSize: 12, marginTop: 2 },

  // Saran
  tip: { marginTop: 14, backgroundColor: colors.accentSoft, borderRadius: 12, padding: 12 },
  tipText: { color: colors.ink, fontSize: 13, lineHeight: 18 },
});
