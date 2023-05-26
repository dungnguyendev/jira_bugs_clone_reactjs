import { createAsyncThunk } from "@reduxjs/toolkit";
import {  getUserJira, managerUserServices } from "../../services/managerUser.services";


export const signUp = createAsyncThunk(
    "Users/signUp",
    async (payload: getUserJira, { rejectWithValue }) => {
        try {
            const res = await managerUserServices.signUp(payload);
            return res.data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const signIn = createAsyncThunk(
    "Users/signIn",
    async (payload: getUserJira, { rejectWithValue }) => {
        try {
            const res = await managerUserServices.signIn(payload);
            return res.data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const getUserByKeyWord = createAsyncThunk(
    "Users/getUserById",
    async (payload: string, { rejectWithValue }) => {
        try {
            const res = await managerUserServices.getUserByKeyWord(payload);
            return res.data.content;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const GetUserByIdProject = createAsyncThunk(
    "Users/getUserByIdPj",
    async (payload: number, { rejectWithValue }) => {
        try {
            const res = await managerUserServices.getUserByIdProject(payload);
            return res.data.content;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const EditUser = createAsyncThunk(
    "Users/editUser",
    async (payload: getUserJira, { rejectWithValue }) => {
        try {
            const res = await managerUserServices.editUser(payload);
            return res.data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const getUserByKeyWordProfile = createAsyncThunk(
    "Users/getUserProfile",
    async (payload: string, { rejectWithValue }) => {
        try {
            const res = await managerUserServices.getUserByKeyWordProfile(payload);
            return res.data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
