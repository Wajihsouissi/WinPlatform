'use client';

import React from 'react';
import { DealsProvider } from '@/context/DealsContext';
import { PartnerSidebar } from '@/components/layout/PartnerSidebar';
import { PartnerTopBar } from '@/components/layout/PartnerTopBar';
import { SidebarProvider } from '@/components/layout/SidebarContext';

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
    return (
        <DealsProvider>
            <SidebarProvider>
                <div className="flex min-h-screen bg-slate-50">
                    <PartnerSidebar />
                    <div className="flex-1 flex flex-col md:ml-20 transition-all duration-300 ease-in-out">
                        {/* Note: margin-left needs to match sidebar collapsed width, likely handled by sidebar logic or context */}
                        {/* actually PartnerSidebar is fixed. We need to reserve space. */}
                        {/* The Sidebar component handles its width. We need a wrapper that adjusts margin based on context? */}
                        {/* For simplicity now, let's just flex it or assume standard behavior. */}
                        {/* Re-reading PartnerSidebar: it is fixed.
                             It accepts `isCollapsed`.
                             If we put it here, we should probably handle the main content margin.
                         */}
                        <PartnerTopBar />
                        <main className="flex-1 p-4 sm:p-6 lg:p-8">
                            {children}
                        </main>
                    </div>
                </div>
            </SidebarProvider>
        </DealsProvider>
    );
}
