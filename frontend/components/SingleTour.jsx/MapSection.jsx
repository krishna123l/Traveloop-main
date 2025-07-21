import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'filter hue-rotate-180',
});

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const FitBounds = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length === 0) return;
    const bounds = L.latLngBounds(
      locations.map((loc) => [loc.coordinates[1], loc.coordinates[0]])
    );
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [locations, map]);

  return null;
};

const MapSection = ({ locations }) => {
  if (!locations || locations.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header */}
      <div className="flex items-center mb-8">
        <div className="w-2 h-10 bg-gradient-to-b from-sky-400 to-emerald-400 rounded-full mr-4"></div>
        <h2 className="text-3xl font-bold text-white">Tour Locations</h2>
      </div>

      {/* Map Container with glass-morphism effect */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm p-1 overflow-hidden">
        <div className="w-full h-[500px] rounded-lg overflow-hidden relative">
          <MapContainer
            center={[locations[0].coordinates[1], locations[0].coordinates[0]]}
            zoom={10}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
            className="rounded-lg"
          >
            {/* Custom styled tile layer */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
              className="filter brightness-90 contrast-110 saturate-80"
            />

            <FitBounds locations={locations} />

            {locations.map((loc, idx) => (
              <Marker
                key={loc._id || idx}
                position={[loc.coordinates[1], loc.coordinates[0]]}
                icon={customIcon}
              >
                <Popup className="custom-popup">
                  <div className="bg-gray-800/90 backdrop-blur-sm p-3 rounded-lg border border-sky-400/30">
                    <h3 className="font-bold text-white flex items-center">
                      <span className="bg-gradient-to-r from-sky-400 to-emerald-400 w-2 h-6 rounded-full mr-2"></span>
                      Day {loc.day}
                    </h3>
                    <p className="text-gray-300 mt-1">{loc.description}</p>
                    <div className="flex items-center mt-2 text-xs text-sky-400">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {loc.coordinates[1].toFixed(4)},{' '}
                      {loc.coordinates[0].toFixed(4)}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Map controls styling */}
          <style jsx global>{`
            .leaflet-control {
              filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
            }
            .leaflet-bar {
              border: none !important;
              background: rgba(17, 24, 39, 0.7) !important;
              backdrop-filter: blur(8px);
            }
            .leaflet-bar a {
              background: rgba(17, 24, 39, 0.7) !important;
              border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
              color: #fff !important;
            }
            .leaflet-bar a:hover {
              background: rgba(56, 182, 255, 0.3) !important;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
