
'use client';

import React from 'react';
import { BranchList } from '@/components/partner/branches/BranchList';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BranchesPage() {
    return (
        <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
            <div className="mb-8">
                <Link
                    href="/partner/shop"
                    className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 mb-4 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Shop Profile
                </Link>
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Branch Management</h1>
                        <p className="text-slate-500 mt-1">Add and manage your store locations.</p>
                    </div>
                </div>
            </div>

            <BranchList />
        </div>
    );
}
