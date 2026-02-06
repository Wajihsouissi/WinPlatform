'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useSidebar } from './SidebarContext';

import { Home, Grid, User, ChevronLeft, ChevronRight, Store } from 'lucide-react';

export function Sidebar() {
    const pathname = usePathname();
    const { isCollapsed, toggleSidebar } = useSidebar();
    const navItems = [
        { label: 'Deals', href: '/', icon: Home },
        { label: 'Shops', href: '/shops', icon: Store },
        { label: 'Categories', href: '/categories', icon: Grid },
        { label: 'Profile', href: '/profile', icon: User },
    ];

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 h-full border-r bg-background flex flex-col z-50 transition-all duration-300 ease-in-out hidden md:flex",
                isCollapsed ? "w-20 p-4 items-center" : "w-64 p-6"
            )}
        >
            <div className={cn("mb-10 flex items-center gap-2", isCollapsed && "justify-center mb-8")}>
                <div className="h-8 w-8 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center text-white font-bold flex-shrink-0">W</div>
                {!isCollapsed && <span className="text-xl font-bold tracking-tight whitespace-nowrap overflow-hidden animate-in fade-in duration-300">WIN</span>}
            </div>

            <nav className="flex-1 space-y-1 w-full">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 rounded-lg py-2.5 transition-colors group relative',
                                isCollapsed ? "justify-center px-0 w-10 h-10 mx-auto" : "px-3",
                                isActive
                                    ? 'bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            )}
                            title={isCollapsed ? item.label : undefined}
                        >
                            <div className="relative">
                                <item.icon className="h-5 w-5 flex-shrink-0" />
                            </div>
                            {!isCollapsed && (
                                <span className="text-sm font-medium whitespace-nowrap overflow-hidden animate-in fade-in duration-200">{item.label}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t pt-6 w-full flex flex-col gap-4">
                {!isCollapsed ? (
                    <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-medium text-slate-500 mb-1">Your Balance</p>
                        <p className="text-lg font-bold text-slate-900">0.00 TND</p>
                    </div>
                ) : (
                    <div className="flex justify-center py-2" title="Balance: 0.00 TND">
                        <div className="h-2 w-2 rounded-full bg-[hsl(var(--primary))]"></div>
                    </div>
                )}

                <button
                    onClick={toggleSidebar}
                    className="flex items-center justify-center w-full p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                >
                    {isCollapsed ? <ChevronRight className="h-5 w-5" /> : (
                        <div className="flex items-center gap-2">
                            <ChevronLeft className="h-5 w-5" />
                            <span className="text-sm font-medium">Collapse</span>
                        </div>
                    )}
                </button>
            </div>
        </aside>
    );
}
