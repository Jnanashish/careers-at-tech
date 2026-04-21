import React from "react";

const companies = [
  "Google",
  "Microsoft",
  "Stripe",
  "American Express",
  "Visa",
  "Tesla",
  "Philips",
  "Atlan",
];

const LogoPlaceholder = ({ name }) => (
  <div
    className="flex items-center justify-center h-8 px-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 select-none"
    title={name}
  >
    <span className="text-sm font-semibold text-gray-500 tracking-wide whitespace-nowrap">
      {name}
    </span>
  </div>
);

const LogoWall = () => {
  return (
    <section className="bg-white py-12 overflow-hidden" aria-label="Trusted companies">
      <div className="max-w-content mx-auto px-4 lg:px-6">
        <p className="text-caption uppercase tracking-widest text-text-tertiary text-center mb-8">
          Trusted by teams at
        </p>
      </div>

      {/* Desktop: static row */}
      <div className="hidden md:block">
        <div className="max-w-content mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-center gap-12">
            {companies.map((company) => (
              <LogoPlaceholder key={company} name={company} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: auto-scrolling marquee */}
      <div className="md:hidden relative">
        <div className="flex animate-marquee w-max">
          {[...companies, ...companies].map((company, i) => (
            <div key={`${company}-${i}`} className="mx-6">
              <LogoPlaceholder name={company} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoWall;
