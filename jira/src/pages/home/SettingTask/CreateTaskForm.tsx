import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect, useState } from 'react'
import { Select, Slider, Space } from 'antd';
import { RootState, useAppDispatch } from '../../../store';
import { getAllProject } from '../../../store/managerProject.service/thunkAction';
import { useSelector } from 'react-redux';
import { CreateTask, GetAllStatus, getAllPriority, getAllTaskType } from '../../../store/managerTask/thunkAction';
import { GetUserByIdProject, getUserByKeyWord } from '../../../store/managerUser.service/thunkAction';
import { useFormik } from 'formik';
import { DrawerProjectAction } from '../../../store/DrawerJiraBugs/slice';
import { checkToken } from '../../../constant/api';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';
const CreateTaskForm = () => {
    if (localStorage.getItem("user")) {
        checkToken()
    }
    const naviagte = useNavigate()
    const appDispatch = useAppDispatch()
    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    })

    const { listProject } = useSelector((state: RootState) => state.managerProject)
    const { listPriority, listTaskType, listStatus } = useSelector((state: RootState) => state.managerTask)
    const { userPj } = useSelector((state: RootState) => state.managerUser)
    useEffect(() => {
        appDispatch(getAllProject())
        appDispatch(getAllPriority())
        appDispatch(getAllTaskType())

        appDispatch(GetAllStatus())
        appDispatch(DrawerProjectAction.SET_SUBMIT_EDIT({
            submitForm: formik.handleSubmit
        }))
    }, [])
    const [editorContent, setEditorContent] = useState('');

    const handleEditorChange = async (content: string) => {
        await setEditorContent(content)
        formik.setFieldValue("description", content)
    };
    const handleChange = (value: number) => {
        formik.setFieldValue("listUserAsign", value)
    };
    const renderProject = () => {

        var option = listProject?.map((item, i) => (
            <option key={i} value={item.id}>{item.projectName}</option>
        ))
        option?.unshift(
            <option value={0} ><span className='opacity-40 text-red-500'>Select one project </span></option>
        )
        return option
    }
    const renderOtpPriority = () => {
        const option = listPriority?.map((item, i) => (
            <option key={i} value={item.priorityId}>{item.priority}</option>
        ))
        option?.unshift(
            <option value={0} style={{ opacity: "0.8" }}>Select one priority</option>
        )
        return option
    }
    const renderOtpTaskType = () => {
        const option = listTaskType?.map((item, i) => (
            <option key={i} value={item.id}>{item.taskType}</option>
        ))
        option?.unshift(
            <option value={0}>Select one task type</option>
        )
        return option
    }
    const renderStatus = () => {
        const option = listStatus?.map((item, i) => (
            <option key={i} value={item.statusId}>{item.statusName}</option>
        ))
        option?.unshift(
            <option value={0}>Choose one status</option>
        )
        return option
    }
    const handleOptPriorty = (event: React.ChangeEvent<HTMLSelectElement>) => {
        formik.setFieldValue("priorityId", Number(event.target.value))
    }
    const handleOtpType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        formik.setFieldValue("typeId", Number(event.target.value))
    }
    const handleOriginal = (event: React.ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue("originalEstimate", Number(event.target.value))
    }
    const handleTaskName = (event: React.ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue("taskName", event.target.value)
    }
    const handleProjecID = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        await appDispatch(GetUserByIdProject(Number(event.target.value)))
        formik.setFieldValue("projectId", Number(event.target.value))
    }
    const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
        formik.setFieldValue("statusId", event.target.value)
    }
    const validationSchema = Yup.object({
        projectId: Yup.number().moreThan(-1, 'Please select one project !'),
        timeTrackingRemaining: Yup.number().moreThan(-1, 'Please enter time remaining!'),
        originalEstimate: Yup.number().moreThan(-1, 'Please enter time estimate !'),
        timeTrackingSpent: Yup.number().moreThan(-1, 'Please select time spent !'),
        typeId: Yup.number().moreThan(-1, 'Please select one task type !'),
        priorityId: Yup.number().moreThan(-1, 'Please select one priority !'),
        listUserAsign: Yup.number().moreThan(-1, 'Please select members !'),
        taskName: Yup.string().required("Please enter task name"),
        description: Yup.string().required("Please enter the description !"),
        statusId: Yup.string().required("Please select status "),

    });
    const formik = useFormik({
        initialValues: {
            listUserAsign: [-1],
            taskName: "",
            description: "",
            statusId: "",
            originalEstimate: -1,
            timeTrackingSpent: -1,
            timeTrackingRemaining: -1,
            projectId: -1,
            typeId: -1,
            priorityId: -1
        },
        validationSchema: validationSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: async (values) => {
            await appDispatch(CreateTask(values))
            await appDispatch(DrawerProjectAction.CLOSE_DRAWER({}))
            naviagte("/projectmamagement")
        }
    })
    return (
        <div className='container'>
            <div className='form-group'>
                <p>Project <FontAwesomeIcon style={{ fontSize: "7px" }} className=' text-red-500' icon={faAsterisk} /></p>
                <select name="projectId" className='form-control' onChange={handleProjecID}>
                    {renderProject()}
                </select>
                {formik.touched.projectId && formik.errors.projectId && (
                    <p className="text-[13px] text-red-500 mt-2">{formik.errors.projectId}</p>
                )}
            </div>
            <div className='form-group'>
                <div className="row">
                    <div className="col-6">
                        <p>Task name <FontAwesomeIcon style={{ fontSize: "7px" }} className=' text-red-500' icon={faAsterisk} /></p>
                        <input name="taskName" onChange={handleTaskName} className='form-control'></input>
                        {formik.touched.taskName && formik.errors.taskName && (
                            <p className="text-[13px] text-red-500 mt-2">{formik.errors.taskName}</p>
                        )}
                    </div>
                    <div className="col-6">
                        <p>Status <FontAwesomeIcon style={{ fontSize: "7px" }} className=' text-red-500' icon={faAsterisk} /></p>
                        <select name="statusId" onChange={handleStatus} className='form-control'>
                            {renderStatus()}
                        </select>
                        {formik.touched.statusId && formik.errors.statusId && (
                            <p className="text-[13px] text-red-500 mt-2">{formik.errors.statusId}</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Priority <FontAwesomeIcon style={{ fontSize: "7px" }} className=' text-red-500' icon={faAsterisk} /></p>
                        <select onChange={handleOptPriorty} name="priorityId" className='form-control'>
                            {renderOtpPriority()}
                        </select>
                        {formik.touched.priorityId && formik.errors.priorityId && (
                            <p className="text-[13px] text-red-500 mt-2">{formik.errors.priorityId}</p>
                        )}
                    </div>
                    <div className="col-6">
                        <p>Task type <FontAwesomeIcon style={{ fontSize: "7px" }} className=' text-red-500' icon={faAsterisk} /></p>
                        <select onChange={handleOtpType} name="typeId" className='form-control'>
                            {renderOtpTaskType()}
                        </select>
                        {formik.touched.typeId && formik.errors.typeId && (
                            <p className="text-[13px] text-red-500 mt-2">{formik.errors.typeId}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className='form-group'>
                <div className="row">
                    <div className="col-6">
                        <p>Members <FontAwesomeIcon style={{ fontSize: "7px" }} className=' text-red-500' icon={faAsterisk} /></p>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="select one country"
                            onChange={handleChange}
                            optionFilterProp='label'
                            options={userPj?.map((item, i) => {
                                return { label: item.name, value: Number(item.userId) }
                            })}
                        >
                        </Select>
                        {formik.touched.listUserAsign && formik.errors.listUserAsign && (
                            <p className="text-[13px] text-red-500 mt-2">{formik.errors.listUserAsign}</p>
                        )}
                        <div className='row mt-4'>
                            <div className="col-12">
                                <p>Original Estimates <FontAwesomeIcon style={{ fontSize: "7px" }} className=' text-red-500' icon={faAsterisk} /></p>
                                <input onChange={handleOriginal} style={{ border: "1px solid #ced4da" }} type="number" className='form-control rounded-md' min={0} name='originalEstimate' />
                                {formik.touched.originalEstimate && formik.errors.originalEstimate && (
                                    <p className="text-[13px] text-red-500 mt-2">{formik.errors.originalEstimate}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <p>Times tracking </p>
                        <Slider max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} value={Number(timeTracking.timeTrackingSpent)} />
                        <div className='row'>
                            <div className="col-6 text-left"><b>{timeTracking.timeTrackingSpent}</b> h logged</div>
                            <div className="col-6 text-right"><b>{timeTracking.timeTrackingRemaining}</b> h remaining</div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <p>Time spent house <FontAwesomeIcon style={{ fontSize: "7px" }} className=' text-red-500' icon={faAsterisk} /></p>
                                <input type="number" defaultValue={0} style={{ border: "1px solid #ced4da" }} min={0} className='form-control rounded-md' name='timeTrackingSpent' onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingSpent: Number(e.target.value)

                                    })
                                    formik.setFieldValue("timeTrackingSpent", Number(e.target.value))
                                }} />
                                {formik.touched.timeTrackingSpent && formik.errors.timeTrackingSpent && (
                                    <p className="text-[13px] text-red-500 mt-2">{formik.errors.timeTrackingSpent}</p>
                                )}
                            </div>
                            <div className="col-6">
                                <p>Time remaining <FontAwesomeIcon style={{ fontSize: "7px" }} className=' text-red-500' icon={faAsterisk} /></p>
                                <input onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingRemaining: Number(e.target.value)
                                    })
                                    formik.setFieldValue("timeTrackingRemaining", Number(e.target.value))
                                }}
                                    type="number"
                                    defaultValue={0}
                                    min={0}
                                    style={{ border: "1px solid #ced4da" }}
                                    className='form-control rounded-md'
                                    name="timeTrackingRemaining" />
                                {formik.touched.timeTrackingRemaining && formik.errors.timeTrackingRemaining && (
                                    <p className="text-[13px] text-red-500 mt-2">{formik.errors.timeTrackingRemaining}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <p>Description <FontAwesomeIcon style={{ fontSize: "7px" }} className=' text-red-500' icon={faAsterisk} /></p>
                <Editor
                    tagName='description'
                    apiKey='your-api-key'
                    value={editorContent}
                    onEditorChange={handleEditorChange}
                    onChange={formik.handleChange}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
                {formik.touched.description && formik.errors.description && (
                    <p className="text-[13px] text-red-500 mt-2">{formik.errors.description}</p>
                )}
            </div>
        </div>
    )
}

export default CreateTaskForm