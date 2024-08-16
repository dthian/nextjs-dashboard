![screenshot](https://github.com/user-attachments/assets/47ee62b1-dcb4-43e3-9568-9bd137dd361e)

# Frontend Interview Starter

- Note App website where Users can add and update notes.
- A Note can have content, marked urgent, or marked completed (removed).
- Note data changes on app are notified via Note Providers share through React Context.
- Note data is persist locally on local storage as user makes modifications.
- Note data can also exported by the user into the cloud, where we currently store note records into Postgrest in Vercel.

## Site Interaction
- Simply add a note with title and content. It will be timestamped and created.
- Everything is saved locally. To clear it clear your browser's cookies.
- If you do want to save it to the cloud DBs, click export and choose a username
to save it under. You can then visit the site on another computer and import the data
and that should work :)
- Caveat: this is all for demo purposes; not meant for production.

## Installation
NOTE: If loading locally, you will need .env credentials for Export/Import functionality to 
function as it accesses our remote postgres DBs (the rest of the site should still work).

```
pnpm i
pnpm dev // Will start the app on localhost:3000
```
