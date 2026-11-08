// [ADI] Semua type & interface ada di sini.
import { Ionicons } from '@expo/vector-icons';

// Kota tujuan (dipakai di FlatList)
export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
}

// Tempat wisata
export interface Place {
  id: string;
  city: string; // harus sama dengan Destination.name
  name: string;
  categories: string[];
  rating: number;
  cost: number; // biaya masuk per orang (Rp)
  duration: number; // lama kunjungan (menit)
  openHours: string;
  description: string;
}

// Preferensi user (Modul 1: nilainya tetap, Modul 2: diisi dari form)
export interface TripPreferences {
  city: string;
  days: number;
  travelers: number;
  categories: string[];
  placesPerDay: number;
}

// Satu pemberhentian di itinerary
export interface Stop {
  time: string;
  place: Place;
}

// Rencana satu hari
export interface DayPlan {
  day: number;
  stops: Stop[];
}

// Kartu fitur "Why Triply"
export interface Feature {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  text: string;
}

// [ADI] Pilihan kategori liburan (dipakai di form planner)
export interface Category {
  id: string;
  label: string;
}
