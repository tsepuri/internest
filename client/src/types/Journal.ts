export interface Journal {
    date: Date,
    entry: string
}

export interface JournalResponse {
    extractedKeywords: string[]
}