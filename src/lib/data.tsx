// Data definitions for our note records
export interface Note {
    id: number, 
    title : string,
    content: string,
    date: string,
    isUrgent: boolean
}

// Default data by which to display notes
export const UserDefaultNoteData:Note[] = [
    {
        id : 1,
        title: "title 1",
        content: "Default content 1",
        date: new Date("July 21, 2022 09:15:00").toLocaleString(),
        isUrgent: false
    }, 
    {
        id : 2,
        title: "title 2",
        content: "Default  content with a very large note here, how does this look like?",
        date: new Date("May 22, 2021 13:15:00").toLocaleString(),
        isUrgent: false
    }, 
    {
        id : 3,
        title: "title 3",
        content: "Default  content with a very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very large note",
        date: new Date("Jan 12, 2020 19:15:00").toLocaleString(),
        isUrgent: false
    }
]