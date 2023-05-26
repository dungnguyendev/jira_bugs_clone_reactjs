import { createSlice } from "@reduxjs/toolkit";
import { assignUserProject, createProject, deleteProject, getAllProject, getCategoryPj, getProjectByIdd, getProjectDetail, removeUserProject, updateProjectId } from "./thunkAction";
import { listProject, project, updateProject } from "../../services/managerProject.services";
import { toast } from "react-toastify";
import { ppid } from "process";
type managerProjectInitialState = {
    categoryPj?: project[]
    listProject?: listProject[]
    ProjectById?: listProject[]
    isLoadingProject: boolean
    projecEdit?: updateProject
    listProjectDetail?: listProject[]
}
const initialState: managerProjectInitialState = {
    isLoadingProject: false,

}
export const { reducer: managerProjectReducer, actions: managerProjectAction } = createSlice({
    name: "managerProject",
    initialState,
    reducers: {
        EDIT_PROJECT: (state, action) => {
            return { ...state, projecEdit: action.payload.PJ }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getCategoryPj.fulfilled, (state, action) => {
                state.categoryPj = action.payload
            })
            // 
            .addCase(createProject.pending, (state, action) => {
                state.isLoadingProject = true
            })
            .addCase(createProject.rejected, (state, action) => {
                if (action.error.message) state.isLoadingProject = false
            })
            .addCase(createProject.fulfilled, (state, action) => {
                if (action.payload.statusCode === 200) {
                    state.isLoadingProject = false
                    toast.success("Create project complete 😉")
                }
            })
            // 
            .addCase(getAllProject.fulfilled, (state, action) => {
                state.listProject = action.payload
            })
            // 
            .addCase(getProjectByIdd.fulfilled, (state, action) => {
                state.ProjectById = action.payload
            })
            // 
            .addCase(updateProjectId.pending, (state, action) => {
                state.isLoadingProject = true
            })
            .addCase(updateProjectId.rejected, (state, action) => {
                if (action.error.message) state.isLoadingProject = false
            })
            .addCase(updateProjectId.fulfilled, (state, action) => {
                if (action.payload.statusCode === 200) {
                    state.isLoadingProject = false
                    toast.success("Update project complete 😉")
                }
            })
            // 
            .addCase(getProjectDetail.fulfilled, (state, action) => {
                state.isLoadingProject = false
                state.listProjectDetail = [action.payload]
            })
            // 
            .addCase(deleteProject.pending, (state, action) => {
                state.isLoadingProject = true
            })
            .addCase(deleteProject.rejected, (state, action) => {
                if(action.error.message) state.isLoadingProject = false
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                if(action.payload.statusCode === 200){
                    state.isLoadingProject = false
                    toast.error("Delete complete project 👌")
                }
            })

    }
})