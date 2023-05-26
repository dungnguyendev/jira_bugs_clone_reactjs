import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'
import { AutoComplete, Avatar, Button, Popover, Select, Tag } from 'antd'
import { AssignTask, statusUpdata, taskDetailModel, updateEstimete, updatePriority, updateTask } from '../../services/manageTask.services'
import { GetAllStatus, GetTaskDetail, UpdateTask, UpdateStatus, RemoveAsignTask, UpdatePriority, UpdateEstimete } from '../../store/managerTask/thunkAction'
import { getProjectDetail } from '../../store/managerProject.service/thunkAction'
import { Editor } from '@tinymce/tinymce-react'
import { checkToken } from '../../constant/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesLeft, faBookmark, faXmark, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { htmlToText } from 'html-to-text'
import './scss/StyleInfoModal.scss'
import { postComment } from '../../services/managerComment.services'
import { createComment, deleteComment, getComment } from '../../store/managerComment.service/thunkAction'
import { toast } from 'react-toastify'
const InfoModalJira = () => {
    if (localStorage.getItem("user")) {
        checkToken()
    }
    const appDispatch = useAppDispatch()

    const { taskDetail, listStatus, listPriority, listTaskType } = useSelector((state: RootState) => state.managerTask)
    const { listProjectDetail } = useSelector((state: RootState) => state.managerProject)
    const [visibleEditor, setVisibleEditor] = useState(false)
    const [visibleEditComment, setVisibleEditComment] = useState(false)
    const { listComment } = useSelector((state: RootState) => state.managerComment)
    const members = listProjectDetail?.flatMap(item => { return item.members })
    const [content, setContent] = useState('');
    const { user } = useSelector((state:RootState)=> state.managerUser)
    const [comment, setComment] = useState('')
    const userObj = user && user.length > 0 ? user[0] : null
    console.log(listComment);
    
    
    const renderInfoModel = () => {
        return taskDetail?.map((taskDetail1, i) => {


            const user1: number[] = taskDetail1.assigness?.map((item) => {
                return item.id
            })
            const max = Number(taskDetail1.timeTrackingSpent + taskDetail1.timeTrackingRemaining);
            const percent = Math.round(Number(taskDetail1.timeTrackingSpent) / max * 100)
            const plainText = htmlToText(taskDetail1.description)
            const handleChangeStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
                const statusChange: statusUpdata = {
                    "taskId": taskDetail1.taskId,
                    "statusId": e.target.value
                }
                await appDispatch(UpdateStatus(statusChange))
                await appDispatch(GetAllStatus())
                appDispatch(getProjectDetail(taskDetail1.projectId))
            }
            return <div className="modal-content " style={{ zIndex: "10" }}>
                <div className="modal-header">
                    <div className="task-title">
                        <div className="flex" style={{ alignItems: "center" }}>
                            <FontAwesomeIcon style={(taskDetail1.typeId === 1) ? { color: "red" } : { color: "green" }} icon={faBookmark} />
                            <select onChange={async (e) => {
                                const form: updateTask = {
                                    "listUserAsign": user1,
                                    "taskId": String(taskDetail1.taskId),
                                    "taskName": taskDetail1.taskName,
                                    "description": taskDetail1.description,
                                    "statusId": taskDetail1.statusId,
                                    "originalEstimate": taskDetail1.originalEstimate,
                                    "timeTrackingSpent": taskDetail1.timeTrackingSpent,
                                    "timeTrackingRemaining": taskDetail1.timeTrackingRemaining,
                                    "projectId": taskDetail1.projectId,
                                    "typeId": Number(e.target.value),
                                    "priorityId": taskDetail1.priorityId
                                }
                                await appDispatch(UpdateTask(form))
                                await appDispatch(GetTaskDetail(taskDetail1.taskId))
                                appDispatch(getProjectDetail(taskDetail1.projectId))

                            }} className='mx-3' style={{ width: "100%", height: "40px", borderRadius: "10px" }}>
                                {listTaskType?.map((type, i) => {
                                    if (taskDetail1.taskTypeDetail.id === type.id) {
                                        return <option value={type.id} selected>{type.taskType}</option>
                                    } else {
                                        return <option value={type.id}>{type.taskType}</option>
                                    }
                                })}
                            </select>
                        </div>
                    </div>
                    <div style={{ display: 'flex' }} className="task-click">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                </div>
                <div className="modal-body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-8">
                                <p>Task: {taskDetail1.taskName}</p>
                                <div className="description">
                                    <p className='mt-3'>Description: </p>
                                    <div >
                                        {
                                            visibleEditor ? <div>
                                                <Editor
                                                    tagName='description'
                                                    initialValue={taskDetail1.description}

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
                                                    onEditorChange={(content, editor) => {
                                                        setContent(content)
                                                    }}
                                                /> <button className='btn btn-info mr-2 my-2' onClick={async () => {
                                                    const form: updateTask = {
                                                        "listUserAsign": user1,
                                                        "taskId": String(taskDetail1.taskId),
                                                        "taskName": taskDetail1.taskName,
                                                        "description": content,
                                                        "statusId": taskDetail1.statusId,
                                                        "originalEstimate": taskDetail1.originalEstimate,
                                                        "timeTrackingSpent": taskDetail1.timeTrackingSpent,
                                                        "timeTrackingRemaining": taskDetail1.timeTrackingRemaining,
                                                        "projectId": taskDetail1.projectId,
                                                        "typeId": taskDetail1.typeId,
                                                        "priorityId": taskDetail1.priorityId
                                                    }
                                                    await appDispatch(UpdateTask(form))
                                                    await appDispatch(GetTaskDetail(taskDetail1.taskId))
                                                    setVisibleEditor(false)
                                                }}>Save</button>
                                                <button className='btn' onClick={() => {
                                                    setVisibleEditor(false)
                                                }}>Close</button>
                                            </div> : <div onClick={() => {

                                                setVisibleEditor(!visibleEditor);
                                            }} className="issue w-full flex items-center"><p className='m-0 pr-3'>{plainText}</p> <p className='animate__animated animate__pulse  animate__infinite infinite text-sm cursor-pointer'><FontAwesomeIcon icon={faAnglesLeft} /> Click to change</p> </div>
                                        }
                                    </div>
                                </div>
                                <div className="comment">
                                    <h6 className='my-3'>Comment</h6>
                                    <div className="block-comment" style={{ display: 'flex', alignItems: "center" }}>
                                       <Avatar src={userObj?.avatar} /> 
                                        <div className="input-comment ml-2">
                                            <input className='rounded-md' style={{ border: "1px solid #ced4da" }} type="text" placeholder="Add a comment ..." onChange={(e) => {
                                                setComment(e.target.value)
                                            }} />
                                            <FontAwesomeIcon className="inputIconProfile text-blue-400 cursor-pointer transition  scale-95 hover:scale-125" icon={faPaperPlane} onClick={async () => {
                                                const form: postComment = {
                                                    taskId: taskDetail1.taskId,
                                                    contentComment: comment
                                                }
                                                await appDispatch(createComment(form))
                                                await appDispatch(getComment(taskDetail1.taskId))
                                            }} />
                                        </div>
                                    </div>
                                    <div className="lastest-comment mt-3">
                                        <div className="comment-item">
                                            {listComment?.map((comment, i) => {
                                              console.log(comment.user.name);
                                              
                                                return <div className="display-comment" style={{ display: 'flex' }}>
                                                    <Avatar src={comment.user.avatar} alt={comment.user.name} />
                                                    <div>
                                                        <p className='my-1 ml-1' style={{ marginBottom: 5 }}>
                                                            {comment.user.name}
                                                        </p>
                                                        <p className='ml-1' style={{ marginBottom: 5 }}>
                                                            {comment.contentComment}
                                                        </p>
                                                        <div key={i}>
                                                            <span className='cursor-pointer' style={{ color: '#929398' }} onClick={() => {
                                                                toast.error("You don't editor comment")
                                                            }} >Edit </span>
                                                            •
                                                            <span className='cursor-pointer' style={{ color: '#929398' }} onClick={async () => {
                                                                await appDispatch(deleteComment(comment.id))
                                                                appDispatch(getComment(comment.taskId))
                                                            }}>Delete</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="status">
                                    <h6 className='mb-2'>STATUS</h6>
                                    <select className="custom-select" onChange={handleChangeStatus}>
                                        {

                                            listStatus?.map((item, i) => {
                                                if (Number(item.statusId) === Number(taskDetail1.statusId)) {
                                                    return <option key={i} selected value={item.statusId}>{item.statusName}</option>
                                                } else {
                                                    return <option key={i} value={item.statusId}>{item.statusName}</option>
                                                }
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="assignees my-3">
                                    <h6 className='mb-1'>ASSIGNEES</h6>
                                    <div className='w-full' style={{ zIndex: "1000" }}>
                                        {taskDetail1.assigness?.map((assigness, i) => {
                                            return <Popover>
                                                <Tag bordered={false} style={{ cursor: "pointer" }} onClick={async () => {
                                                    if (window.confirm(`You sure remove user: ${assigness.name} from task: ${taskDetail1.taskName} ?`)) {
                                                        let form: AssignTask = {
                                                            "taskId": taskDetail1.taskId,
                                                            "userId": assigness.id
                                                        }
                                                        await appDispatch(RemoveAsignTask(form))
                                                        await appDispatch(GetTaskDetail(taskDetail1.taskId))
                                                        await appDispatch(getProjectDetail(taskDetail1.projectId))
                                                    }
                                                }} color="gold">
                                                    {assigness.name} <FontAwesomeIcon icon={faXmark} />
                                                </Tag>
                                            </Popover>
                                        })}
                                        <Select
                                            className='mt-2'
                                            options={members?.filter((mem, i) => {
                                                let index = taskDetail1.assigness.findIndex(us => us.id === mem.userId)
                                                if (index !== -1) {
                                                    return false
                                                }
                                                return true
                                            }).map((members) => {
                                                return { label: members.name, value: Number(members.userId) }
                                            })
                                            }
                                            optionFilterProp='label'
                                            value="Add more"
                                            onSelect={async (value) => {

                                                user1.push(Number(value))
                                                const form: updateTask = {
                                                    "listUserAsign": user1,
                                                    "taskId": String(taskDetail1.taskId),
                                                    "taskName": taskDetail1.taskName,
                                                    "description": taskDetail1.description,
                                                    "statusId": taskDetail1.statusId,
                                                    "originalEstimate": taskDetail1.originalEstimate,
                                                    "timeTrackingSpent": taskDetail1.timeTrackingSpent,
                                                    "timeTrackingRemaining": taskDetail1.timeTrackingRemaining,
                                                    "projectId": taskDetail1.projectId,
                                                    "typeId": taskDetail1.typeId,
                                                    "priorityId": taskDetail1.priorityId
                                                }
                                                await appDispatch(UpdateTask(form))
                                                await appDispatch(GetTaskDetail(taskDetail1.taskId))
                                                appDispatch(getProjectDetail(taskDetail1.projectId))
                                            }}
                                        >
                                        </Select>
                                        {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <i className="fa fa-plus" style={{ marginRight: 5 }} /><span>Add more</span>
                                        </div> */}
                                    </div>

                                </div>
                                {/* <div className="reporter">
                                    <h6>REPORTER</h6>
                                    <div style={{ display: 'flex' }} className="item">
                                        <div className="avatar">
                                            <img src="./assets/img/download (1).jfif" />
                                        </div>
                                        <p className="name">
                                            Pickle Rick
                                            <i className="fa fa-times" style={{ marginLeft: 5 }} />
                                        </p>
                                    </div>
                                </div> */}
                                <div className="priority my-3" style={{ marginBottom: 20 }}>
                                    <h6 className='mb-2'>PRIORITY</h6>
                                    <select className='form-control' onChange={async (e) => {

                                        const form: updateTask = {
                                            "listUserAsign": user1,
                                            "taskId": String(taskDetail1.taskId),
                                            "taskName": taskDetail1.taskName,
                                            "description": taskDetail1.description,
                                            "statusId": taskDetail1.statusId,
                                            "originalEstimate": taskDetail1.originalEstimate,
                                            "timeTrackingSpent": taskDetail1.timeTrackingSpent,
                                            "timeTrackingRemaining": taskDetail1.timeTrackingRemaining,
                                            "projectId": taskDetail1.projectId,
                                            "typeId": taskDetail1.typeId,
                                            "priorityId": Number(e.target.value)
                                        }
                                        await appDispatch(UpdateTask(form))
                                        await appDispatch(GetTaskDetail(taskDetail1.taskId))
                                        appDispatch(getProjectDetail(taskDetail1.projectId))
                                    }}>
                                        {listPriority?.map((item, i) => {
                                            if (Number(item.priorityId) === Number(taskDetail1.priorityId)) {
                                                return <option value={item.priorityId} selected>{item.description}</option>
                                            } else {
                                                return <option value={item.priorityId} >{item.description}</option>
                                            }
                                        })}
                                    </select>
                                </div>
                                <div className="estimate">
                                    <h6 className='mb-2'>ORIGINAL ESTIMATE ( HOURS )</h6>
                                    <input type="number" className="estimate-hours" value={taskDetail1.originalEstimate} onChange={async (e) => {

                                        const form: updateTask = {
                                            "listUserAsign": user1,
                                            "taskId": String(taskDetail1.taskId),
                                            "taskName": taskDetail1.taskName,
                                            "description": taskDetail1.description,
                                            "statusId": taskDetail1.statusId,
                                            "originalEstimate": Number(e.target.value),
                                            "timeTrackingSpent": taskDetail1.timeTrackingSpent,
                                            "timeTrackingRemaining": taskDetail1.timeTrackingRemaining,
                                            "projectId": taskDetail1.projectId,
                                            "typeId": taskDetail1.typeId,
                                            "priorityId": taskDetail1.priorityId
                                        }
                                        await appDispatch(UpdateTask(form))
                                        appDispatch(GetTaskDetail(taskDetail1.taskId))

                                    }} />
                                </div>
                                <div className="time-tracking">
                                    <h6 className='mb-2'>TIME TRACKING</h6>
                                    <div style={{ display: 'flex' }}>
                                        <i className="fa fa-clock" />
                                        <div style={{ width: '100%' }}>

                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" style={{ width: percent + "%" }} aria-valuenow={taskDetail1.timeTrackingSpent} aria-valuemin={Number(taskDetail1.timeTrackingRemaining)} aria-valuemax={max} />
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <p className="logged">{taskDetail1.timeTrackingSpent} logged</p>
                                                <p className="estimate-time">{taskDetail1.timeTrackingRemaining} estimated</p>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <input style={{ border: "1px solid #ced4da", width: "30%" }} type='number' className="rounded-md form-control" value={taskDetail1.timeTrackingSpent} onChange={async (e) => {

                                                    const form: updateTask = {
                                                        "listUserAsign": user1,
                                                        "taskId": String(taskDetail1.taskId),
                                                        "taskName": taskDetail1.taskName,
                                                        "description": taskDetail1.description,
                                                        "statusId": taskDetail1.statusId,
                                                        "originalEstimate": taskDetail1.originalEstimate,
                                                        "timeTrackingSpent": Number(e.target.value),
                                                        "timeTrackingRemaining": taskDetail1.timeTrackingRemaining,
                                                        "projectId": taskDetail1.projectId,
                                                        "typeId": taskDetail1.typeId,
                                                        "priorityId": taskDetail1.priorityId
                                                    }
                                                    await appDispatch(UpdateTask(form))
                                                    appDispatch(GetTaskDetail(taskDetail1.taskId))

                                                }}></input>
                                                <input style={{ border: "1px solid #ced4da", width: "30%" }} type='number' className="rounded-md form-control" value={taskDetail1.timeTrackingRemaining} onChange={async (e) => {

                                                    const form: updateTask = {
                                                        "listUserAsign": user1,
                                                        "taskId": String(taskDetail1.taskId),
                                                        "taskName": taskDetail1.taskName,
                                                        "description": taskDetail1.description,
                                                        "statusId": taskDetail1.statusId,
                                                        "originalEstimate": taskDetail1.originalEstimate,
                                                        "timeTrackingSpent": taskDetail1.timeTrackingSpent,
                                                        "timeTrackingRemaining": Number(e.target.value),
                                                        "projectId": taskDetail1.projectId,
                                                        "typeId": taskDetail1.typeId,
                                                        "priorityId": taskDetail1.priorityId
                                                    }
                                                    await appDispatch(UpdateTask(form))
                                                    appDispatch(GetTaskDetail(taskDetail1.taskId))

                                                }}></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ color: '#929398' }}>Create at a month ago</div>
                                <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        });
    }

    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                {renderInfoModel()}
            </div>

        </div>

    )


}

export default InfoModalJira