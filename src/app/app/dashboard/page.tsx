import { Card } from "@/src/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function DashboardPage() {
  const stats = [
    { label: "Total Leads", value: "24", change: "+3 this week" },
    { label: "Due Today", value: "5", change: "Prioritize these" },
    { label: "Overdue", value: "2", change: "Needs attention" },
    { label: "Contacted This Week", value: "12", change: "+40% vs last week" },
  ]

  const chartData = [
    { name: "Mon", contacts: 2 },
    { name: "Tue", contacts: 4 },
    { name: "Wed", contacts: 3 },
    { name: "Thu", contacts: 5 },
    { name: "Fri", contacts: 7 },
    { name: "Sat", contacts: 1 },
    { name: "Sun", contacts: 0 },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border border-border bg-card p-6">
            <p className="text-muted-foreground text-sm font-medium mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </Card>
        ))}
      </div>

      {/* Chart Card */}
      <Card className="border border-border bg-card p-6 mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-6">Follow-ups by Day</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: `1px solid var(--border)`,
                borderRadius: "0.5rem",
              }}
            />
            <Bar dataKey="contacts" fill="var(--primary)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Filter Buttons */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Filters</h2>
        <div className="flex flex-wrap gap-3">
          {["Due Today", "Overdue", "Upcoming"].map((filter) => (
            <button
              key={filter}
              className="px-4 py-2 rounded-lg border border-border bg-card text-foreground hover:bg-secondary transition-colors"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: "Contacted John Smith", time: "2 hours ago" },
            { action: "Snoozed follow-up for Acme Corp", time: "5 hours ago" },
            { action: "Added note to Sarah's lead", time: "1 day ago" },
          ].map((activity, idx) => (
            <div key={idx} className="flex justify-between items-center py-3 border-b border-border last:border-0">
              <p className="text-foreground">{activity.action}</p>
              <p className="text-sm text-muted-foreground">{activity.time}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
