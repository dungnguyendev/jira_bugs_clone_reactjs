import React, { useEffect, useState } from 'react'
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import "./scss/StyleNavLayout.scss"
import { NavLink, useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { getUserJira } from '../../services/managerUser.services';
import { managerUserAction } from '../../store/managerUser.service/slice';
import { getUserByKeyWordProfile } from '../../store/managerUser.service/thunkAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
const MenuTopJira = () => {
    const AppDispatch = useAppDispatch()
    const navigate = useNavigate()
    const { user, userProfile } = useSelector((state: RootState) => state.managerUser)
    const userObj = user && user.length > 0 ? user[0] : null
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (count < 2) {
            AppDispatch(managerUserAction.getUser({}));
            AppDispatch(getUserByKeyWordProfile(String(userObj?.id)));
            setCount(count + 1);
        }
    }, [count]);
    const userProfileClone = userProfile && userProfile.length > 0 ? userProfile[0] : null
    const items: MenuProps['items'] = [
        {
            label: (
                <NavLink className="p-1" style={{textDecoration:"none"}} to={"/profileUser"}  >
                   <FontAwesomeIcon className='text-blue-400 mr-2' icon={faUser} /> Profile
                </NavLink>
            ),
            key: '0',
        },
        {
            label: (
                <p className='text-red-500 p-1' onClick={async () => {
                    await AppDispatch(managerUserAction.logOut({}))
                    navigate("/login")
                }} >
                   <FontAwesomeIcon className='mr-2' icon={faArrowRightFromBracket} />  Log out
                </p>
            ),
            key: '1',
        },

    ];


    return (
        <div className='topLayout bg-white'>
            <div className='user flex ' style={{ justifyContent: "center" }}>
                <Dropdown className='' menu={{ items }}>
                    <Space>
                        <div className='flex mb-2' style={{ alignItems: "center" }}>
                            <div className='flex cursor-pointer'>
                                <img style={{ width: "30px", height: "30px", borderRadius: "50%" }} src={userProfileClone?.avatar} alt="" />
                                <p className='userTile pl-2'>{userProfileClone?.name}</p>
                            </div>
                        </div>

                    </Space>
                </Dropdown>
            </div>
        </div>
    )
}

export default MenuTopJira