import { api } from "./axios";
import { User }  from "@/types/User";
import { Journal } from "@/types/Journal"
import { makeSessionInfo } from "./clerk";
 
export async function sendJournalEntry(user:User, journal:Journal, sessionToken:string) {
    let response = await api.post(`/user/${user.userId}/journal`, {
        entry: journal.entry, date: journal.date.toISOString(), session: makeSessionInfo(sessionToken)
    })
    return response.data
}

export async function sendKeywords(user:User, keywords:string[], sessionToken:string) {
    let response = await api.post('/validated-keywords', {
        keywords, userId: user.userId, session: makeSessionInfo(sessionToken)
    })
    return response.data
}