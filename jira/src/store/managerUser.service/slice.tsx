import { createSlice } from '@reduxjs/toolkit'
import { signIn, signUp, getUserByKeyWord, GetUserByIdProject, EditUser, getUserByKeyWordProfile } from './thunkAction'
import { toast } from 'react-toastify'
import { getUserJira } from '../../services/managerUser.services'
type managerUserInitialState = {
    user?: getUserJira[],
    isLoadingSignIn?: boolean,
    userSearch?: getUserJira[],
    userPj?: getUserJira[],
    userProfile?: getUserJira[]
}
const initialState: managerUserInitialState = {
    isLoadingSignIn: false,
}
export const { reducer: managerUserReducer, actions: managerUserAction } = createSlice({
    name: "managerUser",
    initialState,
    reducers: {
        logOut: (state, action) => {
            localStorage.removeItem("user");
            toast.error("Goodbye 😉");
        },
        getUser: (state, action) => {
            const data = localStorage.getItem("user");
            if (data) {
                state.user = [JSON.parse(data)];
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(signUp.pending, (state, action) => {
                state.isLoadingSignIn = true
            })
            .addCase(signUp.rejected, (state, action) => {
               if(action.error.message) state.isLoadingSignIn = false
            })
            .addCase(signUp.fulfilled, (state, action) => {
                if(action.payload.statusCode === 200){
                    state.isLoadingSignIn = false
                    toast.success("Creat account comlpete 💕")
                }
            })
            .addCase(signIn.pending, (state, action) => {
                state.isLoadingSignIn = true
            })
            .addCase(signIn.rejected, (state, action) => {
                if (action.error.message) state.isLoadingSignIn = false
            })
            .addCase(signIn.fulfilled, (state, action) => {
                if (action.payload.statusCode === 200) {
                    state.user = action.payload.content
                    state.userProfile = action.payload.content
                    localStorage.setItem("user", JSON.stringify(action.payload.content))
                    state.isLoadingSignIn = false
                    toast.success("Please create new task 😊")
                }
            })
            .addCase(getUserByKeyWord.fulfilled, (state, action) => {
                state.userSearch = action.payload
            })
            .addCase(GetUserByIdProject.rejected, (state, action) => {

            })
            .addCase(GetUserByIdProject.fulfilled, (state, action) => {
                state.userPj = action.payload
            })
            .addCase(EditUser.pending, (state, action) => {
                state.isLoadingSignIn = true
            })
            .addCase(EditUser.rejected, (state, action) => {
                if (action.error.message) state.isLoadingSignIn = false
            })
            .addCase(EditUser.fulfilled, (state, action) => {
                if (action.payload.statusCode === 200) {
                    state.isLoadingSignIn = false
                    toast.success("Change imformation complete 😉")
                }
            })
            .addCase(getUserByKeyWordProfile.rejected, (state, action) => {
                if (action.error.message) state.isLoadingSignIn = false
            })
            .addCase(getUserByKeyWordProfile.fulfilled, (state, action) => {
                state.isLoadingSignIn = false
                state.userProfile = action.payload.content
            })
    }
})
