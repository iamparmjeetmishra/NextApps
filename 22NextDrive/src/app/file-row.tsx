import { FileIcon, Trash2Icon, Folder as FolderIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { files, folders } from "~/server/db/schema";

type FileRowPropsType = {
  file: typeof files.$inferInsert;
};

export function FileRow(props: FileRowPropsType) {
  const { file } = props;
  return (
    <li
      key={file.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <a
            href={file.url}
            target="_blank"
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FileIcon className="mr-3" size={20} />
            {file.name}
          </a>
        </div>
        <div className="col-span-2 text-gray-400">{"file"}</div>
        <div className="col-span-3 text-gray-400">{file.size}</div>
        <div className="col-span-1 text-gray-400">
          <Button variant="ghost" onClick={() => {}} aria-label="Delete file">
            <Trash2Icon size={20} />
          </Button>
        </div>
      </div>
    </li>
  );
}

type folderRowType = {
  folder: typeof folders.$inferInsert;
  handleFolderClick: () => void;
};

export function FolderRow(props: folderRowType) {
  const { folder, handleFolderClick } = props;
  return (
    <li
      key={folder.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <button
            onClick={() => handleFolderClick()}
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name}
          </button>
        </div>
        <div className="col-span-2 text-gray-400"></div>
        <div className="col-span-3 text-gray-400"></div>
        <div className="col-span-1 text-gray-400"></div>
      </div>
    </li>
  );
}
