"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Card } from "@/src/components/ui/card"

export default function SettingsPage() {
  const [fullName, setFullName] = useState("John Doe")
  const [email, setEmail] = useState("john@example.com")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would make an API call
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would make an API call
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">Settings</h1>

      <div className="space-y-6 max-w-2xl">
        {/* Profile Settings */}
        <Card className="border border-border bg-card p-8">
          <h2 className="text-lg font-semibold text-foreground mb-6">Profile Information</h2>
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-background border border-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border border-border"
              />
            </div>

            <Button type="submit">Save Changes</Button>
          </form>
        </Card>

        {/* Password Settings */}
        <Card className="border border-border bg-card p-8">
          <h2 className="text-lg font-semibold text-foreground mb-6">Change Password</h2>
          <form onSubmit={handlePasswordChange} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="bg-background border border-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-background border border-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-background border border-border"
              />
            </div>

            <Button type="submit">Update Password</Button>
          </form>
        </Card>

        {/* Account Settings */}
        <Card className="border border-border bg-card p-8">
          <h2 className="text-lg font-semibold text-foreground mb-6">Account</h2>
          <div className="space-y-4">
            <div className="py-4 border-b border-border">
              <p className="text-foreground font-medium">Account Status</p>
              <p className="text-sm text-muted-foreground">Your account is active and in good standing.</p>
            </div>
            <div className="py-4 border-b border-border">
              <p className="text-foreground font-medium">Member Since</p>
              <p className="text-sm text-muted-foreground">January 2026</p>
            </div>
            <div className="py-4">
              <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent">
                Delete Account
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
