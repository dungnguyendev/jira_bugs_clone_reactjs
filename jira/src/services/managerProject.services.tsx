import { type } from "os";
import http from "../constant/api";
export type project = {
    "id": number,
    "projectCategoryName": string
}
export type createPj = {
    "projectName": string,
    "description": string,
    "categoryId": number,
}
export interface listProject {
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
}
export type addUserProject = {
    "projectId": number,
    "userId": number
}
export type updateProject = {

    "id": number,
    "projectName": string,
    "description": string,
    "categoryId": string

}
export const managerProjectServices = {
    projectCategory: () => http.get(`ProjectCategory`),
    createProject: (payload: createPj) => http.post<HttpResponse<createPj[]>>(`Project/createProjectAuthorize`, payload),
    getAllProject: () => http.get(`Project/getAllProject`),
    assignUserProject: (payload: addUserProject) => http.post(`Project/assignUserProject`, payload),
    deleteUserFromProject: (payload: addUserProject) => http.post(`Project/removeUserFromProject`, payload),
    getProjectById: (payload: number) => http.get(`Project/getProjectDetail?id=${payload}`,),
    updateProject: (payload: updateProject) => http.put<HttpResponse<updateProject[]>>(`Project/updateProject?projectId=${payload.id}`, payload),
    deleteProject: (payload: number) => http.delete<HttpResponse<createPj[]>>(`Project/deleteProject?projectId=${payload}`,),
    getPjDetail: (payload: number) => http.get(`Project/getProjectDetail?id=${payload}`,),
}