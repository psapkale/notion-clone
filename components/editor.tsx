"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote, BlockNoteView } from "@blocknote/react";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";
import "@blocknote/react/style.css";

interface EditorProps {
   onChange: (value: string) => void;
   initialContent?: string;
   editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
   const { resolvedTheme } = useTheme();
   const { edgestore } = useEdgeStore();

   const handleUpload = async (file: File) => {
      const response = await edgestore.publicFiles.upload({
         file,
      });

      return response.url;
   };

   const editor: BlockNoteEditor = useCreateBlockNote({
      initialContent: initialContent
         ? (JSON.parse(initialContent) as PartialBlock[])
         : undefined,
      uploadFile: handleUpload,
   });
   // ({
   // initialContent: initialContent
   // ? (JSON.parse(initialContent) as PartialBlock[])
   // : undefined,
   // onEditorContentChange: (editor) => {
   //    onChange(JSON.stringify(editor.topLevelBlock, null, 2));
   // }
   // }),

   return (
      <div>
         <BlockNoteView
            editor={editor}
            theme={resolvedTheme === "dark" ? "dark" : "light"}
         />
      </div>
   );
};

export default Editor;
