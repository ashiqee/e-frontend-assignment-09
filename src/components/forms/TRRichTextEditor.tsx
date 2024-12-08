"use client";

import { Divider } from "@nextui-org/react";
import {
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  ContentState, 
  convertFromHTML,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { Italic, Bold, Underline, Strikethrough, Smile } from "lucide-react";
import { useRef, useState } from "react";

const TRRichTextEditor = ({ onChange,text }: { onChange: any,text:string }) => {
  const [editorState, setEditorState] = useState(() => {
    const blocksFromHTML = convertFromHTML(text);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );

    return EditorState.createWithContent(contentState);
  });

  const [isOpenEmoji, setOpenEmoji] = useState(false);

  const handleChange = (state: EditorState) => {
    setEditorState(state);
    if (onChange) {
      onChange(editorState);
    }
  };

  const editor = useRef(null);

  const handleInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const currentStyle = editorState.getCurrentInlineStyle();

  const editType = [
    {
      icon: <Bold size={18} />,
      style: "BOLD",
    },
    {
      icon: <Italic size={18} />,
      style: "ITALIC",
    },
    {
      icon: <Underline size={18} />,
      style: "UNDERLINE",
    },
    {
      icon: <Strikethrough size={18} />,
      style: "STRIKETHROUGH",
    },
  ];

  // Emoji options
  const emojiList = ["😊", "😂", "👍", "🔥", "🎉"];

  // Function to add emojis
  const insertEmoji = (emoji: string) => {
    const currentContent = editorState.getCurrentContent();
    const currentSelection = editorState.getSelection();

    const newContent = Modifier.insertText(
      currentContent,
      currentSelection,
      emoji
    );

    const newEditorState = EditorState.push(
      editorState,
      newContent,
      "insert-characters"
    );

    setEditorState(newEditorState);
    setOpenEmoji(false);
  };

  return (
    <div className="min-h-20">
      {/* Toolbar */}
      <div className="flex gap-4">
        {editType.map((t, i) => (
          <button
            key={i}
            className={`  p-2 rounded-md ${
              currentStyle.has(t.style)
                ? "bg-slate-200/45"
                : "hover:bg-slate-200/45"
            }`}
            onClick={() => handleInlineStyle(t.style)}
          >
            {t.icon}
          </button>
        ))}
      </div>
      <Divider/>
      {/* Editor */}
      <div className="p-2 justify-between min-h-14">
        <Editor
          ref={editor}
          
          editorState={editorState}
          placeholder="Write something!"
          onChange={handleChange}
        />
      </div>

      {/* Emoji Dropdown */}
      <div className="relative bottom-4">
        <button
          className="mb-2 p-2 rounded-md hover:bg-slate-200"
          onClick={() => setOpenEmoji(true)}
        >
          <Smile size={18} />
        </button>
        {isOpenEmoji && (
          <div className="absolute z-40 bottom-1 left-10 flex gap-2 p-2 mt-2 bg-white/5 rounded-md shadow-lg">
            {emojiList.map((emoji, index) => (
              <button
                key={index}
                className="hover:bg-slate-200 rounded p-1 "
                onClick={() => {
                  insertEmoji(emoji);
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TRRichTextEditor;
