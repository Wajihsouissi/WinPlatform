
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Megaphone, Send, MapPin, Tag, Clock, BarChart3, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MarketingPage() {
    const [isRequesting, setIsRequesting] = useState(false);

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Marketing & Push</h1>
                    <p className="text-slate-500 mt-1">Boost traffic by notifying nearby users instantly.</p>
                </div>
                <Button
                    onClick={() => setIsRequesting(!isRequesting)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200"
                >
                    <Megaphone className="h-4 w-4 mr-2" />
                    Request New Push
                </Button>
            </div>

            {isRequesting && (
                <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm animate-in slide-in-from-top-4">
                    <div className="flex items-center gap-3 mb-6 border-b border-emerald-50 pb-4">
                        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                            <Send className="h-5 w-5" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900">New Push Campaign</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Notification Message</label>
                                <textarea
                                    className="w-full h-24 rounded-lg border border-slate-200 p-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                                    placeholder="e.g. 🍔 Flash Deal! 50% OFF all burgers for the next 2 hours. Come quickly!"
                                    maxLength={140}
                                />
                                <p className="text-xs text-slate-400 mt-1 text-right">0/140 characters</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Target Radius</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-emerald-600" />
                                        <select className="w-full h-10 pl-9 rounded-lg border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-emerald-500">
                                            <option>1 km (Walking)</option>
                                            <option>3 km (Neighborhood)</option>
                                            <option>5 km (City Area)</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Link Deal</label>
                                    <div className="relative">
                                        <Tag className="absolute left-3 top-2.5 h-4 w-4 text-emerald-600" />
                                        <select className="w-full h-10 pl-9 rounded-lg border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-emerald-500">
                                            <option>Select a deal...</option>
                                            <option>Summer Burger Special</option>
                                            <option>Lunch Combo</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full bg-slate-900 text-white hover:bg-slate-800">
                                Submit Request
                            </Button>
                        </div>

                        {/* Preview */}
                        <div className="bg-slate-100 rounded-xl p-6 flex flex-col items-center justify-center">
                            <h3 className="text-xs font-bold text-slate-400 uppercase mb-4">User Preview</h3>
                            <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-4 border border-slate-200">
                                <div className="flex items-start gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
                                        <Megaphone className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <p className="font-bold text-sm text-slate-900">Delicious Burgers</p>
                                            <span className="text-[10px] text-slate-400">Now</span>
                                        </div>
                                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                                            🍔 Flash Deal! 50% OFF all burgers for the next 2 hours. Come quickly!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-4 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                Requires admin approval (approx. 15 mins)
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Campaign History */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900">Campaign History</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3">Campaign</th>
                                <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3">Status</th>
                                <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3">Sent Date</th>
                                <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3">Est. Reach</th>
                                <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3">Conversions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-slate-900 text-sm">Friday Flash Sale</p>
                                        <p className="text-xs text-slate-500 truncate mt-0.5">Get 20% off all drinks...</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                            i === 1 ? "bg-emerald-100 text-emerald-800" :
                                                i === 2 ? "bg-amber-100 text-amber-800" :
                                                    "bg-slate-100 text-slate-800"
                                        )}>
                                            {i === 1 ? "Sent" : i === 2 ? "Pending" : "Draft"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        Oct 24, 2024
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        2.4k Uses
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                                            <BarChart3 className="h-4 w-4 text-emerald-600" />
                                            142 (5.9%)
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
