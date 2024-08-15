'use client';

import { useEffect, useState } from "react";
import { type Note, UserDefaultNoteData } from "~/lib/data";
import styles from './UserNotes.module.css';
import { create } from "domain";

const NOTES_KEY = "notes";

// Create a new note for a given form event
const createNote = (e: React.FormEvent): Note | undefined => {
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

// Control containing all the note for the current user.
export const UserNotesControl = () => {
  const [notes, setNotes] = useState<Note[] | undefined>(undefined);

  // On mount, restore saved notes from local storage. This 
  // could be from a remote source in the future.
  useEffect(()=>{
    const savedBrowserNotesRAW:string | null = localStorage.getItem(NOTES_KEY);
    if (savedBrowserNotesRAW == undefined) {
      setNotes(UserDefaultNoteData);
      return;
    }

    try {
      const savedNotes:Note[] = JSON.parse(savedBrowserNotesRAW) as Note[]; 
      if (savedNotes === undefined) {
        console.log("Error when attempting to deserialized notes from local storage");
        return;
      }
      setNotes(savedNotes);
    } catch (ex) {
      console.error(ex);
    }
  }, []);

  // Submit and create a new note
  const submitNote = (e: React.FormEvent) => {
    e.preventDefault();
    const newNote: Note | undefined = createNote(e);
    
    // Warn user if invalid inputs are detected.
    if (newNote === undefined) {
      alert("Please enter a valid title and content");
      return;
    }

    setNotes(()=>{
      const nextNotes:Note[] = [newNote, ...notes!];
      localStorage.setItem(NOTES_KEY, JSON.stringify(nextNotes));
      return nextNotes;
    });
  };

  // Remove an existing note
  const completeNote = (note:Note) => {
    const modifiedNotes = notes!.filter(item => item.id !== note.id);
    setNotes(modifiedNotes);
    setNotes(()=>{
      localStorage.setItem(NOTES_KEY, JSON.stringify(modifiedNotes));
      return modifiedNotes;
    });
  };

  // Toggle an existing note
  const toggleNoteUrgent = (note:Note) => {
    const updatedNote = {
      id : note.id,
      title: note.title,
      content: note.content,
      date: note.date,
      isUrgent: !note.isUrgent
  };

    // Now Update and replace existing notes
    const modifiedNotes:Note[] = [];
    notes!.forEach((note)=>{
      if (note.id === updatedNote.id) {
        modifiedNotes.push(updatedNote);
      } else {
        modifiedNotes.push(note);
      }
    });
    setNotes(()=>{
      localStorage.setItem(NOTES_KEY, JSON.stringify(modifiedNotes));
      return modifiedNotes;
    });
  };

  // Display loading UI on mount when grabbing data.
  if (notes == undefined) {
    return ( 
      <div className="loading">
        Loading.....
      </div>
    );
  }

  // Else, we note data is ready, display them.
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