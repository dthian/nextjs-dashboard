/* eslint-disable @next/next/no-img-element */
'use client';

import React from "react";
import Image from "next/image";
import { NotesActionType, NotesContext } from "~/context/NoteProviderContext";
import { Note } from "~/lib/data";

export const UserHeader = () => {
    const { notes, dispatch } = React.useContext(NotesContext);

    // Sanity check. Display placeholder UI if datasource is not ready
    if (!notes.isInitialized) {
        return ( 
        <></>
        );
    }

    const onImportClicked = () => {
        // Download stuff TBD
        const enteredName = prompt('Enter Profile to import');

    };

    const onExportClicked = () => {
        // Upload stuff TBD
        const enteredName = prompt('Enter Profile to export (Remember this to Import!)');
    };

    // Update UI with number of urgent notes
    let urgentNotes = 0;
    notes.data.forEach((note)=>{
        if (note.isUrgent) {
            urgentNotes ++;
        }
    });

    return (
        <div className="flex items-center justify-center flex-row">
            <button onClick={onImportClicked}>
                <img src="/import.png" 
                    width={100}
                    height={200}
                    alt="Import Notes"/>
            </button>
            | 
            <button onClick={onExportClicked}>
                <img src="/export.png" 
                        width={100}
                        height={200}
                        alt="Export Notes"/>
            </button>
            | 
            <div style={{paddingLeft:10}}>
                Urgent Alerts: {urgentNotes}
            </div>
        </div>
    );
}