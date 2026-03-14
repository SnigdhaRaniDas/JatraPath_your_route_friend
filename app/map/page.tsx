"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

const RouteMap = dynamic(() => import("@/components/RouteMap"), {
  ssr: false
});

export default function Page() {

  const params = useSearchParams();

  const bus = params.get("bus");
  const stopsParam = params.get("stops");

  if (!bus || !stopsParam) {
    return <div className="p-10 text-center">Missing route info</div>;
  }

  const stops = JSON.parse(decodeURIComponent(stopsParam));

  return (
    <RouteMap
      busName={bus}
      stopsList={stops}
    />
  );
}