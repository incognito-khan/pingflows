"use client";

import { useState, useEffect } from "react";
import { Card } from "@/src/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { getWorkspaceById } from "@/src/redux/slices/workspaceSlice";

export default function DashboardPage() {
  const workspace = useAppSelector((state) => state.workspace.workspace);
  const dueToday = useAppSelector((state) => state.workspace.dueToday);
  const overdue = useAppSelector((state) => state.workspace.overdue);
  const user = useAppSelector((state) => state.auth.user);
  const [activeFilter, setActiveFilter] = useState<
    "ALL" | "DUE_TODAY" | "OVERDUE" | "UPCOMING"
  >("ALL");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWorkspaceById(user.workspace.id));
  }, [dispatch, user.workspace.id]);

  console.log(workspace);

  const stats = [
    {
      label: "Total Leads",
      value: workspace?.leads?.length,
      change: "+3 this week",
    },
    { label: "Due Today", value: dueToday?.length, change: "Prioritize these" },
    { label: "Overdue", value: overdue?.length, change: "Needs attention" },
    {
      label: "Contacted This Week",
      value:
        workspace?.leads?.filter((lead) => lead.status === "CLOSE").length || 0,
      change: "+40% vs last week",
    },
  ];

  const getWeekDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return {
        label: days[d.getDay()],
        date: d.toDateString(),
        count: 0,
      };
    });
  };

  const chartData = (() => {
    if (!workspace?.leads) return [];

    const week = getWeekDays();

    workspace.leads.forEach((lead) => {
      lead.followupLogs?.forEach((log) => {
        const logDate = new Date(log.createdAt).toDateString();

        const day = week.find((d) => d.date === logDate);
        if (day) {
          day.count += 1;
        }
      });
    });

    return week.map((d) => ({
      name: d.label,
      contacts: d.count,
    }));
  })();

  const filteredLeads = (() => {
    if (!workspace?.leads) return [];

    const now = new Date();
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    switch (activeFilter) {
      case "DUE_TODAY":
        return workspace.leads.filter(
          (l) =>
            l.nextFollowUpAt &&
            new Date(l.nextFollowUpAt) >= startOfToday &&
            new Date(l.nextFollowUpAt) <= endOfToday
        );

      case "OVERDUE":
        return workspace.leads.filter(
          (l) =>
            l.nextFollowUpAt &&
            new Date(l.nextFollowUpAt) < now &&
            l.status !== "CLOSE"
        );

      case "UPCOMING":
        return workspace.leads.filter(
          (l) => l.nextFollowUpAt && new Date(l.nextFollowUpAt) > endOfToday
        );

      default:
        return workspace.leads;
    }
  })();

  const recentActivity = (() => {
    if (!workspace?.leads) return [];

    return workspace.leads
      .flatMap((lead) =>
        lead.followupLogs.map((log) => ({
          id: log.id,
          action: log.action,
          comment: log.comment,
          leadName: lead.name,
          createdAt: log.createdAt,
        }))
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  })();

  const timeAgo = (date: string | Date) => {
    const diff = Date.now() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border border-border bg-card p-6">
            <p className="text-muted-foreground text-sm font-medium mb-2">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-foreground mb-2">
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </Card>
        ))}
      </div>

      {/* Chart Card */}
      <Card className="border border-border bg-card p-6 mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-6">
          Follow-ups by Day
        </h2>
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
            <Bar
              dataKey="contacts"
              fill="var(--primary)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Filter Buttons */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Quick Filters
        </h2>

        <div className="flex flex-wrap gap-3">
          {[
            { label: "All", value: "ALL" },
            { label: "Due Today", value: "DUE_TODAY" },
            { label: "Overdue", value: "OVERDUE" },
            { label: "Upcoming", value: "UPCOMING" },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value as any)}
              className={`px-4 py-2 rounded-lg border transition-colors cursor-pointer ${
                activeFilter === f.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border-border hover:bg-secondary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      {/* Filtered Leads List */}
      <Card className="border border-border bg-card p-6 mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Leads</h2>

        {filteredLeads.length === 0 && (
          <p className="text-muted-foreground text-sm">
            No leads found for this filter
          </p>
        )}

        <div className="space-y-3">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="flex justify-between items-center p-3 rounded-lg border border-border"
            >
              <div>
                <p className="font-medium text-foreground">{lead.name}</p>
                <p className="text-sm text-muted-foreground">
                  {lead.email || lead.phone || "No contact info"}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {lead.status}
                </p>
                {lead.nextFollowUpAt && (
                  <p className="text-xs text-muted-foreground">
                    Follow-up:{" "}
                    {new Date(lead.nextFollowUpAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
