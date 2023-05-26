import React from 'react'
import { NavLink } from 'react-router-dom'
import 'animate.css';
const Home = () => {
    return (
        <div className='main' >
            <div className='flex flex-col justify-center' style={{ height: "80vh" }}>
                <p className='text-center animate__animated animate__slideInUp w-full font-bold text-3xl'>Wecome to Jira</p>
                <NavLink to="/create_project" className='animate__animated  animate__slideInUp text-center w-full text-xl cursor-pointer'>Let's create a new project</NavLink>
            </div>
        </div>
    )
}

export default Home