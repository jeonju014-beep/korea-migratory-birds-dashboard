import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import { majorSites } from '../data/birds';
import LeafletMapShell from './LeafletMapShell';

const KOREA_CENTER: LatLngExpression = [36.5, 127.8];

export default function DistributionMap() {
  return (
    <div className="h-[440px] w-full overflow-hidden rounded-3xl border-2 border-blush-100 bg-white p-1 shadow-soft">
      <LeafletMapShell>
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
          {majorSites.map((site) => {
            const hasLapwing = site.species.some((s) => s.includes('댕기') || s.includes('물떼새'));
            return (
              <CircleMarker
                key={site.name}
                center={[site.lat, site.lng]}
                radius={hasLapwing ? 12 : 9}
                pathOptions={{
                  color: hasLapwing ? '#e05580' : '#a855f7',
                  fillColor: hasLapwing ? '#f4729a' : '#c084fc',
                  fillOpacity: 0.85,
                  weight: 2,
                }}
              >
                <Popup>
                  <div className="min-w-[180px]">
                    <p className="font-display text-blush-600">{site.name}</p>
                    <p className="text-sm text-blush-400">{site.region}</p>
                    {site.count && <p className="mt-1 text-sm text-lilac-500">{site.count}</p>}
                    <p className="mt-2 text-xs text-blush-300">{site.species.join(' · ')}</p>
                    <p className="mt-1 text-[10px] text-blush-200">관찰 시기: {site.season}</p>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </LeafletMapShell>
    </div>
  );
}
