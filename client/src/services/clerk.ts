import { getSessionCookie } from "./cookie"

export const makeSessionInfo = (sessionId:string):SessionInfo => {
    return {
        sessionId,
        sessionToken: getSessionCookie() as string
    }
}