import React from 'react';
import { PlusCircle, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface PartnerQuickActionsProps {
    onScanQr?: () => void;
}

export function PartnerQuickActions({ onScanQr }: PartnerQuickActionsProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link href="/partner/deals/create" className="group p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-emerald-500 hover:shadow-md transition-all flex flex-col items-center gap-3 text-center">
                <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <PlusCircle className="h-6 w-6" />
                </div>
                <div>
                    <span className="block font-semibold text-slate-900 group-hover:text-emerald-700">Create New Deal</span>
                    <span className="text-xs text-slate-500">Launch a promotion</span>
                </div>
            </Link>

            <Link href="/partner/scan" className="group p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-emerald-500 hover:shadow-md transition-all flex flex-col items-center gap-3 text-center">
                <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <QrCode className="h-6 w-6" />
                </div>
                <div>
                    <span className="block font-semibold text-slate-900 group-hover:text-emerald-700">Scan Ticket</span>
                    <span className="text-xs text-slate-500">Validate redemption</span>
                </div>
            </Link>
        </div>
    );
}
