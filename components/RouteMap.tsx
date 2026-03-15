"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Tooltip,
  useMap
} from "react-leaflet";

import L from "leaflet";

import routes from "@/app/data/routes.json";
import stops from "@/app/data/stops.json";
import buses from "@/app/data/buses.json";

interface Props {
  busName: string;
  stopsList: string[];
}

/* ---------- Custom stop icon (no default marker) ---------- */

const stopIcon = L.divIcon({
  className: "",
  html: `<div style="
    width:10px;
    height:10px;
    background:#2563eb;
    border-radius:50%;
    border:2px solid white;
    box-shadow:0 0 4px rgba(0,0,0,0.4);
  "></div>`,
  iconSize: [10,10],
  iconAnchor: [5,5]
});

/* ---------- Find closest polyline point ---------- */

function nearestIndex(point: [number, number], route: [number, number][]) {

  let bestIndex = 0;
  let bestDist = Infinity;

  route.forEach((p, i) => {

    const d =
      Math.pow(p[0] - point[0], 2) +
      Math.pow(p[1] - point[1], 2);

    if (d < bestDist) {
      bestDist = d;
      bestIndex = i;
    }

  });

  return bestIndex;
}

/* ---------- Auto zoom map ---------- */

function FitBounds({ positions }: { positions: [number, number][] }) {

  const map = useMap();

  useEffect(() => {
    map.fitBounds(positions, { padding: [40, 40] });
  }, [positions]);

  return null;
}

/* ---------- Main component ---------- */

export default function RouteMap({ busName, stopsList }: Props) {

  const routeData = (routes as any)[busName];

  const bus =
    (buses as any[]).find((b) => b.name === busName);

  if (!routeData || !bus) return null;

  /* convert [lng,lat] → [lat,lng] */

  const polyline: [number, number][] =
    routeData.map(([lng, lat]: [number, number]) => [lat, lng]);

  const from = stopsList[0];
  const to = stopsList[stopsList.length - 1];

  const fromCoord = (stops as any)[from];
  const toCoord = (stops as any)[to];

  const startIndex = nearestIndex(fromCoord, polyline);
  const endIndex = nearestIndex(toCoord, polyline);

  const segment =
    startIndex < endIndex
      ? polyline.slice(startIndex, endIndex + 1)
      : polyline.slice(endIndex, startIndex + 1).reverse();

  const stopCoords =
    stopsList.map((s: string) => (stops as any)[s]).filter(Boolean);

  return (
    <MapContainer
      center={segment[0]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >

      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Route Line */}

      <Polyline
        positions={segment}
        pathOptions={{
          color: "#2563eb",
          weight: 6
        }}
      />

      {/* Auto zoom */}

      <FitBounds positions={segment} />

      {/* Stops */}

      {stopCoords.map((pos: any, i: number) => (

        <Marker key={i} position={pos} icon={stopIcon}>

          <Tooltip
            direction="top"
            offset={[0, -8]}
            opacity={1}
            permanent
          >

            <div className="bg-white px-2 py-1 rounded shadow text-xs font-semibold text-blue-700 border border-blue-200">
              {stopsList[i]}
            </div>

          </Tooltip>

        </Marker>

      ))}

    </MapContainer>
  );
}