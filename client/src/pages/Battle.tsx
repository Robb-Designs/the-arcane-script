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

const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState("");

const startBattle = async (
  difficulty: "novice" | "adept" | "master"
) => {
  try {
    setError("");
    setIsLoading(true);

    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_BASE_URL}/api/game/battle/start`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          difficulty,
        }),
      }
    );

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
    <div>
      <h1>Choose Your Challenge</h1>
    </div>
  );
}

export default Battle;