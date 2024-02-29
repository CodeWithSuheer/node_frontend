import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

//API URL
const signupUrl = "https://nodejs-todoapp-asns.onrender.com/api/v1/users/new";
const loginUrl = "https://nodejs-todoapp-asns.onrender.com/api/v1/users/login";
const userDetailUrl = "https://nodejs-todoapp-asns.onrender.com/api/v1/users/me";
const logoutUrl = "https://nodejs-todoapp-asns.onrender.com/api/v1/users/logout";

//CREATE ASYNC THUNK
export const createuserAsync = createAsyncThunk(
    "user/create",
    async (formData) => {
        try {
            const response = await axios.post(signupUrl, formData, { withCredentials: true });
            toast.success(response.data.msg);
            // console.log(response.data.msg);
            return response.data;
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }
);

//LOGIN ASYNC THUNK
export const loginuserAsync = createAsyncThunk(
    "user/login",
    async (formData) => {
        try {
            const response = await axios.post(loginUrl, formData, { withCredentials: true });
            // toast.success(response.data.msg);
            console.log(response.data.msg);
            return response.data;
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }
);

//DETAILS ASYNC THUNK
export const userDetailsAsync = createAsyncThunk(
    "user/details",
    async () => {
        try {
            const response = await axios.get(userDetailUrl, { withCredentials: true });
            return response.data;
        } catch (error) {
            // toast.error(error.response.data.message);
            console.log(error.response.data);
        }
    }
);

//LOGOUT ASYNC THUNK
export const logoutuserAsync = createAsyncThunk(
    "user/logout",
    async () => {
        try {
            const response = await axios.get(logoutUrl, { withCredentials: true });
            return response.data;
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }
);


// INITIAL STATE
const initialState = {
    createUser: null,
    user: null,
    userDetails: null,
    loading: false,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        reset: (state) => initialState,
        setAuthenticated: (state, action) => {
            state.user = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder

            // SIGN UP ADD CASE
            .addCase(createuserAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createuserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.createUser = action.payload;
            })

            // LOGIN ADD CASE
            .addCase(loginuserAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loginuserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })

            // DETAILS ADD CASE
            .addCase(userDetailsAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(userDetailsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetails = action.payload;
            })

    },
});

export const { reset, setAuthenticated } = authSlice.actions;

export default authSlice.reducer;
