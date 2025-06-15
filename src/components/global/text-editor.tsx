"use client";

import { useState, useRef, useEffect } from "react";
import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Typography from "../ui/typography";
import Box from "../ui/box";
import { useUploadImage } from "@/lib/api/mutation/article-mutation";

interface RichTextEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  onBlur?: () => void;
  initialValue?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function RichTextEditor({
  onChange,
  initialValue = "",
  onBlur,
  placeholder = "Type a content...",
  disabled,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [charCount, setCharCount] = useState(0);

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isJustifyLeft, setIsJustifyLeft] = useState(false);
  const [isJustifyCenter, setIsJustifyCenter] = useState(false);
  const [isJustifyRight, setIsJustifyRight] = useState(false);
  const [isJustifyFull, setIsJustifyFull] = useState(false);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== initialValue) {
      editorRef.current.innerHTML = initialValue;
      countCharacters(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      const isCmd = e.metaKey || e.ctrlKey;

      if (!isCmd) return;

      switch (e.key.toLowerCase()) {
        case "b":
          e.preventDefault();
          execCommand("bold");
          break;
        case "i":
          e.preventDefault();
          execCommand("italic");
          break;
        case "l":
          if (e.shiftKey) {
            e.preventDefault();
            execCommand("justifyLeft");
          }
          break;
        case "e":
          if (e.shiftKey) {
            e.preventDefault();
            execCommand("justifyCenter");
          }
          break;
        case "r":
          if (e.shiftKey) {
            e.preventDefault();
            execCommand("justifyRight");
          }
          break;
        case "j":
          if (e.shiftKey) {
            e.preventDefault();
            execCommand("justifyFull");
          }
          break;
      }
    };

    window.addEventListener("keydown", handleShortcut);
    document.addEventListener("selectionchange", updateToolbarState);
    return () => {
      window.removeEventListener("keydown", handleShortcut);
      document.removeEventListener("selectionchange", updateToolbarState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const countCharacters = (text: string) => {
    const strippedText = text
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, "")
      .replace(/\u00A0/g, "")
      .replace(/\s/g, "");

    setCharCount(strippedText.length);
  };

  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      countCharacters(content);
      onChange?.(content);
      onBlur?.();
    }
  };

  const updateToolbarState = () => {
    if (
      !editorRef.current ||
      !document.activeElement?.contains(editorRef.current)
    )
      return;

    setIsBold(document.queryCommandState("bold"));
    setIsItalic(document.queryCommandState("italic"));
    setIsJustifyLeft(document.queryCommandState("justifyLeft"));
    setIsJustifyCenter(document.queryCommandState("justifyCenter"));
    setIsJustifyRight(document.queryCommandState("justifyRight"));
    setIsJustifyFull(document.queryCommandState("justifyFull"));
  };

  const execCommand = (command: string, value = "") => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      handleInput();
      updateToolbarState();
    }
  };

  const { mutate } = useUploadImage();

  const handleImageUpload = () => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        // const reader = new FileReader();
        // reader.onload = (e) => {
        //   const result = e.target?.result as string;
        //   execCommand("insertImage", result);
        // };

        // reader.readAsDataURL(file);

        mutate(file, {
          onSuccess: (data) => {
            execCommand("insertImage", data);
          },
          onError: (error) => {
            console.error("Image upload failed:", error);
          },
        });
      }
    };
    input.click();
  };

  return (
    <div className="border w-full rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex items-center p-4 border-b gap-1">
        <button
          type="button"
          disabled={disabled}
          onClick={() => execCommand("undo")}
          className="p-1 hover:bg-gray-100 rounded"
          title="Undo"
        >
          <Undo2 className="h-5 w-5 text-slate-600" />
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => execCommand("redo")}
          className="p-1 hover:bg-gray-100 rounded"
          title="Redo"
        >
          <Redo2 className="h-5 w-5 text-slate-600" />
        </button>

        <div className="w-px h-6 bg-gray-200 mx-1"></div>

        <button
          type="button"
          disabled={disabled}
          onClick={() => execCommand("bold")}
          className={cn("p-1 rounded", "hover:bg-gray-100")}
          title="Bold (Ctrl/Cmd + B)"
        >
          <Bold
            className={cn(
              "h-5 w-5 text-slate-600",
              isBold ? "text-blue-500" : ""
            )}
          />
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => execCommand("italic")}
          className={cn("p-1 rounded", "hover:bg-gray-100")}
          title="Italic (Ctrl/Cmd + I)"
        >
          <Italic
            className={cn(
              "h-5 w-5 text-slate-600",
              isItalic ? "text-blue-500" : ""
            )}
          />
        </button>

        <div className="w-px h-6 bg-gray-200 mx-1"></div>

        <button
          type="button"
          disabled={disabled}
          onClick={handleImageUpload}
          className="p-1 hover:bg-gray-100 rounded"
          title="Insert Image"
        >
          <ImageIcon className="h-5 w-5 text-slate-600" />
        </button>

        <div className="w-px h-6 bg-gray-200 mx-1"></div>

        <button
          type="button"
          disabled={disabled}
          onClick={() => execCommand("justifyLeft")}
          className={cn("p-1 rounded", "hover:bg-gray-100")}
          title="Align Left (Ctrl/Cmd + Shift + L)"
        >
          <AlignLeft
            className={cn(
              "h-5 w-5 text-slate-600",
              isJustifyLeft ? "text-blue-500" : ""
            )}
          />
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => execCommand("justifyCenter")}
          className={cn("p-1 rounded", "hover:bg-gray-100")}
          title="Align Center (Ctrl/Cmd + Shift + E)"
        >
          <AlignCenter
            className={cn(
              "h-5 w-5 text-slate-600",
              isJustifyCenter ? "text-blue-500" : ""
            )}
          />
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => execCommand("justifyRight")}
          className={cn("p-1 rounded", "hover:bg-gray-100")}
          title="Align Right (Ctrl/Cmd + Shift + R)"
        >
          <AlignRight
            className={cn(
              "h-5 w-5 text-slate-600",
              isJustifyRight ? "text-blue-500" : ""
            )}
          />
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => execCommand("justifyFull")}
          className={cn("p-1 rounded", "hover:bg-gray-100")}
          title="Justify (Ctrl/Cmd + Shift + J)"
        >
          <AlignJustify
            className={cn(
              "h-5 w-5 text-slate-600",
              isJustifyFull ? "text-blue-500" : ""
            )}
          />
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable={!disabled}
        className={cn(
          "p-4 min-h-[300px] focus:outline-none bg-gray-50",
          "[&:empty::before]:content-[attr(data-placeholder)]",
          "[&:empty::before]:text-gray-500",
          "[&:empty::before]:text-sm",
          "[&:empty::before]:pointer-events-none",
          "[&:empty::before]:block"
        )}
        onInput={handleInput}
        onBlur={handleInput}
        onKeyUp={updateToolbarState}
        onMouseUp={updateToolbarState}
        data-placeholder={placeholder}
      ></div>

      {/* Footer */}
      <Box align={"start"} className="px-4 py-6 border-t">
        <Typography size={"textXs"} className="p-2 text-slate-900">
          {charCount} Words
        </Typography>
      </Box>
    </div>
  );
}
