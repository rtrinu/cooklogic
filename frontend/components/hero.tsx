import Link from "next/link";

const PANTRY_ITEMS = [
  "Chicken",
  "Brown rice",
  "Garlic",
  "Onion",
  "Olive oil",
  "Broccoli",
  "Ginger",
  "Soy sauce",
];

const STATS = [
  { label: "Real data", value: "Every meal is calculated from USDA FoodData Central." },
  { label: "Deterministic", value: "Same pantry, same answer. Every single time." },
  { label: "Targeted", value: "Ranked to fit your calories, protein, and time." },
];

function PantryCard() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-200/50">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-zinc-950">Your pantry</p>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            8 ingredients
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {PANTRY_ITEMS.map((item) => (
            <span
              key={item}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-6 rounded-xl bg-emerald-50 p-4">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-semibold text-emerald-900">
              8 meals you can make now
            </p>
            <span className="text-2xl font-bold text-emerald-700">8</span>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-emerald-100">
            <div className="h-1.5 w-4/5 rounded-full bg-emerald-600" />
          </div>
          <p className="mt-2 text-xs text-emerald-800">
            Every ingredient you add unlocks more meals.
          </p>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-emerald-50 to-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Real USDA food data · Deterministic math · Zero AI guesses
          </p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
            Dinner is already in your kitchen.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-600">
            CookLogic turns the ingredients you already have into meals ranked
            to hit your calorie and protein goals — calculated from real USDA
            data, never guesses.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Start free
            </Link>
            <Link
              href="#how-it-works"
              className="rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50"
            >
              See how it works
            </Link>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-zinc-200 pt-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="text-sm font-semibold text-zinc-950">{stat.label}</dt>
                <dd className="mt-1 text-xs leading-5 text-zinc-500">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <PantryCard />
      </div>
    </section>
  );
}