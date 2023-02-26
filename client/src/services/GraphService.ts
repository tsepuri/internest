import { User } from "@/types/User";
import { api } from "./axios";
import { makeSessionInfo } from "./clerk";

export async function getGraph(user:User, sessionId:string) {
    let response = await api.get(`/${user.userId}/graph-map`)
    return response.data
}