import React from 'react'
import { RootState, useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { DrawerProjectAction } from '../../store/DrawerJiraBugs/slice'
import CreateTaskForm from '../../pages/home/SettingTask/CreateTaskForm'

const SideBarJiraBugs = () => {
    const appDispatch = useAppDispatch()
    return (
        <div>
            <div className="sideBar">
                <div className="sideBar-top">
                    <div className="sideBar-icon">
                        <i className="fab fa-jira" />
                    </div>
                    <div className="sideBar-icon" data-toggle="modal" data-target="#searchModal" style={{ cursor: 'pointer' }}>
                        <i className="fa fa-search" />
                        <span className="title">SEARCH ISSUES</span>
                    </div>
                    <div className="sideBar-icon">
                        <i className="fa fa-plus" />
                        <span onClick={() => {
                            appDispatch(DrawerProjectAction.OPEN_EDIT_FORM_DRAWER({
                                content: <CreateTaskForm />,
                                title: "Create task"
                            }))
                        }} className="title cursor-pointer">CREATE TASK</span>


                    </div>
                </div>
                <div className="sideBar-bottom">
                    <div className="sideBar-icon">
                        <i className="fa fa-question-circle" />
                        <span className="title">ABOUT</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBarJiraBugs