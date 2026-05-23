import { MapContainer, TileLayer, CircleMarker, Popup, Polyline } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import { migrationRoute, migrationPath, returnPath } from '../data/lapwing';
import LeafletMapShell from './LeafletMapShell';

const EURASIA_CENTER: LatLngExpression = [48, 70];

/** CARTO Voyager — English place labels worldwide */
const ENGLISH_TILE = {
  url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

const typeStyles = {
  breeding: { color: '#c084fc', fill: '#e9d5ff', label: 'Breeding' },
  stopover: { color: '#f4729a', fill: '#ffd1df', label: 'Stopover' },
  wintering: { color: '#e05580', fill: '#ffb3cc', label: 'Wintering' },
  habitat: { color: '#8fd9c2', fill: '#b8e8d8', label: 'Habitat' },
};

export default function MigrationMap() {
  return (
    <div className="h-[400px] w-full overflow-hidden rounded-3xl border-2 border-lilac-100 bg-white p-1 shadow-soft">
      <LeafletMapShell className="flex h-full w-full items-center justify-center rounded-2xl bg-lilac-50 text-sm text-lilac-400">
        <MapContainer
          center={EURASIA_CENTER}
          zoom={3}
          scrollWheelZoom={false}
          className="h-full w-full rounded-2xl"
          minZoom={2}
          maxBounds={[
            [20, -20],
            [72, 160],
          ]}
        >
          <TileLayer
            attribution={ENGLISH_TILE.attribution}
            url={ENGLISH_TILE.url}
            subdomains="abcd"
            maxZoom={20}
          />
          <Polyline
            positions={migrationPath}
            pathOptions={{ color: '#f4729a', weight: 3, dashArray: '8 6', opacity: 0.85 }}
          />
          <Polyline
            positions={returnPath}
            pathOptions={{ color: '#c084fc', weight: 3, dashArray: '8 6', opacity: 0.7 }}
          />
          {migrationRoute.map((point) => {
            const style = typeStyles[point.type];
            const isKorea = point.name.includes('Korean Peninsula');
            return (
              <CircleMarker
                key={point.name}
                center={[point.lat, point.lng]}
                radius={isKorea ? 14 : 10}
                pathOptions={{
                  color: style.color,
                  fillColor: style.fill,
                  fillOpacity: 0.9,
                  weight: 2,
                }}
              >
                <Popup>
                  <div className="min-w-[180px]">
                    <span
                      className="cute-badge text-white"
                      style={{ backgroundColor: style.color }}
                    >
                      {style.label}
                    </span>
                    <p className="mt-1 font-display text-blush-600">{point.name}</p>
                    {point.note && <p className="text-sm text-blush-400">{point.note}</p>}
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
