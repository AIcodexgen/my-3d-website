import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    priceINR: "₹49,999",
    priceUSD: "$599",
    period: "one-time",
    description: "Perfect for landing pages and simple websites.",
    features: [
      "1 Landing Page",
      "Mobile Responsive",
      "Basic SEO Setup",
      "2 Revision Rounds",
      "1 Week Delivery",
    ],
    popular: false,
    ctaLabel: "Get Started",
    ctaPrimary: false,
  },
  {
    name: "Growth",
    priceINR: "₹1,29,999",
    priceUSD: "$1,599",
    period: "one-time",
    description: "Full website or prototype with design system.",
    features: [
      "Up to 8 Pages",
      "Custom UI/UX Design",
      "CMS Integration",
      "SEO + Analytics",
      "App Prototype (optional)",
      "3 Week Delivery",
    ],
    popular: true,
    ctaLabel: "Start Building",
    ctaPrimary: true,
  },
  {
    name: "Scale",
    priceINR: "Custom",
    priceUSD: "",
    period: "",
    description:
      "For complex builds, platforms, or ongoing product work.",
    features: [
      "Unlimited Pages",
      "Design System",
      "Full-Stack Development",
      "API Integrations",
      "Priority Support",
      "Flexible Timeline",
    ],
    popular: false,
    ctaLabel: "Let's Talk",
    ctaPrimary: false,
  },
];

export function PricingSection() {
  const { ref: headRef, inView: headInView } = useInView();
  const { ref: cardsRef, inView: cardsInView } = useInView();

  return (
    <section id="pricing" className="bg-hero-bg py-24 px-6 md:px-16">
      {/* Header */}
      <div ref={headRef}>
        <p
          className={cn(
            "text-primary text-[10px] uppercase tracking-[0.3em] mb-4 opacity-0",
            headInView && "animate-fade-up"
          )}
        >
          PRICING
        </p>
        <h2
          className={cn(
            "text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1] opacity-0",
            headInView && "animate-fade-up"
          )}
          style={{ animationDelay: "0.1s" }}
        >
          Honest pricing.
          <br />
          No guesswork.
        </h2>
        <p
          className={cn(
            "text-muted-foreground text-lg font-light mt-4 max-w-xl opacity-0",
            headInView && "animate-fade-up"
          )}
          style={{ animationDelay: "0.2s" }}
        >
          Choose a starting point. Every project is scoped before we begin -
          no hidden costs.
        </p>
      </div>

      {/* Cards */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
      >
        {plans.map((plan, i) => (
          <div
            key={plan.name}
            className={cn(
              "relative bg-secondary border rounded-xl p-8 flex flex-col gap-6 opacity-0",
              plan.popular
                ? "border-primary/50 ring-1 ring-primary/20"
                : "border-border",
              cardsInView && "animate-fade-up"
            )}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Popular badge */}
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-[10px] uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap font-semibold">
                  Most Popular
                </span>
              </div>
            )}

            {/* Plan name */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-2">
                <span className="text-4xl font-bold text-foreground">
                  {plan.priceINR}
                </span>
                {plan.priceUSD && (
                  <span className="text-muted-foreground text-sm font-light ml-2">
                    / {plan.priceUSD}
                  </span>
                )}
              </div>
              {plan.period && (
                <p className="text-muted-foreground text-sm font-light">
                  {plan.period}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm">{plan.description}</p>

            {/* Features */}
            <ul className="flex flex-col gap-3 flex-1">
              {plan.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-sm text-foreground/80">
                  <span className="text-primary font-bold text-base leading-none">✓</span>
                  {feat}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              className={cn(
                "w-full py-3 rounded-sm text-sm uppercase tracking-widest transition-all active:scale-[0.97]",
                plan.ctaPrimary
                  ? "bg-primary text-primary-foreground font-bold hover:brightness-110"
                  : "border border-border text-foreground hover:bg-secondary/80"
              )}
            >
              {plan.ctaLabel}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
