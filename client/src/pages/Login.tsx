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

  return <div>Login</div>;
}

export default Login;
