import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"

export default function BillingPage() {
  const subscriptionDetails = {
    plan: "Monthly Subscription",
    price: "$29/month",
    status: "Active",
    expiryDate: "2026-02-09",
    nextRenewalDate: "2026-02-09",
    renewalType: "Manual",
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">Billing</h1>

      <div className="space-y-6 max-w-2xl">
        {/* Current Subscription */}
        <Card className="border border-border bg-card p-8">
          <h2 className="text-lg font-semibold text-foreground mb-6">Current Subscription</h2>
          <div className="space-y-4">
            {[
              { label: "Plan", value: subscriptionDetails.plan },
              { label: "Price", value: subscriptionDetails.price },
              { label: "Status", value: subscriptionDetails.status },
              { label: "Expiry Date", value: subscriptionDetails.expiryDate },
              { label: "Renewal Type", value: subscriptionDetails.renewalType },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between py-3 border-b border-border last:border-0">
                <span className="text-foreground font-medium">{item.label}</span>
                <span className="text-muted-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Subscription Management */}
        <Card className="border-2 border-primary bg-card p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Renewal</h2>
          <p className="text-muted-foreground mb-6">
            Your subscription expires on {subscriptionDetails.expiryDate}. Renew manually to continue using PingFollow.
          </p>
          <Button size="lg" className="w-full">
            Renew Subscription
          </Button>
        </Card>

        {/* Billing History */}
        <Card className="border border-border bg-card p-8">
          <h2 className="text-lg font-semibold text-foreground mb-6">Billing History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Description</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: "2026-01-09", desc: "Monthly subscription", amount: "$29.00", status: "Paid" },
                  { date: "2025-12-09", desc: "Monthly subscription", amount: "$29.00", status: "Paid" },
                  { date: "2025-11-09", desc: "Monthly subscription", amount: "$29.00", status: "Paid" },
                ].map((item, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-secondary/20 last:border-0">
                    <td className="px-4 py-3 text-sm text-foreground">{item.date}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{item.desc}</td>
                    <td className="px-4 py-3 text-sm text-foreground font-medium">{item.amount}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Support */}
        <Card className="border border-border bg-card p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            If you have questions about your billing or need to manage your subscription, please contact our support
            team.
          </p>
          <Button variant="outline">Contact Support</Button>
        </Card>
      </div>
    </div>
  )
}
