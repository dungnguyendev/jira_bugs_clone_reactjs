import React, { ReactNode, useEffect } from 'react'

import HeaderMain from '../../components/JiraBugs/Main/HeaderMain'
import InfoMain from '../../components/JiraBugs/Main/InfoMain'
import ContenMain from '../../components/JiraBugs/Main/ContenMain'
import { RootState, useAppDispatch } from '../../store'
import { getProjectDetail } from '../../store/managerProject.service/thunkAction'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { checkToken } from '../../constant/api'

const Home = () => {
    if (localStorage.getItem("user")) {
        checkToken()
    }
    const appDispath = useAppDispatch()
    const { listProjectDetail } = useSelector((state: RootState) => state.managerProject)
    const param = useParams()
    const members = listProjectDetail?.flatMap(item => { return item.members })
    const description = listProjectDetail?.flatMap(item => { return item.description })
    const titlePj = listProjectDetail?.flatMap(item => { return item.projectName })
    useEffect(() => {
        appDispath(getProjectDetail(Number(param.projectId)))
    }, [])
    return (

        <div className="main">

            <HeaderMain titlePj1={titlePj} />
            <InfoMain members1={members} des={description} />
            <ContenMain project={listProjectDetail} />
        </div>
    )
}

export default Home as React.FC<any>;