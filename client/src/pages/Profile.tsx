// Imports
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/config/api";
import { Card, CardContent } from "@/components/ui/8bit/card";
import profileImage from "@/assets/images/profile-background.webp";
import playerImage from "@/assets/images/player.png";

// import { useLocation } from "react-router-dom";  DEBUGGING

// Interface
interface ProfileData {
  username: string;
  wins: number;
  losses: number;
  totalMatches: number;
  highestWpm: number;
}

function Profile() {
  //   const location = useLocation(); DEBUGGING
  //   console.log("Current Path:", location.pathname); DEBUGGING

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setProfile(data);
      } catch (error) {
        console.error(error);

        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>No profile found</div>;
  }

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
        {/* Profile Card */}
        <Card
          className="
          grid
          md:grid-cols-[250px_1fr]
          gap-8
          bg-black/60
          p-6 md:p-8
        "
        >
          {/* Character Section */}
          <div className="flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              {profile.username}
            </h2>

            <p className="text-slate-300">Village Scholar</p>
            <p className="text-amber-300 text-sm mt-1">Level 1</p>

            <div className="w-full h-px bg-white/10 my-4" />
            <img
              src={playerImage}
              alt={profile.username}
              className="w-72 md:w-80 object-contain"
            />
          </div>

          {/* Stats Section */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-6">
              ARCANE RECORD
            </h1>

            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="bg-zinc-900/95">
                <CardContent className="flex flex-col gap-2">
                  <p className="text-xs uppercase tracking-widest">Wins</p>
                  <p className="text-2xl md:text-3xl text-amber-100">{profile.wins}</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/95">
                <CardContent className="flex flex-col gap-2">
                  <p className="text-xs uppercase tracking-widest">Losses</p>
                  <p className="text-2xl md:text-3xl text-amber-100">{profile.losses}</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/95">
                <CardContent className="flex flex-col gap-2">
                  <p className="text-xs uppercase tracking-widest">Battles</p>
                  <p className="text-2xl md:text-3xl text-amber-100">{profile.totalMatches}</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/95">
                <CardContent className="flex flex-col gap-2">
                  <p className="text-xs uppercase tracking-widest">Max Wpm</p>
                  <p className="text-2xl md:text-3xl text-amber-100">{profile.highestWpm}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Card>

        {/* Match History Placeholder */}
        <Card className="mt-8 bg-black/60">
          <CardContent>
            <h2 className="text-2xl font-bold text-white mb-4">Recent Battles</h2>
            <p className="text-slate-300">Battle history coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
