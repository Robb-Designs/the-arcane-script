// Imports
import { useState } from "react";
import { API_BASE_URL } from "@/config/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";

import profileImage from "@/assets/images/profile-background.webp";

function Battle() {
  // Tracks request state while creating a battle session.
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Preset battle tiers displayed as selectable cards.
  const difficulties = [
    {
      title: "Novice",
      description: "For new scholars beginning their journey.",
      value: "novice",
    },
    {
      title: "Adept",
      description: "A balanced challenge for experienced scribes.",
      value: "adept",
    },
    {
      title: "Master",
      description: "Only the fastest survive.",
      value: "master",
    },
  ];

  // Starts a new battle session on the server for the selected difficulty.
  const startBattle = async (difficulty: "novice" | "adept" | "master") => {
    try {
      // Reset previous errors and lock UI while request is running.
      setError("");
      setIsLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/api/game/battle/start`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          difficulty,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Temporary response logs while wiring battle flow.
      console.log(data);
      console.log("Battle Started");
      console.log("Battle ID:", data.battleId);
      console.log("Enemy:", data.enemy);
      console.log("Prompts:", data.prompts);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unexpected error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <img
        src={profileImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <Card className="transition-all hover:-translate-y-1 hover:bg-zinc-900/95">
          <CardHeader>
            <CardTitle className="text-4xl">Choose Your Challenge</CardTitle>

            <CardDescription>
              Select a difficulty and prepare for battle.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && <p className="mb-4 text-red-400">{error}</p>}

            {isLoading && (
              <p className="mb-4 text-amber-300">Preparing battle...</p>
            )}

            <div className="grid md:grid-cols-3 gap-4">
              {difficulties.map((difficulty) => (
                <Card
                  key={difficulty.value}
                  onClick={() =>
                    startBattle(
                      difficulty.value as "novice" | "adept" | "master",
                    )
                  }
                  className="
                    cursor-pointer
                    transition-all
                    hover:-translate-y-1
                    hover:border-amber-600
                    hover:bg-zinc-900/95
                  "
                >
                  <CardHeader>
                    <CardTitle>{difficulty.title}</CardTitle>

                    <CardDescription>{difficulty.description}</CardDescription>
                  </CardHeader>

                  <CardFooter>
                    <p className="text-[10px] text-amber-200/80">
                      Click to begin
                    </p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>

          <CardFooter>
            <p className="text-slate-400">
              Victories increase your standing within the guild and unlock
              greater challenges.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Battle;
