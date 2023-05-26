import React from 'react'
import { useAppDispatch } from '../../../store'
import { GetAllStatus, GetTaskDetail, UpdateTask, getAllPriority, getAllTaskType } from '../../../store/managerTask/thunkAction'
import { GetUserByIdProject } from '../../../store/managerUser.service/thunkAction'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { UpdateStatus } from '../../../store/managerTask/thunkAction';
import { statusUpdata } from '../../../services/manageTask.services';
import { getProjectDetail } from '../../../store/managerProject.service/thunkAction';
import { Avatar, Tag } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { getComment } from '../../../store/managerComment.service/thunkAction';
interface PjecContent {
    project?: {
        "lstTask": [
            {
                "lstTaskDeTail": [
                    {
                        "priorityTask": {
                            "priorityId": number,
                            "priority": string
                        },
                        "taskTypeDetail": {
                            "id": number,
                            "taskType": string
                        },
                        "assigness": [
                            {
                                "id": number,
                                "avatar": string,
                                "name": string,
                                "alias": string
                            }
                        ],
                        "lstComment": [],
                        "taskId": number,
                        "taskName": string,
                        "alias": string,
                        "description": string,
                        "statusId": string,
                        "originalEstimate": number,
                        "timeTrackingSpent": number,
                        "timeTrackingRemaining": number,
                        "typeId": number,
                        "priorityId": number,
                        "projectId": number
                    }
                ],
                "statusId": string,
                "statusName": string,
                "alias": string
            }
        ],
        "members": [
            {
                "userId": number,
                "name": string,
                "avatar": string
            }
        ]

        ,
        "creator": {
            "id": number,
            "name": string
        },
        "id": number,
        "projectName": string,
        "description": string,
        "categoryId": number,
        "categoryName": string,
        "alias": string,
        "deleted": boolean
    }[]
}
const ContenMain = ({ project }: PjecContent) => {
    const appDispatch = useAppDispatch()
    const handleDragEnd = async (result: DropResult) => {
        let { source, destination } = result
        let { taskID, projecid } = JSON.parse(result.draggableId)
        if (!result.destination) {
            return;
        }
        if (source.index === destination?.index && source.droppableId === destination.droppableId) {
            return;
        }
        let formStatus: statusUpdata = {
            "taskId": taskID,
            "statusId": String(destination?.droppableId)
        }


        await appDispatch(UpdateStatus(formStatus))
        await appDispatch(GetAllStatus())
        appDispatch(getProjectDetail(projecid))
    }
    const renderCard = () => {
        return <DragDropContext onDragEnd={handleDragEnd}>
            {
                project?.map((item, i) => {
                    return item.lstTask?.map((taskList, i) => {
                        return <Droppable key={i} droppableId={taskList.statusId}>
                            {(provided) => {
                                return <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    key={i}
                                    className="card" style={{ width: '100%', height: 'auto' }}>
                                    <div className="card-header">
                                        {taskList.statusName}
                                    </div>
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        key={i}
                                        className="list-group list-group-flush h-full">

                                        {taskList.lstTaskDeTail?.map((task, i) => {
                                            return <Draggable key={task.taskId.toString()}
                                                index={i} draggableId={JSON.stringify({ taskID: task.taskId, projecid: task.projectId })}
                                            >
                                                {(provided) => {
                                                    return <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        key={i} onClick={async () => {
                                                            appDispatch(GetAllStatus())
                                                            appDispatch(getAllPriority())
                                                            appDispatch(getAllTaskType())
                                                            appDispatch(getComment(task.taskId))
                                                            appDispatch(GetUserByIdProject(Number(task.projectId)))
                                                            await appDispatch(GetTaskDetail(task.taskId))
                                                        }} className="list-group-item" data-toggle="modal" data-target="#infoModal">
                                                        <p className='my-1'>
                                                            <em>  <FontAwesomeIcon style={(task.taskTypeDetail.id === 1) ? { color: "red" } : { color: "green" }} icon={faBookmark} />  {task.taskTypeDetail.taskType}</em>
                                                        </p>
                                                        <p className='font-bold'>
                                                            {task.taskName}
                                                        </p>
                                                        <div className="block" style={{ display: 'flex' }}>
                                                            <div className="block-left text-red-600">
                                                                <Tag color="red">{task.priorityTask.priority}</Tag>
                                                            </div>
                                                            <div className="block-right">
                                                                <div className="avatar-group" style={{ display: 'flex' }}>
                                                                    {task.assigness?.map((img, i) => {
                                                                        return <Avatar style={{ marginRight: "-12px", border: "2px solid #fff" }} key={i} src={img.avatar} alt={img.name} />
                                                                    })}

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }}
                                            </Draggable>
                                        })}
                                        {/* <li className="list-group-item">Vestibdivum at eros</li> */}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            }}

                        </Droppable>
                    })
                })

            }
        </DragDropContext>
    }
    return (
        <div className="content" style={{ display: 'flex', width: "90%", margin: "0" }}>
            {renderCard()}
            {/* <div className="card" style={{ width: '17rem', height: '25rem' }}>
                <div className="card-header">
                    SELECTED FOR DEVELOPMENT 2
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                </ul>
            </div>
            <div className="card" style={{ width: '17rem', height: '25rem' }}>
                <div className="card-header">
                    IN PROGRESS 2
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                </ul>
            </div>
            <div className="card" style={{ width: '17rem', height: '25rem' }}>
                <div className="card-header">
                    DONE 3
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
            </div> */}
        </div>
    )
}

export default ContenMain