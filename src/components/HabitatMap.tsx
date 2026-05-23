import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import type { HabitatPoint } from '../api/types';
import LeafletMapShell from './LeafletMapShell';

const KOREA_CENTER: LatLngExpression = [36.5, 127.5];

interface HabitatMapProps {
  points: HabitatPoint[];
}

export default function HabitatMap({ points }: HabitatMapProps) {
  return (
    <div className="h-[380px] w-full overflow-hidden rounded-3xl border-2 border-blush-100 bg-white p-1 shadow-soft">
      <LeafletMapShell className="flex h-full w-full items-center justify-center rounded-2xl bg-blush-50 text-sm text-blush-400">
      <MapContainer
        center={KOREA_CENTER}
        zoom={7}
        scrollWheelZoom={false}
        className="h-full w-full rounded-2xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((site) => (
          <CircleMarker
            key={`${site.name}-${site.lat}-${site.lng}`}
            center={[site.lat, site.lng]}
            radius={site.count && site.count > 20 ? 12 : 10}
            pathOptions={{
              color: '#e05580',
              fillColor: '#ffb3cc',
              fillOpacity: 0.9,
              weight: 2,
            }}
          >
            <Popup>
              <div className="min-w-[160px]">
                <p className="font-display text-blush-600">{site.name}</p>
                {site.note && <p className="text-sm text-blush-400">{site.note}</p>}
                {site.count != null && (
                  <p className="mt-1 text-sm font-medium text-lilac-500">관찰 {site.count}마리</p>
                )}
                {site.date && <p className="text-xs text-blush-300">{site.date}</p>}
                <p className="mt-2 text-[10px] text-blush-200">{site.source}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      </LeafletMapShell>
    </div>
  );
}
