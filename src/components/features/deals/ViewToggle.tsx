'use client';

import React from 'react';
import { Map, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ViewToggleProps {
    view: 'map' | 'list';
    onChange: (view: 'map' | 'list') => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
    return (
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
                onClick={() => onChange('map')}
                className={cn(
                    'flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all',
                    view === 'map'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900'
                )}
            >
                <Map className="h-4 w-4" />
                Map
            </button>
            <button
                onClick={() => onChange('list')}
                className={cn(
                    'flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all',
                    view === 'list'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900'
                )}
            >
                <List className="h-4 w-4" />
                List
            </button>
        </div>
    );
}
