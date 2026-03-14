"use client";

import { MapContainer, TileLayer, Polyline, Marker, Tooltip } from "react-leaflet";
import routes from "@/app/data/routes.json";
import stops from "@/app/data/stops.json";

interface Props {
  busName: string;
  stopsList: string[];
}

export default function RouteMap({ busName, stopsList }: Props) {

  const geometry = (routes as any)[busName];

  const stopCoords =
    stopsList
      .map((s) => (stops as any)[s])
      .filter(Boolean);

  const center = stopCoords[0] ?? geometry[0];

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "100vh", width: "100%" }}
    >

      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Polyline
        positions={geometry}
        pathOptions={{ color: "#2563eb", weight: 6 }}
      />

      {stopCoords.map((pos, i) => (
        <Marker key={i} position={pos}>
          <Tooltip permanent>{stopsList[i]}</Tooltip>
        </Marker>
      ))}

    </MapContainer>
  );
}