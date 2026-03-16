"use client";

import { MapContainer, TileLayer, Polyline, useMap, Marker, CircleMarker } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import routes from "@/app/data/routes.json";
import stops from "@/app/data/stops.json";

interface Props {
  busName: string;
  stopsList: string[];
}

function nearestIndex(point: [number, number], route: [number, number][]) {
  let bestIndex = 0;
  let bestDist = Infinity;
  route.forEach((p, i) => {
    const d = Math.pow(p[0] - point[0], 2) + Math.pow(p[1] - point[1], 2);
    if (d < bestDist) {
      bestDist = d;
      bestIndex = i;
    }
  });
  return bestIndex;
}

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (map && positions.length > 0) {
      map.fitBounds(positions, { padding: [10, 10] });
    }
  }, [map, positions]);
  return null;
}

// Red marker icon
const redIcon = new L.Icon({
  iconUrl: "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

export default function RouteMapPreview({ busName, stopsList }: Props) {
  const routeData = (routes as any)[busName];
  if (!routeData) return <div className="h-48 bg-gray-100" />;

  const polyline: [number, number][] = routeData.map(([lng, lat]: [number, number]) => [lat, lng]);
  const fromCoord = (stops as any)[stopsList[0]];
  const toCoord = (stops as any)[stopsList[stopsList.length - 1]];

  const startIndex = nearestIndex(fromCoord, polyline);
  const endIndex = nearestIndex(toCoord, polyline);

  const segment =
    startIndex < endIndex
      ? polyline.slice(startIndex, endIndex + 1)
      : polyline.slice(endIndex, startIndex + 1).reverse();

  return (
    <MapContainer
      center={segment[0]}
      zoom={14}
      style={{ height: 200, width: "100%" }}
      scrollWheelZoom={false}
      dragging={false}
      zoomControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline positions={segment} pathOptions={{ color: "#2563eb", weight: 5 }} />
      <FitBounds positions={segment} />

      {/* Start: Blue circle */}
      <CircleMarker
        center={segment[0]}
        pathOptions={{ color: "#2563eb", fillColor: "white", fillOpacity: 1 }}
        radius={8}
      />

      {/* End: Red marker */}
      <Marker position={segment[segment.length - 1]} icon={redIcon} />
    </MapContainer>
  );
}