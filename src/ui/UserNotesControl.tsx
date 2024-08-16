'use client';

import { useContext } from "react";
import { type Note, UserDefaultNoteData } from "~/lib/data";
import styles from './UserNotes.module.css';
import { NotesContext, NotesActionType} from "~/context/NoteProviderContext";

// Create a new note for a given form event
const pullNoteFromForm = (e: React.FormEvent): Note | undefined => {
  // Ensure we grab the right data mapped to the ids
  const formInput = e.target as typeof e.target & {
    title: {value: string},
    content: {value: string}
  };

  // double check to see if we got that data
  const title = formInput.title.value;
  const content = formInput.content.value;

  // Sanity checks
  if (title.trim().length == 0 || content.trim().length == 0) {
    return undefined;
  }

  // Else we have the data, now update our data sources
  const newNote = {
    id : Math.random(),
    title: title,
    content: content,
    date: new Date(Date.now()).toLocaleString(),
    isUrgent: false
  };

  return newNote;
};

// Main Note Control for adding, editing, and removing notes.
export const UserNotesControl = () => {
  const { notes, dispatch } = useContext(NotesContext);

  // Sanity check Display loading UI when data source is not yet ready.
  // TODO - Displays nicer loading UI.
  if (!notes.isInitialized) {
    return ( 
      <div className="flex items-center justify-center">
        Loading.....
      </div>
    );
  }

  // Else Data is ready, create callback handlers for mutating notes
  const submitNote = (e: React.FormEvent) => {
    e.preventDefault();
    const newNote: Note | undefined = pullNoteFromForm(e);
    
    // Warn user if invalid inputs are detected.
    if (newNote === undefined) {
      alert("Please enter a valid title and content");
      return;
    }

    dispatch({ type: NotesActionType.ADD, notes:[newNote]});
  };

  // Remove an existing note
  const completeNote = (note:Note) => {
    dispatch({ type: NotesActionType.REMOVE, notes:[note]});
  };

  // Toggle an existing note
  const toggleNoteUrgent = (note:Note) => {
    note.isUrgent = !note.isUrgent;
    dispatch({ type:NotesActionType.UPDATE, notes:[note]});
  };

  // Finally, display UI Notes with data.
  return (
    <>
      {/* Ability to add notes through form */}
      <div className={styles.noteInputBorderRound}>
        <form className="flex flex-col" onSubmit={submitNote}>
            <input className="input" id="title" name="title" placeholder="Note Title" /> 
            <input className="input" id="content" name="content" placeholder="Note Content" />
            <button className="btn btn-blue" type="submit">Save Note</button>
        </form>
      </div>

      { // Listview of the User's current notes
        notes.data.map((note)=>{
          const noteContainerStyle = note.isUrgent ? styles.noteBorderRoundUrgent : styles.noteBorderRound;
          return (
            <div className={noteContainerStyle} key={note.id}>
              <div className="container flex flex-row">
                <div className="container flex flex-col">
                  <h3>{note.title} </h3> 
                  <p> {note.content} </p>
                  <h4>Created: {note.date} </h4>
                </div> 
                <button className="btn btn-red" onClick={ ()=>{toggleNoteUrgent(note)}}>Mark Urgent</button>
                <button className="btn btn-blue" style={{marginLeft:10}} onClick={ ()=>{completeNote(note)}}>Mark Done</button>
              </div>
            </div>
          );
        })
      }
    </>
  );
};