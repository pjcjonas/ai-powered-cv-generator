"use client";

import { useRef, useState } from "react";

interface Props {
  onFile: (file: File) => void;
  file: File | null;
}

export function FileDropzone({ onFile, file }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.type === "application/pdf") onFile(f);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) onFile(f);
  }

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          dragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
        }`}
      >
        {file ? (
          <div className="text-sm">
            <p className="font-medium text-gray-900">{file.name}</p>
            <p className="text-gray-500">{(file.size / 1024).toFixed(0)} KB</p>
            <p className="text-blue-600 mt-2">Click to change file</p>
          </div>
        ) : (
          <div className="text-sm text-gray-500">
            <p className="text-2xl mb-2">📄</p>
            <p className="font-medium text-gray-700">Drop your LinkedIn PDF here</p>
            <p className="mt-1">or <span className="text-blue-600">click to browse</span></p>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handleChange}
      />
      <p className="mt-2 text-xs text-gray-400">
        On LinkedIn: Settings → Data Privacy → Get a copy of your data → download the zip and extract <strong>Profile.pdf</strong>
      </p>
    </div>
  );
}
