// Data definitions for our note records

export interface Note {
    id: number, 
    title : string,
    content: string,
    creation: Date,
    isUrgent: boolean
}

// Default data by which to display notes
export const UserDefaultNoteData:Note[] = [
    {
        id : 1,
        title: "title 1",
        content: "content 1",
        creation: new Date("2015-03-25T12:00:00Z"),
        isUrgent: false
    }, 
    {
        id : 2,
        title: "title 2",
        content: "content with a very large note here, how does this look like?",
        creation: new Date("2015-04-25T12:00:00Z"),
        isUrgent: false
    }, 
    {
        id : 3,
        title: "title 3",
        content: "content with a very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very large note",
        creation: new Date("2015-05-25T12:00:00Z"),
        isUrgent: false
    }
]