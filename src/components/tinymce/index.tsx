"use client";

import { Editor } from "@tinymce/tinymce-react";
import { State } from "@/utils/store";
import { useDispatch, useSelector } from "react-redux";
import { setContent } from "@/utils/store/noteSlice";
import { useCallback } from "react";

export const Tinymce = () => {
  const dispatch = useDispatch();
  const content = useSelector(({ note }: State) => note?.content);

  const handleEditorChange = useCallback(
    (content: string) => {
      dispatch(setContent(content));
    },
    [dispatch],
  );

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE!}
      value={content}
      init={{
        width: "100%",
        height: "100%",
        menubar: false,
        skin: "oxide-dark", // "oxide"
        content_css: "dark.css", // "light.css"
      }}
      onEditorChange={handleEditorChange}
    />
  );
};
