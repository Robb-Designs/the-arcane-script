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

// Request UI state for start-battle action.
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState("");

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

    console.log(data);
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

function Battle() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {/* Render one interactive card per difficulty option. */}
      {difficulties.map((difficulty) => (
        <Card
          key={difficulty.value}
          onClick={() => startBattle(difficulty.value)}
          className="
        cursor-pointer
        transition-all
        hover:-translate-y-1
        hover:border-amber-400
      "
        >
          <CardHeader>
            <CardTitle>{difficulty.title}</CardTitle>

            <CardDescription>{difficulty.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

export default Battle;
