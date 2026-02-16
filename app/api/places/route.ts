import { NextResponse } from "next/server";
import buses from "@/app/data/buses.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // what user typed: "Sa", "Fa", etc.
  const q = (searchParams.get("q") || "").toLowerCase();

  const placesSet = new Set<string>();

  // collect all stops from all buses
  buses.forEach((bus) => {
    bus.stops.forEach((stop) => {
      placesSet.add(stop);
    });
  });

  // filter matching places
  const places = Array.from(placesSet).filter((place) =>
    place.toLowerCase().startsWith(q)
  );

  return NextResponse.json(places);
}
