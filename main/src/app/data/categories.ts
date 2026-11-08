// [ADI] Array of objects: kategori liburan untuk chip di halaman planner.
// id harus sama dengan isi `categories` di places.ts
import { Category } from '../types';

export const categories: Category[] = [
  { id: 'nature', label: 'Nature' },
  { id: 'beach', label: 'Beach' },
  { id: 'city', label: 'City' },
  { id: 'culture', label: 'Culture' },
  { id: 'culinary', label: 'Culinary' },
  { id: 'shopping', label: 'Shopping' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'sunset', label: 'Sunset' },
  { id: 'cafe', label: 'Cafe' },
  { id: 'adventure', label: 'Adventure' },
  { id: 'family', label: 'Family' },
  { id: 'instagrammable', label: 'Instagrammable' },
];
