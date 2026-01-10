"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Card } from "@/src/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function AddLeadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    nextFollowUp: "",
    notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would make an API call
    router.push("/app/leads")
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-8">
        <Link href="/app/leads">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Add Lead</h1>
      </div>

      <div className="max-w-2xl">
        <Card className="border border-border bg-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                <Input
                  type="text"
                  name="name"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-background border border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Company *</label>
                <Input
                  type="text"
                  name="company"
                  placeholder="Acme Corp"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="bg-background border border-border"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-background border border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-background border border-border"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Next Follow-Up Date</label>
              <Input
                type="date"
                name="nextFollowUp"
                value={formData.nextFollowUp}
                onChange={handleChange}
                className="bg-background border border-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Notes</label>
              <textarea
                name="notes"
                placeholder="Add any notes about this lead..."
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex gap-3 pt-6">
              <Button type="submit" className="px-8">
                Create Lead
              </Button>
              <Link href="/app/leads">
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
