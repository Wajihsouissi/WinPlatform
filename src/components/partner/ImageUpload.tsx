'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ImageUploadProps {
    maxFiles?: number;
    onFilesChange?: (files: File[]) => void;
    onImageSelect?: (file: File) => void; // Legacy support
    previewUrl?: string; // Legacy support
}

export function ImageUpload({ maxFiles = 3, onFilesChange, onImageSelect, previewUrl }: ImageUploadProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>(previewUrl ? [previewUrl] : []);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const processFiles = (newFiles: FileList | File[]) => {
        const validFiles: File[] = [];
        const newPreviews: string[] = [];

        Array.from(newFiles).forEach((file) => {
            if (file.type.startsWith('image/') && (files.length + validFiles.length) < maxFiles) {
                validFiles.push(file);
                newPreviews.push(URL.createObjectURL(file));
            }
        });

        if (validFiles.length > 0) {
            const updatedFiles = [...files, ...validFiles];
            setFiles(prev => [...prev, ...validFiles]);
            setPreviews(prev => [...prev, ...newPreviews]);

            if (onFilesChange) {
                onFilesChange(updatedFiles);
            }
            if (onImageSelect && validFiles.length > 0) {
                onImageSelect(validFiles[0]);
            }
        }
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            processFiles(e.dataTransfer.files);
        }
    }, [files, maxFiles, onFilesChange, onImageSelect]);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            processFiles(e.target.files);
        }
    };

    const removeFile = (index: number) => {
        const newFiles = [...files];
        const newPreviews = [...previews];

        // Only revoke if it's a blob url (not string url passed via prop)
        if (newPreviews[index].startsWith('blob:')) {
            URL.revokeObjectURL(newPreviews[index]);
        }

        newFiles.splice(index, 1);
        newPreviews.splice(index, 1);

        setFiles(newFiles);
        setPreviews(newPreviews);

        if (onFilesChange) {
            onFilesChange(newFiles);
        }
        // For onImageSelect, if we remove the file, we might want to pass null or the next available file? 
        // Typically single file uploaders just clear. 
        // But CreateDealForm expects (file: File). 
        // We'll leave it for now or handle if needed.
    };

    return (
        <div className="space-y-4">
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                    "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors relative",
                    isDragging ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:border-indigo-200 hover:bg-slate-50",
                    files.length >= maxFiles && "opacity-50 pointer-events-none"
                )}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInput}
                    className="hidden"
                    accept="image/*"
                    multiple
                />
                <div className="flex flex-col items-center gap-2 text-slate-500">
                    <div className="p-4 rounded-full bg-slate-100 mb-2">
                        <Upload className="h-6 w-6 text-slate-400" />
                    </div>
                    <p className="font-medium text-slate-900">Click to upload or drag & drop</p>
                    <p className="text-sm">SVG, PNG, JPG or GIF (max {maxFiles} files)</p>
                </div>
            </div>

            {previews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {previews.map((preview, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 group">
                            <Image
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                            <button
                                onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                                className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-red-100 text-slate-600 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
