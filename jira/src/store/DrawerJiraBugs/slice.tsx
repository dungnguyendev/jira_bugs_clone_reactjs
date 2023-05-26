import { createSlice } from "@reduxjs/toolkit";
import { ReactElement } from "react";

type managerProjectInitialState = {
    setOpenReducer?: boolean,
    ComponentContentDrawer?: ReactElement,
    callBackSubmit?: () => void,
    title?: string
}
const initialState: managerProjectInitialState = {
    setOpenReducer: false,
}
export const { reducer: DrawerProjecttReducer, actions: DrawerProjectAction } = createSlice({
    name: "DrawerProject",
    initialState,
    reducers: {
        OPEN_EDIT_FORM_DRAWER: (state, action) => {
            // console.log(action.payload.content);
            return { ...state, setOpenReducer: true, ComponentContentDrawer: action.payload.content, title: action.payload.title }
        },
        CLOSE_DRAWER: (state, action) => {
            return { ...state, setOpenReducer: false }
        },
        SET_SUBMIT_EDIT: (state, action) => {
            return { ...state, callBackSubmit: action.payload.submitForm }
        },
        OPEN_CREATE_TASKl: (state, action) => {
            return {...state,setOpenReducer:true,ComponentContentDrawer:action.payload.content,title:action.payload.title}
        }
    },
    extraReducers: builder => {


    }
})