import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { RootState, useAppDispatch } from '../store'
import { toast } from 'react-toastify'
import SideBarJiraBugs from '../components/JiraBugs/SideBarJiraBugs'
import MenuJiraBugs from '../components/JiraBugs/MenuJiraBugs'
import SearchJiraBugs from '../components/JiraBugs/SearchJiraBugs'
import InfoModalJira from '../components/JiraBugs/InfoModalJira'
import MenuTopJira from '../components/JiraBugs/MenuTopJira'
const MainLayout = () => {
    const [showMaintenance, setShowMaintenance] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem("user")) {
            toast.error("You need to login to the homepage 😊")
            return navigate("/login")
        }
        const handleWindowResize = () => {
            setShowMaintenance(window.innerWidth < 760);
        };

        window.addEventListener('resize', handleWindowResize);


        handleWindowResize();


        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };

    }, [])
    const { isLoadingProject } = useSelector((state: RootState) => state.managerProject)
    const { isLoadingTask } = useSelector((state: RootState) => state.managerTask)
    const { isLoadingSignIn } = useSelector((state: RootState) => state.managerUser)
    if (showMaintenance) {
        return (
            <div className="maintenance-message w-full h-screen flex justify-center flex-col" style={{ alignItems: "center" }}>
               
                    <img src={require("./../assets/img/maintenace2.gif")} alt="" width="70%" height="40%"/>
                    <h3 className='text-lg'>System under maintenance!</h3>
                    <p>We are very sorry for the inconvenience 🥺</p>
               
            </div>
        );
    }
    if (isLoadingProject || isLoadingTask || isLoadingSignIn) {
        return (
            <div className="h-screen grid content-center">
                <div className='boxLoading flex justify-center'>
                    <svg className="gegga">
                        <defs>
                            <filter id="gegga">
                                <feGaussianBlur in="SourceGraphic" stdDeviation={7} result="blur" />
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10" result="inreGegga" />
                                <feComposite in="SourceGraphic" in2="inreGegga" operator="atop" />
                            </filter>
                        </defs>
                    </svg>
                    <svg className="snurra" width={200} height={200} viewBox="0 0 200 200">
                        <defs>
                            <linearGradient id="linjärGradient">
                                <stop className="stopp1" offset={0} />
                                <stop className="stopp2" offset={1} />
                            </linearGradient>
                            <linearGradient y2={160} x2={160} y1={40} x1={40} gradientUnits="userSpaceOnUse" id="gradient" xlinkHref="#linjärGradient" />
                        </defs>
                        <path className="halvan" d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64" />
                        <circle className="strecken" cx={100} cy={100} r={64} />
                    </svg>

                </div>

            </div>
        );
    }
    return (
        <div className="jira">

            <SideBarJiraBugs />

            <MenuJiraBugs />

            <MenuTopJira />

            <Outlet />

            <SearchJiraBugs />

            <InfoModalJira />

        </div>
    )
}

export default MainLayout