import { NextResponse } from "next/server";
import buses from "@/app/data/buses.json";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").toLowerCase();

  const placesSet = new Set<string>();

  buses.forEach((bus: any) => {
    bus.stops.forEach((stop: string) => {
      placesSet.add(stop);
    });
  });

  const places = Array.from(placesSet).filter((place) =>
    place.toLowerCase().startsWith(q)
  );

  return NextResponse.json(places);
}