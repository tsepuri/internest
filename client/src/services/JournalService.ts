import { api } from "./axios";
import { User }  from "@/types/User";
import { Journal } from "@/types/Journal"

export async function sendJournalEntry(user:User, journal:Journal) {
    let response = await api.post(`/user/${user.userId}/journal`, {
        entry: journal.entry, date: journal.date
    })
    return response.data
}