"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Settings } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import StaticHeader from "../components/layout/static-header";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <StaticHeader />
      {/* Navigation */}

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Never miss a follow-up again
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            PingFollow is a simple, clean follow-up reminder app for B2B teams.
            Stay organized, track leads, and close deals faster.
          </p>
          <Link href="/signup">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/30 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Why PingFollow?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Smart Reminders",
                description:
                  "Get notified about upcoming follow-ups and never miss an opportunity.",
              },
              {
                icon: CheckCircle2,
                title: "Lead Tracking",
                description:
                  "Organize all your leads in one place with status, notes, and follow-up dates.",
              },
              {
                icon: Settings,
                title: "Simple & Clean",
                description:
                  "No unnecessary features. Just what you need to manage follow-ups effectively.",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground">
            No hidden fees. Manual renewal only.
          </p>
        </div>
        <div className="flex justify-center">
          <Link href="/pricing">
            <Button variant="outline" className="gap-2 bg-transparent">
              View Pricing <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 PingFollow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
