import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="w-full flex flex-col">
      <main className="flex-1">
        <section className="flex space-y-6 py-12 sm:py-20 lg:py-20 items-center justify-center">
          <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
            <h1 className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
              Kick off with a bang with{" "}
              <span className="text-gradient_indigo-purple font-extrabold">
                SaaS Starter
              </span>
            </h1>
            <p
              className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
              style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
            >
              Build your next project using Next.js 14, Prisma, Neon, Auth.js
              v5, Resend, React Email, Shadcn/ui, Stripe.
            </p>
            <div
              className="flex justify-center space-x-2 md:space-x-4"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              <Button>Get Started</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
