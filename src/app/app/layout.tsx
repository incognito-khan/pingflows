import type React from "react"
import Link from "next/link"
import { LogOut, SettingsIcon, BarChart3, Users } from "lucide-react"
import { Button } from "@/src/components/ui/button"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar Navigation */}
      <div className="hidden md:fixed md:w-64 md:h-screen md:bg-card md:border-r md:border-border md:flex md:flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">PF</span>
            </div>
            <span className="font-bold text-foreground text-sm">PingFollow</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavLink href="/app/dashboard" label="Dashboard" icon={BarChart3} />
          <NavLink href="/app/leads" label="Leads" icon={Users} />
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-border space-y-2">
          <NavLink href="/app/settings" label="Settings" icon={SettingsIcon} />
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Mobile Header */}
        <div className="md:hidden h-16 bg-card border-b border-border flex items-center px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">PF</span>
            </div>
            <span className="font-bold text-foreground text-sm">PingFollow</span>
          </Link>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-8">{children}</div>
      </div>
    </div>
  )
}

function NavLink({
  href,
  label,
  icon: Icon,
}: {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  )
}
