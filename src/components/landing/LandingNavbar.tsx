'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function LandingNavbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-6 md:px-12">
            <Link href="/" className="flex items-center gap-2">
                <div className="bg-[#242526] text-white p-1 rounded-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
                    </svg>
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">WIN</span>
            </Link>
            <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 hidden sm:block">
                    Log In
                </Link>
                <Link href="/signup">
                    <Button className="rounded-full px-6 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-all font-semibold shadow-lg shadow-slate-200">
                        Join Now
                    </Button>
                </Link>
            </div>
        </nav>
    );
}
