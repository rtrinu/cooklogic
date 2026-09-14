import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Differentiator } from "@/components/differentiator";
import { MealTeaser } from "@/components/meal-teaser";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Differentiator />
        <MealTeaser />
      </main>
      <Footer />
    </>
  );
}