"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { ImagePlus } from "lucide-react";
import Box from "../ui/box";
import { ResponsiveImage } from "./responsive-image";
import Typography from "../ui/typography";

interface FilePickerProps {
  onFileSelect?: (file: File | null) => void;
  value?: File | string | null;
  supportedTypes?: string;
  showPreview?: boolean;
  onBlur?: () => void;
  disabled?: boolean;
}

export function FilePicker({
  onFileSelect,
  supportedTypes = "jpg or png",
  showPreview = true,
  value,
  disabled,
  onBlur,
}: FilePickerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
    return undefined;
  }, [selectedFile]);

  useEffect(() => {
    if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setSelectedFile(value);

      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof value === "string") {
      console.log("value is string", value);

      setSelectedFile(null);

      setPreviewUrl(value);
    } else {
      setSelectedFile(null);

      setPreviewUrl(null);
    }
  }, [value]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === "image/jpeg" || file.type === "image/png") {
        setSelectedFile(file);
        onFileSelect?.(file);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === "image/jpeg" || file.type === "image/png") {
        setSelectedFile(file);
        onFileSelect?.(file);
      }
    }
  };

  const handleDeleteImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    onFileSelect?.(null);
  };

  const handleChangeImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full max-w-md">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".jpg,.jpeg,.png"
        onChange={handleFileChange}
        disabled={disabled}
        onBlur={onBlur}
      />

      {showPreview && previewUrl || selectedFile ? (
        <Box className="p-3 rounded-[8px] max-w-[223px] border bg-white border-slate-200 gap-2">
          <Box className="max-w-[199px]">
            <ResponsiveImage
              src={previewUrl ?? ''}
              unoptimized={selectedFile ? false : true}
              alt="preview-image"
              aspectRatio="199/115"
              rounded="rounded-md"
            />
          </Box>

          <Box direction={"row"} className="gap-2">
            <Typography
              onClick={handleChangeImage}
              size={"textXs"}
              className="text-blue-600 underline hover:cursor-pointer"
            >
              Change
            </Typography>

            <Typography
              onClick={handleDeleteImage}
              size={"textXs"}
              className="text-red-500 underline hover:cursor-pointer"
            >
              Delete
            </Typography>
          </Box>
        </Box>
      ) : (
        <div
          className={`border-2 border-dashed rounded-[8px] py-10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors max-w-[223px] ${
            isDragging ? "border-primary bg-primary/5" : "border-slate-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <ImagePlus width={20} height={20} className="text-slate-500" />

          <Box className="gap-1">
            <Typography
              size={"textXs"}
              className="underline text-center text-slate-500"
            >
              Click to select files
            </Typography>

            <Typography size={"textXs"} className=" text-center text-slate-500">
              Suport File Type: {supportedTypes}
            </Typography>
          </Box>
        </div>
      )}
    </div>
  );
}
