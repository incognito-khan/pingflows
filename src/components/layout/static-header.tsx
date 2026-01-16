import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Button } from "@/src/components/ui/button";

export default function StaticHeader() {
  const user = useSelector((state: any) => state.auth.user);
  const isUserLoggedIn = useSelector((state: any) => state.auth.isUserLoggedIn);
  console.log(user);
  console.log(isUserLoggedIn);
  return (
    <nav className="border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">PF</span>
          </div>
          <span className="font-bold text-foreground">PingFollow</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            className="text-foreground hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          {!isUserLoggedIn ? (
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
          ) : (
            <Link href="/app/dashboard">
              <Button variant="default" className="cursor-pointer">
                Dashboard
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
