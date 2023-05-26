import { createAsyncThunk } from "@reduxjs/toolkit"
import { editCommentTask, managerComment, postComment } from "../../services/managerComment.services"

export const createComment = createAsyncThunk(
    "Project/CreateComment",
    async (formData: postComment, { rejectWithValue }) => {
        try {
            const res = await managerComment.postCommentTask(formData)
            return res.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const editComment = createAsyncThunk(
    "Project/editComment",
    async (formData: editCommentTask, { rejectWithValue }) => {
        try {
            const res = await managerComment.editCommentTask(formData)
            return res.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const deleteComment = createAsyncThunk(
    "Project/deleteComment",
    async (id: number, { rejectWithValue }) => {
        try {
            console.log(id);
            const res = await managerComment.delteCommentTask(id)
            return res.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const getComment = createAsyncThunk(
    "Project/getComment",

    async (id: number, { rejectWithValue }) => {
        try {
            console.log(id);
            const res = await managerComment.getCommentByIdTask(id)
            return res.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)