import { createSlice } from "@reduxjs/toolkit";
import { CreateTask, GetAllStatus, GetTaskDetail, UpdateStatus, getAllPriority, getAllTaskType } from "./thunkAction";
import { priority, status, taskDetailModel, taskType } from "../../services/manageTask.services";
import { toast } from "react-toastify";
type managerTaskInitialState = {
    listPriority?: priority[],
    listTaskType?: taskType[],
    listStatus?: status[],
    taskDetail?: taskDetailModel[],
    isLoadingTask?: boolean
}
const initialState: managerTaskInitialState = {
    isLoadingTask: false
}
export const { reducer: managerTaskReducer, actions: managerTaskAction } = createSlice({
    name: "Task",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllPriority.fulfilled, (state, action) => {
                state.listPriority = action.payload
            })
            .addCase(getAllTaskType.fulfilled, (state, action) => {
                state.listTaskType = action.payload
            })
            .addCase(CreateTask.pending, (state, action) => {
                state.isLoadingTask = true
            })
            .addCase(CreateTask.rejected, (state, action) => {
                if(action.error.message) state.isLoadingTask = false
            })
            .addCase(CreateTask.fulfilled, (state, action) => {
                if(action.payload?.statusCode === 200) {
                    state.isLoadingTask = false
                    toast.success("Create task complete 😉")
                }
            })
            .addCase(GetAllStatus.fulfilled, (state, action) => {
                state.listStatus = action.payload
            })
            // 
            .addCase(GetTaskDetail.fulfilled, (state, action) => {
                state.taskDetail = [action.payload]
            })
            // 
            .addCase(UpdateStatus.fulfilled, (state, action) => {
                if(action.payload?.statusCode === 200){
                    toast.success("Did you change status 👍")
                }
            })
    }
})