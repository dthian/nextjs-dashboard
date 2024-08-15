'use client';

import { useState } from "react";
import { type Note, UserDefaultNoteData } from "~/lib/data";
import styles from './UserNotes.module.css';

// Control containing all the note for the current user.
export const UserNotesControl = () => {
  const [notes, setNotes] = useState<Note[]>(UserDefaultNoteData);

  // Submit and create a new note
  const submitNote = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure we grab the right data mapped to the ids
    const formInput = e.target as typeof e.target & {
      title: {value: string},
      content: {value: string}
    };

    // double check to see if we got that data
    const title = formInput.title.value;
    const content = formInput.content.value;
    console.log("title: " + title);
    console.log("content: " + content);

    // Sanity checks
    if (title.trim().length == 0 || content.trim().length == 0) {
      alert("Please enter a valid title and content");
      return;
    }

    // Else we have the data, now update our data sources
    const newNote = {
      id : Math.random(),
      title: title,
      content: content,
      creation: new Date(Date.now()),
      isUrgent: false
    };

    setNotes([newNote, ...notes]);
  };

  // Remove an existing note
  const completeNote = (note:Note) => {
    const modifiedNotes = notes.filter(item => item.id !== note.id);
    setNotes(modifiedNotes);
  };

  // Toggle an existing note data
  const toggleNoteUrgent = (note:Note) => {
    const updatedNote = {
      id : note.id,
      title: note.title,
      content: note.content,
      creation: note.creation,
      isUrgent: !note.isUrgent
  };

    // Now Update and replace existing notes
    const modifiedNotes:Note[] = [];
    notes.forEach((note)=>{
      if (note.id === updatedNote.id) {
        modifiedNotes.push(updatedNote);
      } else {
        modifiedNotes.push(note);
      }
    });
    setNotes(modifiedNotes);
  };

  return (
    <>
      {/* Ability to add notes through form */}
      <div className={styles.noteInputBorderRound}>
        <form className="container flex flex-col" onSubmit={submitNote}>
            <input className="input" id="title" name="title" placeholder="Note Title" /> 
            <input className="input" id="content" name="content" placeholder="Note Content" />
            <button className="btn btn-blue" type="submit">Save Note</button>
        </form>
      </div>

      { // Listview of the User's current notes
        notes.map((note)=>{
          const currentDate:string = note.creation.toDateString();
          const noteContainerStyle = note.isUrgent ? styles.noteBorderRoundUrgent : styles.noteBorderRound;
          return (
            <div className={noteContainerStyle} key={note.id}>
              <div className="container flex flex-row">
                <div className="container flex flex-col">
                  <h3>{note.title} </h3> 
                  <p> {note.content} </p>
                  <h4>Created: {currentDate} </h4>
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