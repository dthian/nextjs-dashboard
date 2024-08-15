/*

  Note taking App
  Step 1 - Want to be able to create Notes
    - Note consists of
      - Note Title
      - Note Content
      - Note ID
      - Note Creation Date
      - Note Completion state

  Step 2 - Want to be able to view created Notes
    - Need List of Notes to be displayed
    - UI can simply be Node title, content, date in a "Box outline" representing a note
    - List of notes can be retrieved from a DB
    - For now assume we have a list of notes in a static array

  Step 3 - Want to be able to mark notes as completed
    - Add to the "Box outline" a button with the additional note. 

*/

import { UserNotesControl } from "~/ui/UserNotesControl";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Note Taking App
        </h1>
        <span>
          <UserNotesControl/>
        </span>
      </div>
    </main>
  );
}
