type Meal = {
  rank: number;
  name: string;
  used: string;
  usage: number; // percent 0-100
  calories: string;
  protein: string;
  time: string;
  fitsTargets?: boolean;
};

const MEALS: Meal[] = [
  {
    rank: 1,
    name: "Creamy garlic pasta",
    used: "7 of 8 ingredients used",
    usage: 88,
    calories: "610 kcal",
    protein: "26 g protein",
    time: "25 min",
    fitsTargets: true,
  },
  {
    rank: 2,
    name: "Ginger chicken rice bowl",
    used: "6 of 7 ingredients used",
    usage: 86,
    calories: "540 kcal",
    protein: "38 g protein",
    time: "30 min",
  },
  {
    rank: 3,
    name: "Broccoli & soy stir-fry",
    used: "4 of 5 ingredients used",
    usage: 80,
    calories: "380 kcal",
    protein: "19 g protein",
    time: "15 min",
  },
];

function UsageBar({ usage }: { usage: number }) {
  return (
    <div className="mt-3 h-1.5 rounded-full bg-zinc-100">
      <div
        className="h-1.5 rounded-full bg-emerald-600"
        style={{ width: `${usage}%` }}
      />
    </div>
  );
}

export function MealTeaser() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
          Ranked for your goals
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
          The same pantry, physically ranked for you.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
          Every meal shows how much of your pantry it uses, whether it fits
          your calorie and protein targets, and how long it takes.
        </p>
        <div className="mt-12 space-y-4">
          {MEALS.map((meal) => (
            <div
              key={meal.name}
              className="grid items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 sm:grid-cols-[auto_1fr_auto]"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                  meal.fitsTargets
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-100 text-zinc-700"
                }`}
              >
                #{meal.rank}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-zinc-950">
                    {meal.name}
                  </h3>
                  {meal.fitsTargets && (
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                      Fits your targets
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs font-medium text-zinc-500">
                  {meal.used}
                </p>
                <UsageBar usage={meal.usage} />
              </div>
              <div className="flex gap-4 text-sm text-zinc-600 sm:text-right">
                <span>{meal.calories}</span>
                <span>{meal.protein}</span>
                <span>{meal.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}