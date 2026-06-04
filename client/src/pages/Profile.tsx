// Imports
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/config/api";

import { useLocation } from "react-router-dom"; // DEBUGGING

// Interface
interface ProfileData {
  username: string;
  wins: number;
  losses: number;
  totalMatches: number;
  highestWpm: number;
}

function Profile() {
    const location = useLocation(); // DEBUGGING
    console.log("Current Path:", location.pathname);//DEBUGGING


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


}

export default Profile;
