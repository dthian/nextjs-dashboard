![screenshot](https://github.com/user-attachments/assets/47ee62b1-dcb4-43e3-9568-9bd137dd361e)

# Frontend Interview Starter

- Note App website where Users can add and update notes.
- A Note can have content, marked urgent, or marked completed (removed).
- Note data changes on app are notified via Note Providers share through React Context.
- Note data is persist locally on local storage as user makes modifications.
- Note data can also exported by the user into the cloud, where we currently store note records into Postgrest in Vercel.

## Installation
NOTE: You will need .env credentials for Export/Import functionality to 
work as it accesses our remote postgres DBs.

```
pnpm i
pnpm dev // Will start the app on localhost:3000
```
