import React from "react";
import { Navigate, useRoutes } from 'react-router-dom'
import IndexJiraBugs from '../pages/home/IndexJiraBugs'

import Register from '../pages/Register'
import NotFounf from '../pages/NotFounf'
import Login from '../pages/Login'
import MainLayout from "../layout/MainLayoutJiraBugs";
import CreateProject from "../pages/home/SettingProject/CreateProject";
import ProjectManagement from "../pages/home/SettingProject/ProjectManagement";

import Home from "../pages/home/Home";
import ProfileUser from "../pages/home/ProfileUser/ProfileUser";


const Router = (): JSX.Element | null => {
    const elements = useRoutes([

        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/projectdetail/:projectId",
                    element: <IndexJiraBugs />
                },
                {
                    path: "/create_project",
                    element: <CreateProject />
                },
                {
                    path: "/projectmamagement",
                    element: <ProjectManagement />
                },
                {
                    path: "/profileUser",
                    element: <ProfileUser />
                },
                
            ]
        },

        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/register",
            element: <Register />
        },
       
        {
            path: "*",
            element: <Navigate to="/404" />
        },
        {
            path: "/404",
            element: <NotFounf />
        }
    ])
    return elements;
}
export default Router