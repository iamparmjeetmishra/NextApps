import DriveContents from "../../drive-contents";

import {
  getAllParentsForFolder,
  getFiles,
  getFolders,
} from "~/server/db/queries";

type GoogleDriveTypeParams = {
  folderId: string;
};

export default async function GoogleDriveClone(props: {
  params: Promise<GoogleDriveTypeParams>;
}) {
  const params = await props.params;

  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid Folder ID</div>;
  }

  const foldersPromise = getFolders(parsedFolderId);

  const filesPromise = getFiles(parsedFolderId);

  const parentsPromise = getAllParentsForFolder(parsedFolderId);

  const [folders, files, parents] = await Promise.all([
    foldersPromise,
    filesPromise,
    parentsPromise,
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
