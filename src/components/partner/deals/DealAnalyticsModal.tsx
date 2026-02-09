
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Users, MousePointer2, CreditCard, BarChart2, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Deal } from '@/components/partner/DealCard';

interface DealAnalyticsModalProps {
    isOpen: boolean;
    onClose: () => void;
    deal: Deal;
}

import { createPortal } from 'react-dom';

export function DealAnalyticsModal({ isOpen, onClose, deal }: DealAnalyticsModalProps) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Mock Data for Charts (moved inside to avoid identifying as constant if outside)
    const performanceData = [
        { day: 'Mon', views: 45, redeems: 12 },
        { day: 'Tue', views: 52, redeems: 15 },
        { day: 'Wed', views: 38, redeems: 8 },
        { day: 'Thu', views: 65, redeems: 22 },
        { day: 'Fri', views: 89, redeems: 34 },
        { day: 'Sat', views: 120, redeems: 56 },
        { day: 'Sun', views: 95, redeems: 41 },
    ];

    const maxViews = Math.max(...performanceData.map(d => d.views));

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-[9999] backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-[10000] overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">{deal.title}</h2>
                                <p className="text-sm text-slate-500 mt-1">Real-time Performance Analytics</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full h-8 w-8 p-0">
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto space-y-8">

                            {/* Key Metrics Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-2 uppercase">
                                        <Users className="h-4 w-4" /> Views
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900">1,248</p>
                                    <p className="text-xs text-emerald-600 flex items-center mt-1">
                                        <TrendingUp className="h-3 w-3 mr-1" /> +12%
                                    </p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-2 uppercase">
                                        <MousePointer2 className="h-4 w-4" /> Clicks
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900">856</p>
                                    <p className="text-xs text-emerald-600 flex items-center mt-1">
                                        <TrendingUp className="h-3 w-3 mr-1" /> +5%
                                    </p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-2 uppercase">
                                        <CreditCard className="h-4 w-4" /> Redeems
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900">342</p>
                                    <p className="text-xs text-emerald-600 flex items-center mt-1">
                                        <TrendingUp className="h-3 w-3 mr-1" /> +18%
                                    </p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-2 uppercase">
                                        <PieChart className="h-4 w-4" /> Conv. Rate
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900">27.4%</p>
                                    <p className="text-xs text-emerald-600 flex items-center mt-1">
                                        <TrendingUp className="h-3 w-3 mr-1" /> +2%
                                    </p>
                                </div>
                            </div>

                            {/* Performance Chart */}
                            <div className="bg-white rounded-xl border border-slate-200 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                        <BarChart2 className="h-5 w-5 text-emerald-600" />
                                        Activity (Last 7 Days)
                                    </h3>
                                    <div className="flex gap-4 text-xs font-medium">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span> Views
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Redemptions
                                        </span>
                                    </div>
                                </div>

                                <div className="h-48 flex items-end gap-2 justify-between">
                                    {performanceData.map((item, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                                            <div className="w-full max-w-[40px] flex gap-1 items-end h-full">
                                                {/* Views Bar */}
                                                <div
                                                    className="w-1/2 bg-slate-200 rounded-t-sm transition-all group-hover:bg-slate-300"
                                                    style={{ height: `${(item.views / maxViews) * 100}%` }}
                                                ></div>
                                                {/* Redeems Bar */}
                                                <div
                                                    className="w-1/2 bg-emerald-500 rounded-t-sm transition-all group-hover:bg-emerald-600"
                                                    style={{ height: `${(item.redeems / maxViews) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-[10px] text-slate-500 font-medium">{item.day}</span>

                                            {/* Tooltip */}
                                            <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20 pointer-events-none">
                                                {item.views} Views, {item.redeems} Redeems
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Audience Demographics */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl border border-slate-200 p-6">
                                    <h3 className="font-bold text-slate-900 mb-4 text-sm">Gender Distribution</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-slate-600">Male</span>
                                                <span className="font-medium text-slate-900">55%</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-500 w-[55%]"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-slate-600">Female</span>
                                                <span className="font-medium text-slate-900">45%</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-pink-500 w-[45%]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl border border-slate-200 p-6">
                                    <h3 className="font-bold text-slate-900 mb-4 text-sm">Age Group</h3>
                                    <div className="space-y-3">
                                        {[
                                            { label: '18-24', pct: 35 },
                                            { label: '25-34', pct: 45 },
                                            { label: '35+', pct: 20 },
                                        ].map((age) => (
                                            <div key={age.label}>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-slate-600">{age.label}</span>
                                                    <span className="font-medium text-slate-900">{age.pct}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-emerald-500" style={{ width: `${age.pct}%` }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
