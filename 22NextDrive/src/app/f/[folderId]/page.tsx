import DriveContents from "~/app/f/[folderId]/drive-contents";
import { QUERIES } from "~/server/db/queries";

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

  const [folders, files, parents] = await Promise.all([
    QUERIES.getFolders(parsedFolderId),
    QUERIES.getFiles(parsedFolderId),
    QUERIES.getAllParentsForFolder(parsedFolderId),
  ]);

  return (
    <DriveContents
      files={files}
      folders={folders}
      parents={parents}
      currentFolderId={parsedFolderId}
    />
  );
}
