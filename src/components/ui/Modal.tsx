'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Use createPortal to render outside the DOM hierarchy if needed, 
    // but for simplicity here we'll render inline with fixed positioning which works fine in most cases.
    // Ideally, use createPortal(..., document.body) if you have issues with stacking contexts.

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 text-left">
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in"
                onClick={onClose}
                aria-hidden="true"
            />

            <div
                className={cn(
                    "relative w-full max-w-lg transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all animate-in zoom-in-95 border border-slate-200",
                    className
                )}
            >
                <div className="flex items-center justify-between mb-4">
                    {title && <h3 className="text-lg font-semibold leading-6 text-slate-900">{title}</h3>}
                    <button
                        type="button"
                        className="rounded-full bg-slate-100 p-1 text-slate-500 hover:text-slate-900 focus:outline-none"
                        onClick={onClose}
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
}
