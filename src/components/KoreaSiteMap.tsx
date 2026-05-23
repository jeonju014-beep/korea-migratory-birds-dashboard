import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import type { MapSite } from '../api/types';

const KOREA_CENTER: LatLngExpression = [36.5, 127.8];

interface KoreaSiteMapProps {
  sites: MapSite[];
}

export default function KoreaSiteMap({ sites }: KoreaSiteMapProps) {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-3xl border-2 border-blush-100 bg-white p-1 shadow-soft">
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
        {sites.map((site) => (
          <CircleMarker
            key={site.id}
            center={[site.lat, site.lng]}
            radius={site.isLapwing ? 12 : 9}
            pathOptions={{
              color: site.isLapwing ? '#e05580' : '#a855f7',
              fillColor: site.isLapwing ? '#f4729a' : '#c084fc',
              fillOpacity: 0.8,
              weight: 2,
            }}
          >
            <Popup>
              <div className="min-w-[180px]">
                <p className="font-display text-blush-600">{site.name}</p>
                <p className="text-sm text-blush-400">{site.region}</p>
                {site.note && <p className="mt-1 text-sm text-lilac-500">{site.note}</p>}
                <p className="mt-2 text-xs text-blush-300">{site.species.join(' · ')}</p>
                <p className="mt-2 text-[10px] text-blush-200">{site.source}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
