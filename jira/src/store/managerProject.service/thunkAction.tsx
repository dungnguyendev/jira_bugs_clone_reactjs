import { createAsyncThunk } from "@reduxjs/toolkit";
import { addUserProject, createPj, listProject, managerProjectServices, project, updateProject } from "../../services/managerProject.services";

export const getCategoryPj = createAsyncThunk(
    "Project/getPj",
    async (_, { rejectWithValue }) => {
        try {
            const res = await managerProjectServices.projectCategory()
            return res.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const createProject = createAsyncThunk(
    "Project/CreatePj",
    async (formData:createPj, { rejectWithValue }) => {
        try {
            const res = await managerProjectServices.createProject(formData)
            return res.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const getAllProject = createAsyncThunk(
    "Project/getAllPj",
    async (_, { rejectWithValue }) => {
        try {
            const res = await managerProjectServices.getAllProject()
            return res.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const assignUserProject = createAsyncThunk(
    "Project/addUseEnterPj",
    async (payload: addUserProject, { rejectWithValue }) => {
        try {
            const res = await managerProjectServices.assignUserProject(payload)
            return res.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const removeUserProject = createAsyncThunk(
    "Project/removeUseEnterPj",
    async (payload: addUserProject, { rejectWithValue }) => {
        try {
            const res = await managerProjectServices.deleteUserFromProject(payload)
            return res.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const getProjectByIdd = createAsyncThunk(
    "Project/getPjByid",
    async (payload: number, { rejectWithValue }) => {
        try {
            const res = await managerProjectServices.getProjectById(payload)
            return res.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const updateProjectId = createAsyncThunk(
    "Project/UpdatePj",
    async (formdata:updateProject, { rejectWithValue }) => {
        try {
            console.log(formdata);
            
            const res = await managerProjectServices.updateProject(formdata)
            return res.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const deleteProject = createAsyncThunk(
    "Project/deletePj",
    async (id:number, { rejectWithValue }) => {
        try {
            const res = await managerProjectServices.deleteProject(id)
            return res.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const getProjectDetail = createAsyncThunk(
    "Project/getPjDetail",
    async (id:number, { rejectWithValue }) => {
        try {
            const res = await managerProjectServices.getPjDetail(id)
            return res.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)