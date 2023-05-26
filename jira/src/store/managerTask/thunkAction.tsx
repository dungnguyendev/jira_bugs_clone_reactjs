import { createAsyncThunk } from "@reduxjs/toolkit";
import { AssignTask, managerTaskServices, statusUpdata, taskList, updateEstimete, updatePriority, updateTask } from "../../services/manageTask.services";
import { toast } from "react-toastify";


// priority
export const getAllPriority = createAsyncThunk(
  "task/getAllPriory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await managerTaskServices.getAllPriority()
      return res.data.content
    } catch (error) {
      rejectWithValue(error)
    }
  }
)
export const UpdatePriority = createAsyncThunk(
  "task/updatePriority",
  async (form: updatePriority, { rejectWithValue }) => {
    try {
      console.log(form);
      const res = await managerTaskServices.updatePriority(form)
      return res.data.content
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

// task
export const getAllTaskType = createAsyncThunk(
  "task/getAllTaskType",
  async (_, { rejectWithValue }) => {
    try {
      const res = await managerTaskServices.getAllTaskType()
      return res.data.content
    } catch (error) {
      rejectWithValue(error)
    }
  }
)
export const CreateTask = createAsyncThunk(
  "task/createTask",
  async (formDate: taskList, { rejectWithValue }) => {
    try {
      console.log(formDate);

      const res = await managerTaskServices.createTask(formDate)
      
      return res.data
    } catch (error) {
      console.log(rejectWithValue(error));
    }
  }
)
export const GetTaskDetail = createAsyncThunk(
  "task/getTask",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await managerTaskServices.getTaskDetail(id)
      return res.data.content
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

// status
export const GetAllStatus = createAsyncThunk(
  "task/getAllStatus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await managerTaskServices.getAllStatus()
      return res.data.content
    } catch (error) {
      rejectWithValue(error)
    }
  }
)
export const UpdateStatus = createAsyncThunk(
  "task/updateStatus",
  async (formData: statusUpdata, { rejectWithValue }) => {
    try {
      const res = await managerTaskServices.updateStatus(formData)
      return res.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)
// des task
export const UpdateTask = createAsyncThunk(
  "task/updateTask",
  async (formData: updateTask, { rejectWithValue }) => {
    try {
      const res = await managerTaskServices.updateTask(formData)
      return res.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)
// add assign error api
export const AddAsignTask = createAsyncThunk(
  "task/addAsignTask",
  async (formData: AssignTask, { rejectWithValue }) => {
    try {
      const res = await managerTaskServices.AddAssignTask(formData)
      return res.data.content
    } catch (error) {
      rejectWithValue(error)
    }
  }
)
export const RemoveAsignTask = createAsyncThunk(
  "task/removeUserTask",
  async (formData: AssignTask, { rejectWithValue }) => {
    try {
      const res = await managerTaskServices.RemoveUserFromTask(formData)
      return res.data.content
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

// originalEstimete
export const UpdateEstimete = createAsyncThunk(
  "task/updateEstime",
  async (formData: updateEstimete, { rejectWithValue }) => {
    try {
      console.log(formData);
      
      const res = await managerTaskServices.updateEstimete(formData)
      return res.data.content
    } catch (error) {
      rejectWithValue(error)
    }
  }
)


