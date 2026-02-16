import { NextResponse } from "next/server";
import buses from "@/app/data/buses.json";

// fare rounding rule
function normalizeFare(fare: number) {
  return Math.round(fare / 5) * 5;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!from || !to) {
    return NextResponse.json([]);
  }

  const results = buses
    .filter(
      (bus) =>
        bus.stops.includes(from) &&
        bus.stops.includes(to) &&
        bus.stops.indexOf(from) < bus.stops.indexOf(to)
    )
    .map((bus) => {
      const fromMap =
        bus.fareMatrix[from as keyof typeof bus.fareMatrix];

      const rawFare = fromMap
        ? fromMap[to as keyof typeof fromMap]
        : undefined;

      if (!rawFare) return null;

      return {
        id: bus.id,
        name: bus.name,
        from,
        to,
        fare: normalizeFare(rawFare)
      };
    })
    .filter(Boolean);

  return NextResponse.json(results);
}
