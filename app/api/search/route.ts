import { NextResponse } from "next/server";
import buses from "@/app/data/buses.json";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!from || !to) {
    return NextResponse.json([]);
  }

  const results: any[] = [];

  buses.forEach((bus: any) => {

    const { id, name, stops } = bus;

    const fromIndex = stops.indexOf(from);
    const toIndex = stops.indexOf(to);

    if (fromIndex !== -1 && toIndex !== -1) {

      const slicedStops =
        fromIndex < toIndex
          ? stops.slice(fromIndex, toIndex + 1)
          : stops.slice(toIndex, fromIndex + 1).reverse();

      results.push({
        id,
        name,
        stops: slicedStops
      });

    }

  });

  return NextResponse.json(results);
}