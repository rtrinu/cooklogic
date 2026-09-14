const STEPS = [
  {
    title: "Stock",
    description:
      "Add the ingredients in your kitchen — quickly, from a real ingredient database, not free text.",
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
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 13h.01M13 13h.01M17 13h.01M9 17h.01M13 17h.01" />
      </svg>
    ),
  },
  {
    title: "Rank",
    description:
      "CookLogic scores every recipe on ingredient usage, calories, protein, and cook time. No randomness.",
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
        <path d="M4 6h16M4 12h16M4 18h16" />
        <circle cx="9" cy="6" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="15" cy="12" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="7" cy="18" r="2.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Cook",
    description:
      "Follow clear steps, scale servings, and swap a missing ingredient with one that makes sense.",
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
        <path d="M12 3c1.2 2.6 4 4.2 4 8a4 4 0 0 1-8 0c0-2 1-3.2 1.2-4.4C10 7.6 11 8 12 8c.4-2-.4-3.6 0-5Z" />
        <path d="M6 21h12" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
          How it works
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
          Three steps, then it gets out of your way.
        </h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <div key={step.title}>
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  {step.icon}
                </span>
                <span className="text-sm font-semibold text-zinc-400">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-zinc-950">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}