
'use client';

import React, { useState } from 'react';
import { QRScanner } from '@/components/partner/scan/QRScanner';
import { ManualEntry } from '@/components/partner/scan/ManualEntry';
import { ValidationResult } from '@/components/partner/scan/ValidationResult';
import { useTicketValidation, ValidationData } from '@/hooks/useTicketValidation';
import { QrCode, Keyboard, History, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type ScanMode = 'scan' | 'manual' | 'result';

export default function ScanPage() {
    const [mode, setMode] = useState<ScanMode>('scan');
    const [result, setResult] = useState<ValidationData | null>(null);
    const { validateTicket, isLoading } = useTicketValidation();

    const handleValidation = async (code: string) => {
        const data = await validateTicket(code);
        setResult(data);
        setMode('result');
    };

    const handleReset = () => {
        setResult(null);
        setMode('scan');
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-40 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link href="/partner" className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </Link>
                    <h1 className="font-bold text-lg">Scan Tickets</h1>
                </div>
                {mode === 'manual' && (
                    <button
                        onClick={() => setMode('scan')}
                        className="text-sm font-medium text-primary hover:underline"
                    >
                        Cancel
                    </button>
                )}
            </header>

            <main className="max-w-md mx-auto pt-6 px-4">
                {mode === 'result' && result ? (
                    <ValidationResult
                        status={result.status}
                        message={result.message}
                        ticket={result.ticket}
                        onReset={handleReset}
                        onRedeem={() => {
                            // In a real app, this would call an API
                            alert('Ticket marked as redeemed!');
                            handleReset();
                        }}
                    />
                ) : mode === 'manual' ? (
                    <ManualEntry onValidate={handleValidation} isLoading={isLoading} />
                ) : (
                    <div className="flex flex-col items-center">
                        <p className="text-center text-slate-600 mb-8 px-8">
                            Scan the customer's QR code to validate and redeem their ticket.
                        </p>

                        <QRScanner onScan={(text) => text && handleValidation(text)} />

                        <div className="mt-8 flex flex-col gap-4 w-full max-w-xs">
                            <div className="flex items-center gap-3 w-full">
                                <div className="h-px bg-slate-200 flex-1"></div>
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Or</span>
                                <div className="h-px bg-slate-200 flex-1"></div>
                            </div>

                            <button
                                onClick={() => setMode('manual')}
                                className="w-full py-3 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
                            >
                                <Keyboard className="w-5 h-5 text-slate-400" />
                                Enter Code Manually
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
