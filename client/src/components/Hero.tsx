import { Button } from "./ui/8bit/button";
import heroImage from "@/assets/images/hero-background.webp";

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <img
        src={heroImage}
        alt=""
        className=" absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-black/20
        "
      />

      {/* Content */}
      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
          justify-center
          text-center
          px-6
          w-full
        "
      >
        <h1
          className="
            text-5xl
            md:text-6xl
            font-bold
            text-white
            mb-4
          "
        >
          The Arcane Script
        </h1>

        <p
          className="
            max-w-xl
            text-lg
            md:text-xl
            text-slate-200
            mb-8
          "
        >
          Battle mystical enemies through the power of typing.
        </p>

        <div className="flex gap-4">
          <Button size="lg">Begin Journey</Button>

          <Button variant="outline" size="lg">
            Login
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
