"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { register } from "@/src/redux/slices/authSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    try {
      const response = await dispatch(register({ fullName, email, password }));
      if (response.payload.success) {
        setIsLoading(false);
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">PF</span>
          </div>
          <span className="font-bold text-foreground">PingFollow</span>
        </Link>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-lg p-8 mb-4">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Create your account
          </h1>
          <p className="text-muted-foreground mb-6">
            Sign up to get started with PingFollow
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Email
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border border-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-background border border-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Password
              </label>
              <Input
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background border border-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-background border border-border"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
        </div>

        <p className="text-center text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
