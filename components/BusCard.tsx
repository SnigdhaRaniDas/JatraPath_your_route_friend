export default function BusCard({ bus }: any) {
  return (
    <div className="rounded-xl bg-linear-to-b from-sky-500 to-sky-800 text-white p-5 shadow-lg">
      <h3 className="text-lg font-semibold">
        {bus.name}
      </h3>

      <p className="text-sm opacity-90 mb-2">
        {bus.from} → {bus.to}
      </p>

      <p className="text-2xl font-bold">
        ৳ {bus.fare}
      </p>

      <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-orange-400">
        Moderate
      </span>
    </div>
  );
}
