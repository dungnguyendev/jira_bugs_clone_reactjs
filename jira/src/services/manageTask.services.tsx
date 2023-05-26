import http from "../constant/api"

export type taskList = {

    "listUserAsign": number[],
    "taskName": string,
    "description": string,
    "statusId": string,
    "originalEstimate": number,
    "timeTrackingSpent": number,
    "timeTrackingRemaining": number,
    "projectId": number,
    "typeId": number,
    "priorityId": number

}
export type priority = {
    "priorityId": number,
    "priority": string,
    "description": string,
    "deleted": boolean,
    "alias": string
}
export type taskType = {
    "id": number,
    "taskType": string
}
export type status = {
    "statusId": number,
    "statusName": string,
    "alias": string,
    "deleted": string
}
export interface taskDetailModel {

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
    "lstComment": [
        {
            "avatar": string
            "commentContent": string
            "id": number
            "idUser": number
            "name": string
        }
    ],
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
export type statusUpdata = {
    "taskId": number,
    "statusId": string
}
export type updateTask = {
    "listUserAsign": number[],
    "taskId": string,
    "taskName": string,
    "description": string,
    "statusId": string,
    "originalEstimate": number,
    "timeTrackingSpent": number,
    "timeTrackingRemaining": number,
    "projectId": number,
    "typeId": number,
    "priorityId": number
}
export type AssignTask = {
    "taskId": number,
    "userId": number
}
export type updatePriority = {
    "taskId": number,
    "priorityId": number
}
export type updateEstimete = {
    "taskId": number,
    "originalEstimate": number
}
export const managerTaskServices = {
    // priority
    getAllPriority: (payload = "") => http.get(`Priority/getAll`),
    updatePriority: (payload: updatePriority) => http.put(`Project/updatePriority`, payload),

    // task
    getAllTaskType: () => http.get('TaskType/getAll'),
    createTask: (payload: taskList) => http.post<HttpResponse<taskList[]>>(`Project/createTask`, payload),
    getTaskDetail: (payload: number) => http.get(`Project/getTaskDetail?taskId=${payload}`),

    // status
    getAllStatus: () => http.get('Status/getAll'),
    updateStatus: (payload: statusUpdata) => http.put<HttpResponse<statusUpdata[]>>(`Project/updateStatus`, payload),

    // des task
    updateTask: (payload: updateTask) => http.post<HttpResponse<updateTask[]>>(`Project/updateTask`, payload),
    AddAssignTask: (payload: AssignTask) => http.post<HttpResponse<AssignTask[]>>(`Project/assignUserTask`, payload),
    RemoveUserFromTask: (payload: AssignTask) => http.post<HttpResponse<AssignTask[]>>(`Project/removeUserFromTask`, payload),

    // originalEstime
    updateEstimete: (payload: updateEstimete) => http.put<HttpResponse<updateEstimete[]>>(`Project/updateEstimate`, payload)

}