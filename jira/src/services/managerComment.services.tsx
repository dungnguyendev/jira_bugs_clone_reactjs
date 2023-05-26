import http from "../constant/api"

export type getCommentTask = {
    "user": {
        "userId": number,
        "name": string,
        "avatar": string
    },
    "id": number,
    "userId": number,
    "taskId": number,
    "contentComment": string,
    "deleted": boolean,
    "alias": string
}
export type postComment = {
    "taskId": number,
    "contentComment": string
}
export type editCommentTask = {
    "id": number,
    "contentComment": string
}
export const managerComment = {
    getCommentByIdTask: (payload: number) => http.get<HttpResponse<getCommentTask[]>>(`Comment/getAll?taskId=${payload}`),
    postCommentTask: (payload: postComment) => http.post<HttpResponse<getCommentTask[]>>(`Comment/insertComment`, payload),
    editCommentTask: (payload: editCommentTask) => http.put<HttpResponse<editCommentTask[]>>(`Comment/updateComment?id=${payload.id}&contentComment=${payload.contentComment}`),
    delteCommentTask: (payload:number) => http.delete<HttpResponse<getCommentTask[]>>(`Comment/deleteComment?idComment=${payload}`)
}
