
'use client';

import React from 'react';
import { RedemptionHistory } from '@/components/partner/RedemptionHistory';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function RedemptionsPage() {
    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Redemption History</h1>
                    <p className="text-slate-500 mt-1">Track your redeemed tickets and revenue.</p>
                </div>
                {/* Export button can be here or inside the component as configured */}
            </div>

            <RedemptionHistory />
        </div>
    );
}
