
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_BASE_URL } from "@/config/api";
import LoadingScreen from "@/components/LoadingScreen";
import { Button } from "@/components/ui/8bit/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/images/hero-background.webp";

function Login() {
  // Keep login form values in one object.
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Store request error messages for user feedback.
  const [error, setError] = useState("");
  // Track submit/loading state for button and request flow.
  const [isLoading, setIsLoading] = useState(false);
  const [isEnteringRealm, setIsEnteringRealm] = useState(false);
  const navigate = useNavigate();

  // Update the field that matches the input name attribute.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit credentials to the login endpoint and handle auth response.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear old error messages before a new request.
    setError("");
    try {
      setIsLoading(true);

      // Send only the fields required by the backend login route.
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Persist auth data so protected screens can use it later.
      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));

      setError("");
      setIsEnteringRealm(true);

      setTimeout(() => {
        navigate("/profile");
      }, 1500);

      console.log(data);
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

  if (isEnteringRealm) {
    return <LoadingScreen message="Entering the guild halls..." />;
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background */}
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md flex flex-col gap-6">
        {/* Heading copy above the form card. */}
        <div className="flex flex-col gap-2">
          <h1 className="text-center font-bold text-white text-4xl md:text-5xl">
            Welcome Back
          </h1>

          <p className="text-center text-slate-300">
            Continue your journey through the Arcane Script.
          </p>
        </div>

        <form
          className="
          flex
          flex-col
          gap-4
          rounded-lg
          border
          border-white/10
          bg-black/45
          backdrop-blur-sm
          p-6
        "
          onSubmit={handleSubmit}
        >
          {/* Login inputs */}
          <Input
            name="email"
            type="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <Input
            name="password"
            type="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            required
          />

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Entering Realm..." : "Enter The Realm"}
          </Button>

          <p className="text-center text-sm text-slate-300">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:text-blue-300">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
