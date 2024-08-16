/* eslint-disable @next/next/no-img-element */
'use client';

import React from "react";
import Image from "next/image";
import { NotesActionType, NotesContext } from "~/context/NoteProviderContext";
import { Note } from "~/lib/data";
import { downloadUserNotes, uploadUserNotes } from "~/lib/actions";

export const UserHeader = () => {
    const { notes, dispatch } = React.useContext(NotesContext);

    // Sanity check. Display placeholder UI if datasource is not ready
    if (!notes.isInitialized) {
        return ( 
        <></>
        );
    }

    const onImportClicked = async () => {
        // Download stuff TBD
        const enteredName:string | null = prompt('Enter Profile to import ** IMPORTANT Overrides Current Notes!**');
        const importedNotes = await downloadUserNotes(enteredName!);
        if (importedNotes === undefined || importedNotes.length ==0) {
            alert("No records found for user");
            return;
        }

        // Else if there are records found, replace the current underlying local datastore
        dispatch({ type:NotesActionType.INIT , notes:importedNotes});
        alert("Import Success!");
    };

    const onExportClicked = async () => {
        // Upload stuff TBD
        const enteredName = prompt('Enter Profile to export (Remember this to Import!)');
        const res = await uploadUserNotes(enteredName!, notes.data);
        alert("Export: " + (res ? "success!" : "Fail!"));
    };

    // Update UI with number of urgent notes
    let urgentNotes = 0;
    notes.data.forEach((note)=>{
        if (note.isUrgent) {
            urgentNotes ++;
        }
    });

    const urgentTextStyle = urgentNotes == 0 ? {paddingLeft:10}: 
                            {paddingLeft:10, color:"red", fontWeight:"bold"};

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
            <div style={urgentTextStyle}>
                Urgent Alerts: {urgentNotes}
            </div>
        </div>
    );
}