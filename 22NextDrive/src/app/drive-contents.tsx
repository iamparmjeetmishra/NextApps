"use client";

import Link from "next/link";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ChevronRight, Upload } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { files_table, folders_table } from "~/server/db/schema";

import { FileRow, FolderRow } from "./file-row";

type GoogleDriveClonePropType = {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferInsert)[];
  parents: (typeof folders_table.$inferSelect)[];
};

export default function GoogleContents(props: GoogleDriveClonePropType) {
  const handleUpload = () => {
    alert("Upload functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link href={`/f/1`} className="mr-2 text-gray-300 hover:text-white">
              My Drive
            </Link>
            {props.parents.map((folder, index) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link href={""} className="text-gray-300 hover:text-white">
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={handleUpload}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              <Upload className="mr-2" size={20} />
              Upload
            </Button>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-3">Size</div>
              <div className="col-span-1">Action</div>
            </div>
          </div>
          <ul>
            {props.folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
