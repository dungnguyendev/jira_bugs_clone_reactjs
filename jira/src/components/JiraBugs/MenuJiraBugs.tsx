import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store'
import { managerUserAction } from '../../store/managerUser.service/slice'

import './scss/StyleMenu.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faUser } from '@fortawesome/free-solid-svg-icons'
const MenuJiraBugs = () => {
    const AppDispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <div className="menu">
            <div className="account">

                <div className="account-info ">
                    <img src={require("../../assets/img/klipartz.com.png")} alt="" />
                </div>
            </div>
            <div className="control">
                <div>
                    <i className="fa fa-credit-card text-blue-500" />
                    <NavLink className="navlink text-dark text-sm" to="/">Cyber Board</NavLink>
                </div>
                <div>
                    <i className="fa fa-cog text-blue-500" />
                    <NavLink className="navlink text-sm" to="/projectmamagement" >Project management</NavLink>
                </div>
                <div>
                    <FontAwesomeIcon icon={faCirclePlus} className='text-blue-500' />

                    <NavLink className="navlink text-sm" to="/create_project" >Create Project</NavLink>
                </div>
            </div>
            <div className="feature">
                <div>
                    <i className="fa fa-truck text-blue-500" />
                    <span>Releases</span>
                </div>
                <div>
                    <i className="fa fa-equals text-blue-500" />
                    <span>Issues and filters</span>
                </div>
                <div>
                    <i className="fa fa-paste text-blue-500" />
                    <span>Pages</span>
                </div>
                <div>
                    <i className="fa fa-location-arrow text-blue-500" />
                    <span>Reports</span>
                </div>
                <div>
                    <FontAwesomeIcon className='text-blue-500' icon={faUser} />
                    <NavLink className="navlink text-sm" to="/profileUser" >Profile</NavLink>
                </div>
            </div>
        </div>
    )
}

export default MenuJiraBugs