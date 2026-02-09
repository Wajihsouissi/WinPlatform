'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useSidebar } from './SidebarContext';
import { LayoutDashboard, Tag, QrCode, Store, ChevronLeft, ChevronRight, Settings, LogOut, ClipboardList, Megaphone, Bell, CreditCard, HelpCircle } from 'lucide-react';

export function PartnerSidebar() {
    const pathname = usePathname();
    const { isCollapsed, toggleSidebar } = useSidebar();

    // Partner specific navigation
    const navItems = [
        { label: 'Dashboard', href: '/partner', icon: LayoutDashboard },
        { label: 'My Deals', href: '/partner/deals', icon: Tag },
        { label: 'Scan Ticket', href: '/partner/scan', icon: QrCode },
        { label: 'Redemptions', href: '/partner/redemptions', icon: ClipboardList },

        { label: 'My Shop', href: '/partner/shop', icon: Store },
        { label: 'Settings', href: '/partner/settings', icon: Settings },
    ];

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 h-full border-r bg-slate-900 text-white flex flex-col z-50 transition-all duration-300 ease-in-out hidden md:flex",
                isCollapsed ? "w-20 p-4 items-center" : "w-64 p-6"
            )}
        >
            <div className={cn("mb-10 flex items-center gap-2", isCollapsed && "justify-center mb-8")}>
                <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold flex-shrink-0">P</div>
                {!isCollapsed && <span className="text-xl font-bold tracking-tight whitespace-nowrap overflow-hidden animate-in fade-in duration-300">Partner</span>}
            </div>

            <nav className="flex-1 space-y-1 w-full">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/partner' && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 rounded-lg py-2.5 transition-colors group relative',
                                isCollapsed ? "justify-center px-0 w-10 h-10 mx-auto" : "px-3",
                                isActive
                                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
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

            <div className="border-t border-slate-700 pt-6 w-full flex flex-col gap-4">
                <Link
                    href="/"
                    className={cn(
                        "flex items-center gap-3 rounded-lg py-2.5 px-3 transition-colors text-slate-400 hover:bg-slate-800 hover:text-white",
                        isCollapsed && "justify-center px-0 w-10 h-10 mx-auto"
                    )}
                    title="Back to App"
                >
                    <div className="relative">
                        <LogOut className="h-5 w-5 flex-shrink-0" />
                    </div>
                    {!isCollapsed && (
                        <span className="text-sm font-medium whitespace-nowrap overflow-hidden animate-in fade-in duration-200">Back to App</span>
                    )}
                </Link>

                <button
                    onClick={toggleSidebar}
                    className="flex items-center justify-center w-full p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
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
