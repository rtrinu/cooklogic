const REASONS = [
  {
    title: "Nutrition you can trust",
    description:
      "Every calorie and macro is computed from USDA FoodData Central — strict math, not an AI guess you have to hope about.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 3l7 3v5.5c0 4.5-3 8.3-7 9.5-4-1.2-7-5-7-9.5V6l7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Ingredient-first ranking",
    description:
      "Recipes scored to use up what you already own and hit your targets — not what some shopping list tells you to buy.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8" />
        <path d="M8 12h.01M12 12h.01M16 12h.01" />
        <path d="M8 16h.01M12 16h.01M16 16h.01" />
      </svg>
    ),
  },
  {
    title: "Substitutions that make sense",
    description:
      "Out of an ingredient? Get a functional, flavour-aware swap that explains exactly how the dish changes.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M8 3 4 7l4 4" />
        <path d="M4 7h16" />
        <path d="m16 21 4-4-4-4" />
        <path d="M20 17H4" />
      </svg>
    ),
  },
];

export function Differentiator() {
  return (
    <section id="why-cooklogic" className="scroll-mt-20 bg-zinc-50 py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
          Why CookLogic
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
          Not another AI recipe app.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
          Most apps guess. CookLogic computes. The numbers behind every meal are
          deterministic — reproducible, auditable, and grounded in real food
          data.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {REASONS.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                {reason.icon}
              </span>
              <h3 className="mt-4 text-base font-semibold text-zinc-950">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}