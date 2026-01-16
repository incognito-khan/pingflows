import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/src/lib/axios";
import { toast } from "sonner";

interface LeadState {
  leads: any[];
  lead: Lead | null;
  loading: boolean;
  error: string | null;
}

interface Lead {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  status: "OPEN" | "WAITING" | "CLOSE";
  nextFollowUpAt?: string | null;
  createdAt: string;
  workspaceId: string;
  lastContactedAt?: string | null;
  followupLogs?: any[];
  notes?: string | null;
}

const initialState: LeadState = {
  leads: [],
  lead: null,
  loading: false,
  error: null,
};

export const fetchLeads = createAsyncThunk("lead/fetchLeads", async () => {
  try {
    const response = await api.get("/leads");
    return response.data.data;
  } catch (error) {
    throw error;
  }
});

export const fetchLead = createAsyncThunk(
  "lead/fetchLead",
  async ({ leadId }: { leadId: string }) => {
    try {
      const response = await api.get(`/leads/${leadId}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLeads.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLeads.fulfilled, (state, action) => {
      state.loading = false;
      state.leads = action.payload;
    });
    builder.addCase(fetchLeads.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch lead";
    });
    builder.addCase(fetchLead.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLead.fulfilled, (state, action) => {
      state.loading = false;
      state.lead = action.payload;
    });
    builder.addCase(fetchLead.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch lead";
    });
  },
});

export default leadSlice.reducer;
