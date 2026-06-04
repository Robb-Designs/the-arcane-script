import { Button } from "./ui/8bit/button";

function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-bold mb-4">The Arcane Script</h1>

      <p className="text-xl max-w-2xl mb-8">
        Battle mystical enemies through the power of typing.
      </p>

      <div className="flex gap-4">
        <Button>Begin Journey</Button>
        <Button>Login</Button>
      </div>
    </section>
  );
}

export default Hero;