import Link from "next/link";
import Button from "@/components/ui/Button";
import { notFound as copy } from "@/content/misc";
import { pillars } from "@/content/services";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-navy-950 py-32 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-30 blur-[130px]"
        style={{
          background: "radial-gradient(closest-side, #4F46E5 0%, #7C3AED 60%, transparent 100%)",
        }}
      />
      <div className="container-page relative z-10">
        <p className="font-display text-gradient-brand text-[7rem] font-extrabold leading-none tracking-tighter sm:text-[10rem]">
          404
        </p>
        <h1 className="font-display mt-4 max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {copy.heading}
        </h1>
        <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-white/60">{copy.body}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/" variant="light" size="lg" withArrow>
            Back to homepage
          </Button>
          <Button href="/contact" variant="ghost" size="lg" className="text-white/70 hover:text-white">
            Tell us what you were looking for
          </Button>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/40">
            Or start here
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            {pillars.map((pillar) => (
              <Link
                key={pillar.slug}
                href={`/services/${pillar.slug}`}
                className="text-sm text-white/65 transition-colors hover:text-white"
              >
                {pillar.name}
              </Link>
            ))}
            <Link
              href="/growth-packages"
              className="text-sm text-white/65 transition-colors hover:text-white"
            >
              Growth Packages
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
