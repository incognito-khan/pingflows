import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

interface WorkspaceState {
  workspace: {
    id: string;
    name: string;
    createdAt: string;
    ownerId: string;
    leads: {
      id: string;
      name: string;
      email: string;
      phone: string;
      createdAt: string;
      status: string;
      lastContactedAt: string;
      nextFollowUpAt: string;
      followupLogs: {
        id: string;
        createdAt: string;
        comment: string;
        action: string;
      }[];
    }[];
  };
  dueToday: {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
    status: string;
    lastContactedAt: string;
    nextFollowUpAt: string;
    followupLogs: {
      id: string;
      createdAt: string;
      comment: string;
      action: string;
    }[];
  }[];
  overdue: {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
    status: string;
    lastContactedAt: string;
    nextFollowUpAt: string;
    followupLogs: {
      id: string;
      createdAt: string;
      comment: string;
      action: string;
    }[];
  }[];
}

const initialState: WorkspaceState = {
  workspace: {
    id: "",
    name: "",
    createdAt: "",
    ownerId: "",
    leads: [],
  },
  dueToday: [],
  overdue: [],
};

export const getWorkspaceById = createAsyncThunk(
  "workspace/getWorkspaceById",
  async (workspaceId: string) => {
    try {
      const response = await axios.get(`/api/workspace/${workspaceId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
);

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWorkspaceById.fulfilled, (state, action) => {
      state.workspace = action.payload.data.workspace;
      state.dueToday = action.payload.data.dueToday;
      state.overdue = action.payload.data.overdue;
    });
  },
});

export const {} = workspaceSlice.actions;

export default workspaceSlice.reducer;
