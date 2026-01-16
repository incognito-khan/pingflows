"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { ArrowLeft, Phone, Mail, Calendar } from "lucide-react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { fetchLead } from "@/src/redux/slices/leadSlice";
import { format } from "date-fns";

export default function LeadDetailPage() {
  const lead = useAppSelector((state) => state.lead.lead);
  console.log(lead);
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params.id as string;
  const [notes, setNotes] = useState("");

  const getLead = () => {
    dispatch(fetchLead({ leadId: id }));
  };

  useEffect(() => {
    getLead();
  }, [id]);

  useEffect(() => {
    setNotes(lead?.notes || "");
  }, [lead]);

  const formatDate = (date: any) => {
    return format(date, "yyyy-MM-dd");
  };
  const timeline =
    lead?.followupLogs
      ?.slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .map((log) => {
        const date = new Date(log.createdAt);

        return {
          id: log.id,
          action: log.action,
          description: log.comment,
          date: date.toLocaleDateString(),
          time: date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      }) || [];

  if (!lead) {
    return <p>Loading lead...</p>;
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-8">
        <Link href="/app/leads">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">{lead.name}</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lead Info Card */}
          <Card className="border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Lead Information
            </h2>
            <div className="space-y-4">
              {[
                { icon: Phone, label: "Phone", value: lead.phone },
                { icon: Mail, label: "Email", value: lead.email },
                {
                  icon: Calendar,
                  label: "Next Follow-Up",
                  value: formatDate(lead.nextFollowUpAt),
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-4 py-3 border-b border-border last:border-0"
                  >
                    <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-foreground font-medium">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Notes Card */}
          <Card className="border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Notes
            </h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes..."
              rows={4}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="mt-4 cursor-pointer">Save Notes</Button>
          </Card>

          {/* Timeline */}
          <Card className="border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Timeline
            </h2>
            <div className="space-y-6">
              {timeline.map((entry, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    {idx < timeline.length - 1 && (
                      <div className="w-0.5 h-12 bg-border mt-4"></div>
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-medium text-foreground">
                      {entry.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {entry.date} at {entry.time}
                    </p>
                    {entry.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {entry.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card className="border border-border bg-card p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Status
            </h3>
            <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
              {lead.status}
            </div>
          </Card>

          {/* Actions */}
          <Card className="border border-border bg-card p-6 space-y-3">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Actions
            </h3>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
            >
              Mark Contacted
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
            >
              Snooze
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
            >
              Close
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
            >
              Delete
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
