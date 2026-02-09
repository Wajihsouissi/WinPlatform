import React from 'react';
import { CreateDealForm } from '@/components/partner/CreateDealForm';

export default function CreateDealPage() {
    return (
        <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Create New Deal</h1>
                <p className="text-slate-500 mt-1">Share your best offers with the community.</p>
            </div>

            <CreateDealForm />
        </div>
    );
}
