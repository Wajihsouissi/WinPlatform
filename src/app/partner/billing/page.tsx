
'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Check, Download, CreditCard, Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BillingPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Subscription & Billing</h1>
                <p className="text-slate-500 mt-1">Manage your plan and view payment history.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Current Plan Card */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-emerald-500 rounded-full blur-[100px] opacity-20"></div>

                        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 mb-3">
                                    <Zap className="h-3 w-3" /> PRO PLAN
                                </div>
                                <h2 className="text-2xl font-bold">Pro Partner</h2>
                                <p className="text-slate-400 mt-2 text-sm">Next billing date: <strong>March 15, 2026</strong></p>
                            </div>
                            <div className="text-right">
                                <span className="text-4xl font-bold">49</span>
                                <span className="text-emerald-400 text-xl font-bold"> TND</span>
                                <span className="text-slate-400 text-sm"> / month</span>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-4">
                            <Button className="bg-white text-slate-900 hover:bg-slate-100 border-none">
                                Manage Subscription
                            </Button>
                            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                                <CreditCard className="h-4 w-4 mr-2" /> Update Payment Method
                            </Button>
                        </div>
                    </div>

                    {/* Invoices List */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900">Billing History</h3>
                            <Button variant="ghost" size="sm" className="text-emerald-600">View All</Button>
                        </div>
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-3 font-semibold text-slate-500">Invoice</th>
                                    <th className="px-6 py-3 font-semibold text-slate-500">Date</th>
                                    <th className="px-6 py-3 font-semibold text-slate-500">Amount</th>
                                    <th className="px-6 py-3 font-semibold text-slate-500">Status</th>
                                    <th className="px-6 py-3 font-semibold text-slate-500 text-right">Download</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="hover:bg-slate-50">
                                    <td className="px-6 py-4 font-medium text-slate-900">INV-2024-001</td>
                                    <td className="px-6 py-4 text-slate-600">Feb 15, 2026</td>
                                    <td className="px-6 py-4 text-slate-900">49.00 TND</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                                            Paid
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-emerald-600">
                                            <Download className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                    <td className="px-6 py-4 font-medium text-slate-900">INV-2024-002</td>
                                    <td className="px-6 py-4 text-slate-600">Jan 15, 2026</td>
                                    <td className="px-6 py-4 text-slate-900">49.00 TND</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                                            Paid
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-emerald-600">
                                            <Download className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Benefits / Upgrade Info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                        <div className="flex items-center gap-2 mb-4">
                            <Star className="h-5 w-5 text-emerald-600 fill-emerald-600" />
                            <h3 className="text-lg font-bold text-emerald-900">Plan Features</h3>
                        </div>
                        <ul className="space-y-3">
                            {[
                                'Unlimited Active Deals',
                                'Priority Support',
                                'Advanced Analytics',
                                '5 Push Notifications/mo',
                                'Multiple Branch Support'
                            ].map((feature) => (
                                <li key={feature} className="flex items-start gap-2 text-sm text-emerald-900">
                                    <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
