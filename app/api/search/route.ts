import { NextResponse } from "next/server";
import busesData from "@/app/data/buses.json";
import type { BusData, RouteSearchResult } from "@/type/transport";

const buses = busesData as BusData[];

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

  const results: RouteSearchResult[] = [];

  buses.forEach((bus) => {
    const { id, name, stops, fareMatrix } = bus;

    if (
      stops.includes(from) &&
      stops.includes(to) &&
      fareMatrix[from]?.[to] !== undefined
    ) {
      const fromIndex = stops.indexOf(from);
      const toIndex = stops.indexOf(to);

      const slicedStops =
        fromIndex < toIndex
          ? stops.slice(fromIndex, toIndex + 1)
          : stops.slice(toIndex, fromIndex + 1).reverse();

      const filteredFareMatrix: RouteSearchResult["fareMatrix"] = {};

      slicedStops.forEach((fromStop) => {
        filteredFareMatrix[fromStop] = {};

        slicedStops.forEach((toStop) => {
          const fare = fareMatrix[fromStop]?.[toStop];
          if (fare !== undefined) {
            filteredFareMatrix[fromStop][toStop] =
              normalizeFare(fare);
          }
        });
      });

      results.push({
        id,
        name,
        stops: slicedStops,
        fareMatrix: filteredFareMatrix,
      });
    }
  });

  return NextResponse.json(results);
}