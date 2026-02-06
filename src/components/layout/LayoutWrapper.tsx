'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { SidebarProvider, useSidebar } from './SidebarContext';
import { cn } from '@/lib/utils';

import { usePathname } from 'next/navigation';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppLayoutContent>{children}</AppLayoutContent>
        </SidebarProvider>
    );
}

function AppLayoutContent({ children }: { children: React.ReactNode }) {
    const { isCollapsed } = useSidebar();
    const pathname = usePathname();
    const isAuthPage = pathname === '/login' || pathname === '/signup';

    if (isAuthPage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <TopBar />
            <main
                className={cn(
                    "p-6 min-h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out",
                    isCollapsed ? "md:ml-20" : "md:ml-64"
                )}
            >
                {children}
            </main>
        </div>
    );
}
