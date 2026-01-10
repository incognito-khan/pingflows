import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/src/components/ui/button"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PF</span>
            </div>
            <span className="font-bold text-foreground">PingFollow</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Simple, Transparent Pricing</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            One price. No hidden fees. Manual renewal only—you're always in control.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card border-2 border-primary rounded-lg p-8 md:p-12">
            <div className="mb-8">
              <p className="text-muted-foreground text-sm font-medium mb-2">MONTHLY SUBSCRIPTION</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-foreground">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>

            <p className="text-foreground mb-8 leading-relaxed">
              Get full access to PingFollow. Track unlimited leads, set smart reminders, and never miss a follow-up.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Unlimited leads",
                "Smart follow-up reminders",
                "Lead status tracking",
                "Notes and timeline history",
                "Email notifications",
                "Manual renewal (no auto-charges)",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <div className="bg-secondary/50 border border-border rounded-lg p-4 mb-8">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">No auto-charges:</span> Your subscription won't renew
                automatically. When your subscription expires, you'll receive a reminder to manually renew.
              </p>
            </div>

            <Link href="/signup" className="block">
              <Button size="lg" className="w-full">
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8">Questions?</h2>
          <div className="space-y-6">
            {[
              {
                q: "Can I cancel anytime?",
                a: "Yes, there's no contract. Your subscription simply won't renew after the current billing period.",
              },
              {
                q: "Is there a free trial?",
                a: "Contact our team to discuss trial options for your team.",
              },
              {
                q: "Can I upgrade or downgrade?",
                a: "We have one plan that covers all use cases. Adjustments are handled on a case-by-case basis.",
              },
            ].map((item, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 PingFollow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
