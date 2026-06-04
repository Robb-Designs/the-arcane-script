import { Link } from "react-router-dom";
import { useState } from "react";
import { API_BASE_URL } from "@/config/api";
import { Button } from "@/components/ui/8bit/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/images/hero-background.webp";

function Register() {
  // Store all form fields in one state object.
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Update the matching field whenever the user types into an input.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission and send the registration request to the backend.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(""); //This prevents old errors from lingering

    // Quick client-side check before calling the API.
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      // Send only the fields the backend needs to create the account.
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      // Surface backend validation errors through the catch block.
      if (!response.ok) {
        throw new Error(data.message);
      }
      setError("");
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

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background */}
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 w-full max-w-md flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-center font-bold text-white text-4xl md:text-5xl">
            Begin Your Journey
          </h1>

          <p className="text-center text-slate-300">
            Create your adventurer and begin your journey.
          </p>
        </div>

        {/* Registration form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md rounded-lg border border-white/10 bg-black/45 backdrop-blur-sm p-6"
        >
          <Input
            name="username"
            value={formData.username}
            placeholder="Username"
            onChange={handleChange}
            required
          />

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

          <Input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Begin Adventure"}
          </Button>

          <p className="text-center text-sm text-slate-300">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-300">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
