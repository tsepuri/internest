import { api } from "./axios";

export async function sendJournalEntry(user:User, journal:Journal) {
    let response = await api.post(`/user/${user.userId}/journal`, {
        entry: journal.entry, date: journal.date
    })
    return response.data
}