# Drive Mockup

## TODO

- [x] Set up DB and data model
- [x] Move folder open state to URL
- [x] Add auth
- [x] Add file uploading
- [-] Add Analytics - Posthog allows only 1

## 1st

Just finished up connecting DB, next steps:

- [x] Update Schema to show files and folders
- [x] Manually insert examples
- [x] Render them in the UI
- [x] Push and Make sure it all works

## 2nd

- [x] Change folders to link components, remove all client state
- [x] Breadcrumbs fixed with real data from db
- [x] Clean up the DB and data fetching patterns
- [x] Data access layer and consume layer must be different
- [x] Error State while fetching in dynamic folder f/1
- [x] Real Homepage + onboarding

## 3rd

- [x] Add "ownership" to files and folders
- [x] Upload files to the right folder
- [x] Delete files button
- [x] Allow files that are not images to be upload
- [x] Orderby

## 4th

- [ ] Folder Deletion
- [ ] Folder creation - make a server action that takes a name and parentId, and creates a folder with that name and parentId(don't forget to set the ownerId).
- [ ] Access Control - check if user is owner before showing the folder page
- [ ] File View Challenge
- [ ] Toasts
- [ ] Gray out a row while it's deleting
