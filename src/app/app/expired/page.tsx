import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function ExpiredPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-50 border-2 border-red-200 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-4">Subscription Expired</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Your PingFollow subscription has expired. You can no longer access your leads and follow-up data.
        </p>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-red-700">
            <span className="font-semibold">Your subscription expired on:</span> January 9, 2026
          </p>
        </div>

        <p className="text-muted-foreground mb-8">
          Renew your subscription to regain access to all your leads and features.
        </p>

        <Link href="/app/billing">
          <Button size="lg" className="w-full">
            Renew Now
          </Button>
        </Link>

        <p className="text-xs text-muted-foreground mt-6">
          Questions? <button className="text-primary hover:underline font-medium">Contact support</button>
        </p>
      </div>
    </div>
  )
}
