'use client';

import React from 'react';
import { DealsList } from '@/components/partner/DealsList';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';

export default function MyDealsPage() {
    return (
        <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">My Deals</h1>
                    <p className="text-slate-500 mt-1">Manage your active and past offers.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="text-slate-600">
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                    </Button>
                </div>
            </div>

            <DealsList />
        </div>
    );
}
