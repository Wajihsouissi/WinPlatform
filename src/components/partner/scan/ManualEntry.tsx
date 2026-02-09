
import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';

interface ManualEntryProps {
    onValidate: (code: string) => void;
    isLoading: boolean;
}

export function ManualEntry({ onValidate, isLoading }: ManualEntryProps) {
    const [code, setCode] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (code.trim()) {
            onValidate(code.trim().toUpperCase());
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto p-6">
            <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Manual Entry</h3>
                <p className="text-sm text-slate-500">Enter the customer's ticket code below</p>
            </div>

            <form onSubmit={handleSubmit} className="relative">
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="e.g. WIN-8829-XJ"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none uppercase tracking-widest font-mono text-center text-lg placeholder:normal-case placeholder:tracking-normal placeholder:font-sans transition-all"
                        disabled={isLoading}
                    />
                </div>

                <button
                    type="submit"
                    disabled={!code.trim() || isLoading}
                    className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            Validate Code
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Recent Validations</p>
                <div className="space-y-2">
                    {[
                        { code: 'WIN-9283-KM', time: '2 mins ago', status: 'valid' },
                        { code: 'WIN-1122-PL', time: '15 mins ago', status: 'valid' },
                        { code: 'WIN-EXP-001', time: '1 hour ago', status: 'invalid' },
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg text-sm">
                            <span className="font-mono text-slate-700">{item.code}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-400">{item.time}</span>
                                <div className={`w-2 h-2 rounded-full ${item.status === 'valid' ? 'bg-green-500' : 'bg-red-500'}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
