
"use server";
import { sql } from '@vercel/postgres';
import { prisma } from "./prisma";

// Note: Importing Prima results in a conflict of 
// data structures - we'll need to unify them.
import { type notes } from "@prisma/client";
import { ForceNoteSchema, type Note } from "./data";

// Insert Notes Records for a given user
export async function uploadUserNotes(userId: string, userNotesRaw: Note[]) {
  try {
    const dataNotes:notes[] = [];
    userNotesRaw.forEach((note)=>{
      const clientData = ForceNoteSchema.parse(note);
      dataNotes.push({
        userId: userId.toLowerCase(), 
        noteId: clientData.id, 
        title: clientData.title, 
        content: clientData.content, 
        date: clientData.date, 
        isUrgent: clientData.isUrgent});
    });

    // Finally fire off the insert query
    await prisma.notes.createMany({
      data:dataNotes,
      skipDuplicates: true
    });

    // For now provide a simple pass-fail indication of success.
    return true;
  } catch (e) {
    console.error("Failure when Persisting User profile to DB", e);
  }

  return false;
}

// Grab Notes Records for a given user
export async function downloadUserNotes(userId: string) {
  try {
    const records = await prisma.notes.findMany({
      where:{userId:userId.toLowerCase()}
    });

    const clientNotes:Note[] = [];
    records.forEach((dbNote)=>{
      clientNotes.push({
        id: Number(dbNote.noteId), 
        title: dbNote.title, 
        content: dbNote.content, 
        date: dbNote.date, 
        isUrgent: dbNote.isUrgent});
    });
    return clientNotes;
  } catch (e) {
    console.error("Failure when Persisting User profile to DB", e);
  }

  return undefined;
}