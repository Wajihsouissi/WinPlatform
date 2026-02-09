import React from 'react';
import { CreateDealForm } from '@/components/partner/CreateDealForm';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditDealPage({ params }: PageProps) {
    const { id } = await params;

    return (
        <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Edit Deal</h1>
                <p className="text-slate-500 mt-1">Update your deal information.</p>
            </div>

            <CreateDealForm dealId={id} />
        </div>
    );
}
