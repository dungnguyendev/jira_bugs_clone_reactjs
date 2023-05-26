import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../store'
import "../../scss/Profile.scss"
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { EditUser, getUserByKeyWordProfile } from '../../../store/managerUser.service/thunkAction'
import { getUserJira } from '../../../services/managerUser.services'

const ProfileUser = () => {
    const dispatch = useAppDispatch()
    const { user, userProfile } = useSelector((state: RootState) => state.managerUser)
    const validationSchema = Yup.object({
        name: Yup.string().required('Vui lòng nhập tên tài khoản !'),
        email: Yup.string()
            .required('Vui lòng nhập email !')
            .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Bạn cần nhập đúng tài khoản email"),
        phoneNumber: Yup.string()
            .required('Vui lòng nhập số điện thoại !')
            .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Bạn cần nhập đúng số điện thoại"),
        passnew: Yup.string()
            .required('Vui lòng nhập mật khẩu mới !')
            .matches(/^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Mật khẩu phải chứa ít nhất một chữ hoa và một ký tự đặc biệt.'),

    });
    const userObj = user && user.length > 0 ? user[0] : null
    useEffect(() => {
        dispatch(getUserByKeyWordProfile(String(userObj?.id)))
    }, [])
    const userProfileClone = userProfile && userProfile.length > 0 ? userProfile[0] : null
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: userProfileClone?.userId,
            email: userProfileClone?.email,
            name: userProfileClone?.name,
            phoneNumber: userProfileClone?.phoneNumber,
            avatar: userProfileClone?.avatar,
            passnew: "",
        },
        validationSchema: validationSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: async (values) => {
            let form: getUserJira = {
                "id": String(values.id),
                "passWord": values.passnew,
                "email": String(values.email),
                "name": String(values.name),
                "phoneNumber": String(values.phoneNumber),
                "avatar": "",
                "userId": "",
                "keyword": "",
            }
            await dispatch(EditUser(form))
            dispatch(getUserByKeyWordProfile(String(values.id)))
        }
    })
    const handlePJName = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue("name", e.target.value);
    }
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue("email", e.target.value);
    }
    const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue("phoneNumber", e.target.value);
    }
    const handlePassNew = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue("passnew", e.target.value);
    }


    const handleProfile = () => {

        return <div className='content'>
            <div className="box_content " style={{ height: "80vh" }}>
                <div className='h-full' >
                    <div className="row h-full">
                        <div className="col-4 bg-slate-400 text-center" style={{borderRadius:"10px"}}>
                            <img className='my-4' src={userProfileClone?.avatar} style={{ width: "200px", height: "200px", borderRadius: "50%", margin: "0 auto" }} alt="" />
                            <p className='my-2 text-lg'>{userProfileClone?.name}</p>
                            <p className='my-2'>Code: {userProfileClone?.userId}</p>
                            <p className='my-2'>Phone: {userProfileClone?.phoneNumber}</p>
                            <p className='my-2'>Email: {userProfileClone?.email}</p>
                        </div>
                        <div className="col-8">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-5">
                                            <div>
                                                <input disabled type="text" className="inputProfile" value={userObj?.id} required />

                                            </div>

                                        </div>
                                        <div className="col-5">
                                            <div>
                                                <input
                                                    value={formik.values.name}
                                                    name="name"
                                                    type="text"
                                                    className="inputProfile"
                                                    onChange={handlePJName}

                                                />
                                                {formik.touched.name && formik.errors.name && (
                                                    <p className="text-[13px] text-red-500 mt-2">{formik.errors.name}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-5">
                                            <div>
                                                <input placeholder="Email"
                                                    value={formik.values.email}
                                                    name="name"
                                                    type="text"
                                                    className="inputProfile"
                                                    onChange={handleEmail}
                                                />
                                                {formik.touched.email && formik.errors.email && (
                                                    <p className='text-[13px] text-red-500 mt-2'>{formik.errors.email}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-5">
                                            <div>
                                                <input placeholder="Phone"
                                                    value={formik.values.phoneNumber}
                                                    name="name"
                                                    type="text"
                                                    className="inputProfile"
                                                    onChange={handlePhone}
                                                />
                                                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                                    <p className='text-[13px] text-red-500 mt-2'>{formik.errors.phoneNumber}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-5">
                                            <div>
                                                <input placeholder="New Passwork" type="password"
                                                    name="name"
                                                    className="inputProfile"
                                                    onChange={handlePassNew}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.passnew && formik.errors.passnew && (
                                                    <p className='text-[13px] text-red-500 mt-2'>{formik.errors.passnew}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className='btn btn-info'>Change Profile</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    }



    return (
        <div className='main'>
            <div className="header">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb" style={{ backgroundColor: 'white' }}>
                        <li className="breadcrumb-item">Jira</li>
                        <li className="breadcrumb-item">Profile user</li>
                    </ol>
                </nav>
            </div>
            {handleProfile()}

        </div>
    )
}

export default ProfileUser