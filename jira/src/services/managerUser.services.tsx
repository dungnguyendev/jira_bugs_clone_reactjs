import http from "../constant/api"

export type getUserJira = {
    "email": string,
    "passWord": string,
    "name": string,
    "phoneNumber": string,
    "keyword": string,
    "userId": string,
    "avatar":string,
    "id": string,
}

export const managerUserServices = {
    signUp: (payload: getUserJira) => http.post<HttpResponse<getUserJira[]>>(`Users/signup`, payload),
    signIn: (payload: getUserJira) => http.post<HttpResponse<getUserJira[]>>(`Users/signin`, payload),
    getUserByKeyWord: (payload: string) => http.get<HttpResponse<getUserJira[]>>(`Users/getUser?keyword=${payload}`),
    getUserByKeyWordProfile: (payload: string) => http.get<HttpResponse<getUserJira[]>>(`Users/getUser?keyword=${payload}`),
    getUserByIdProject: (payload: number) => http.get(`Users/getUserByProjectId?idProject=${payload}`),
    editUser: (payload: getUserJira) => http.put<HttpResponse<getUserJira>>(`Users/editUser`, payload)
}