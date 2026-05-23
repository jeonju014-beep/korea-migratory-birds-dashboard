import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import { lapwingHabitats } from '../data/lapwing';
import LeafletMapShell from './LeafletMapShell';

const KOREA_CENTER: LatLngExpression = [36.5, 127.5];

export default function HabitatMap() {
  return (
    <div className="h-[380px] w-full overflow-hidden rounded-3xl border-2 border-blush-100 bg-white p-1 shadow-soft">
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
          {lapwingHabitats.map((site) => (
            <CircleMarker
              key={site.name}
              center={[site.lat, site.lng]}
              radius={11}
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
                  <p className="mt-2 text-[10px] text-blush-200">국내 관찰·월동 서식지</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </LeafletMapShell>
    </div>
  );
}
