import { createSlice } from "@reduxjs/toolkit";
import { getCommentTask } from "../../services/managerComment.services";
import { createComment, deleteComment, getComment } from "./thunkAction";
import { toast } from "react-toastify";



type managerCommentInitialState = {
    listComment?: getCommentTask[]
}
const initialState: managerCommentInitialState = {

}
export const { reducer: managerCommentReducer, actions: managerCommentAction } = createSlice({
    name: "managerComment",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getComment.fulfilled, (state, action) => {
                if (action.payload.statusCode === 200) {
                    state.listComment = action.payload.content
                }
            })
            .addCase(createComment.fulfilled, (state, action) => {
                if (action.payload.statusCode === 200) {
                    console.log(action.payload.content);
                }
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                if (action.payload.statusCode === 200) {
                    toast.success(`${action.payload.content}`)
                }
            })
    }
})