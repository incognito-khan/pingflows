import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

interface AuthState {
  user: {
    id: string;
    fullName: string;
    email: string;
    createdAt: string;
    workspace: {
      id: string;
      name: string;
      createdAt: string;
      ownerId: string;
    }
  };
  token: string;
  isUserLoggedIn: boolean;
}

const initialState: AuthState = {
  user: {
    id: "",
    fullName: "",
    email: "",
    createdAt: "",
    workspace: {
      id: "",
      name: "",
      createdAt: "",
      ownerId: ""
    }
  },
  token: "",
  isUserLoggedIn: false,
};

export const register = createAsyncThunk(
  "auth/register",
  async (user: { fullName: string; email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/signup", user);
      toast.success("User registered successfully");
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/login", user);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      toast.success("User logged in successfully");
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isUserLoggedIn = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.isUserLoggedIn = false;
    });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
