import { useState } from "react";
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

  // Update the field that matches the input name attribute.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
        <h1 className="text-center font-bold text-white text-4xl md:text-5xl">
          Welcome Back
        </h1>

        <p className="text-center text-slate-300">
          Continue your journey through the Arcane Script.
        </p>

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
        ></form>
      </div>
    </div>
  );
}

export default Login;
