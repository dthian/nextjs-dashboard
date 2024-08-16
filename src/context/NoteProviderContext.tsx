/*
 * NoteProviderContext is responsible updating the underlying data records
 * representing the array of notes in the App. This decouples the UI from the
 * data source such that both Note Header and Note List UI Controls are able
 * read and get notified of record changes.
 * 
 * Note that data is also saved in the web browser to be persisted across
 * user sessions for the same machine. 
 */
'use client';
import { createContext,  useReducer, useEffect } from 'react';
import { type Note, UserDefaultNoteData } from "../lib/data";

export enum NotesActionType {
    ADD      = "Add",
    UPDATE   = "Update",
    REMOVE   = "Remove",
    INIT     = "Initialized"
}

interface INotesAction {
    type        : NotesActionType, 
    notes       : Note[]
}

interface INotesState  {
    isInitialized   : boolean,
    data           : Note[]
}

const initialState: INotesState = {
    isInitialized: false,
    data: UserDefaultNoteData
}

const notesReducer = (state: INotesState, action: INotesAction) : typeof initialState => {
    const {type, notes} = action;
    switch(type) {
        case NotesActionType.ADD:
            const updatedNotes = [notes[0]!, ...state.data];
            localStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
            return { 
                ...state,
                data: updatedNotes
            };
            break;
        case NotesActionType.UPDATE:
            const modifiedNotes:Note[] = [];
            state.data.forEach((currNote)=>{
                if (currNote.id === notes[0]!.id) {
                    modifiedNotes.push(notes[0]!);
                } else {
                    modifiedNotes.push(currNote);
                }
            });

            localStorage.setItem(NOTES_KEY, JSON.stringify(modifiedNotes));
            return {
                ...state,
                data: modifiedNotes
            }
            break;
        case NotesActionType.REMOVE:
            const filteredNotes = state.data.filter(item => item.id !== notes[0]!.id);
            localStorage.setItem(NOTES_KEY, JSON.stringify(filteredNotes));
            return {
                ... state,
                data: state.data.filter(item => item.id !== notes[0]!.id)
            };
            break;
        case NotesActionType.INIT:
            return {
                ... state,
                isInitialized:true,
                data:notes
            };
            break;
        default: 
            return state
    }
}

const NOTES_KEY = "notes";

export interface INoteContext {
    notes: INotesState
    dispatch: React.Dispatch<INotesAction>
}

const NotesContext = createContext<INoteContext>({
    notes: {
        data:[],
        isInitialized:false,
    },
    dispatch: () => {
        //no-op
    }
});

// Capsulate controls requiring access to the user's notes with this provider.
const NotesProvider = ({children}:{children:React.ReactNode}) => {
    const [notes, dispatch] = useReducer(notesReducer, initialState);

    // On mount, restore saved notes from local storage. This 
    // could be from a remote source in the future.
    useEffect(()=>{
        const savedBrowserNotesRAW:string | null = localStorage.getItem(NOTES_KEY);
        if (savedBrowserNotesRAW == undefined) {
            dispatch({ type:NotesActionType.INIT , notes:UserDefaultNoteData});
            return;
        }

        try {
            const savedNotes:Note[] = JSON.parse(savedBrowserNotesRAW) as Note[]; 
            if (savedNotes === undefined) {
                console.log("Error when attempting to deserialized notes from local storage");
                return;
            }
            dispatch({ type:NotesActionType.INIT , notes:savedNotes});
        } catch (ex) {
            console.error(ex);
        }
    }, []);

    return (
        <NotesContext.Provider value={{ notes, dispatch }}>
            {children}
        </NotesContext.Provider>
    );
}

export {NotesContext, NotesProvider}