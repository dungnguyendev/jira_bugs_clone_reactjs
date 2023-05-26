import { configureStore } from "@reduxjs/toolkit";
import { managerUserAction, managerUserReducer } from "./managerUser.service/slice";
import { useDispatch } from "react-redux";
import { managerProjectReducer } from "./managerProject.service/slice";
import { DrawerProjecttReducer } from "./DrawerJiraBugs/slice";
import { managerTaskReducer } from "./managerTask/slice";
import { managerCommentReducer } from "./managerComment.service/slice";

export const store = configureStore({
    reducer: {
        managerUser: managerUserReducer,
        managerProject: managerProjectReducer,
        drawer: DrawerProjecttReducer,
        managerTask: managerTaskReducer,
        managerComment: managerCommentReducer
    }
})
store.dispatch(managerUserAction.getUser);

export type RootState = ReturnType<typeof store['getState']>
export type AppDispatch = typeof store['dispatch']
export const useAppDispatch: () => AppDispatch = useDispatch