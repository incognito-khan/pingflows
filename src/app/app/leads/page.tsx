import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Plus } from "lucide-react"

export default function LeadsPage() {
  const leads = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      phone: "(555) 123-4567",
      status: "contacted",
      nextFollowUp: "2026-01-15",
      company: "Acme Corp",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "(555) 234-5678",
      status: "lead",
      nextFollowUp: "2026-01-12",
      company: "Tech Solutions Inc",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@example.com",
      phone: "(555) 345-6789",
      status: "overdue",
      nextFollowUp: "2026-01-08",
      company: "Global Industries",
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily@example.com",
      phone: "(555) 456-7890",
      status: "contacted",
      nextFollowUp: "2026-01-20",
      company: "Future Ventures",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "contacted":
        return "bg-green-50 text-green-700 border-green-200"
      case "lead":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "overdue":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">Leads</h1>
        <Link href="/app/leads/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Lead
          </Button>
        </Link>
      </div>

      {/* Leads Table */}
      <Card className="border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Company</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Next Follow-Up</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-border hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">{lead.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{lead.company}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{lead.nextFollowUp}</td>
                  <td className="px-6 py-4">
                    <Link href={`/app/leads/${lead.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
