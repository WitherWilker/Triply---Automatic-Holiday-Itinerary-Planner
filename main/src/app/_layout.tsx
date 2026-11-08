// [ARIF] Layout root expo-router. Modul 2: <Slot /> diganti <Stack> + <Stack.Screen>.
// Setiap <Stack.Screen name="..."> harus sama dengan nama file di folder app/.
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../styles/theme';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.deep },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="planner" options={{ title: 'Plan your trip' }} />
        <Stack.Screen name="result" options={{ title: 'Your itinerary' }} />
      </Stack>
    </>
  );
}
