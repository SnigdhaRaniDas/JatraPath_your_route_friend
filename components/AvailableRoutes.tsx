import BusCard from "./BusCard";

export default function AvailableRoutes({ buses, searched }: any) {
  console.log("AvailableRoutes received buses:", buses);

  return (
    <div className="bg-white/90 rounded-2xl shadow-xl w-full max-w-3xl mx-auto p-8 mt-4 ring-1 ring-sky-300">
      <h2 className="text-center text-xl font-bold mb-1 text-sky-900">
        Available Routes
      </h2>

      <p className="text-center text-sky-800 mb-6 text-sm">
        Search for routes to see available buses and fares
      </p>

      {/* BEFORE SEARCH */}
      {!searched && (
        <div className="flex justify-center">
          <div className="bg-linear-to-br from-sky-50 to-white p-5 rounded-2xl shadow-sm w-full max-w-md animate-pulse ring-1 ring-sky-200">
            <div className="h-20 bg-gray-200 rounded" />
          </div>
        </div>
      )}

      {/* SEARCH DONE, NO RESULTS */}
      {searched && buses.length === 0 && (
        <p className="text-center text-gray-500">
          No buses found for this route
        </p>
      )}

      {/* SEARCH DONE, RESULTS FOUND */}
      {searched && buses.length > 0 && (
        <div className="space-y-4">
          {buses.map((bus: any) => (
            <BusCard key={bus.id} bus={bus} />
          ))}
        </div>
      )}
    </div>
  );
}
