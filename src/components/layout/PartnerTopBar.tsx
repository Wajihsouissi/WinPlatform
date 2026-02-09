
'use client';

import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from './SidebarContext';
import { Button } from '@/components/ui/Button';

export function PartnerTopBar() {
    const pathname = usePathname();
    const { toggleSidebar } = useSidebar();

    // Helper to get page title
    const getPageTitle = (path: string) => {
        if (path === '/partner') return 'Dashboard';
        if (path === '/partner/deals') return 'My Deals';
        if (path === '/partner/marketing') return 'Marketing & Push';
        if (path === '/partner/notifications') return 'Notifications';
        if (path === '/partner/scan') return 'Scan Ticket';
        if (path === '/partner/redemptions') return 'Redemption History';
        if (path === '/partner/shop') return 'My Shop Profile';
        if (path === '/partner/shop/branches') return 'Branch Management';
        if (path === '/partner/billing') return 'Subscription & Billing';
        if (path === '/partner/support') return 'Help & Support';
        if (path === '/partner/settings') return 'Settings';
        if (path.includes('/create')) return 'Create New Deal';
        return 'Partner Portal';
    };

    return (
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 shadow-sm">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg"
                >
                    <Menu className="h-5 w-5" />
                </button>
                <h1 className="text-xl font-bold text-slate-900 truncate">
                    {getPageTitle(pathname)}
                </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                {/* Search (Optional/Future) */}
                <div className="hidden md:flex relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="h-9 w-64 pl-9 pr-4 rounded-full bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    />
                </div>

                <Link href="/partner/notifications">
                    <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-2 right-2.5 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                </Link>

                <div className="h-8 w-px bg-slate-200 mx-1"></div>

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-slate-900">Delicious Burgers</p>
                        <p className="text-xs text-slate-500">Partner Account</p>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold">
                        DB
                    </div>
                </div>
            </div>
        </header>
    );
}
