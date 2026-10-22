import { dressKindLabel, listingTypeLabel } from '@/lib/dress-listing';
import { dressLengthLabel, dressStyleLabel, normalizeDressLength, normalizeDressStyle } from '@/lib/dress-style-length';
import { getCleanDescription } from '@/lib/dress-display';
import { SANDBOX_DRESSES } from '@/lib/sandbox-catalog';
import type { CatalogPdfDress } from '@/lib/catalog-pdf/types';

export async function fetchAllCatalogPdfDresses(): Promise<CatalogPdfDress[]> {
  return SANDBOX_DRESSES.map((dress) => ({
    id: dress.id,
    name: dress.name,
    price: dress.price,
    size: dress.size,
    city: dress.city || '—',
    color: dress.color,
    description: getCleanDescription(dress.description),
    listingLabel: listingTypeLabel(String(dress.listing_type || 'rent')),
    kindLabel: dressKindLabel(String(dress.event_type || 'single')),
    styleLabel: dressStyleLabel(normalizeDressStyle(dress.dress_style)),
    lengthLabel: dressLengthLabel(normalizeDressLength(dress.dress_length)),
    imageUrl: dress.images[0] ?? null,
  }));
}
