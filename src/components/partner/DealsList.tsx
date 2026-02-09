
'use client';

import React, { useState } from 'react';
import { DealCard, Deal } from './DealCard';
import { DealTabs } from './DealTabs';
import { Button } from '@/components/ui/Button';
import { PlusCircle, Search, Filter, LayoutGrid, List as ListIcon } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useDeals } from '@/context/DealsContext';
import { DealsTable } from './DealsTable';
import { useRouter } from 'next/navigation';
import { DealAnalyticsModal } from './deals/DealAnalyticsModal';

export function DealsList() {
    const { deals, deleteDeal, duplicateDeal } = useDeals();
    const router = useRouter();
    const [currentTab, setCurrentTab] = useState('Active');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
    const [selectedDealForAnalytics, setSelectedDealForAnalytics] = useState<Deal | null>(null);

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this deal?')) {
            deleteDeal(id);
        }
    };

    const handleDuplicate = (id: string) => {
        duplicateDeal(id);
        alert('Deal duplicated as Draft!');
    };

    const handleExtend = (id: string) => {
        alert(`Extend expiry for deal ${id}`);
    };

    const handleEdit = (id: string) => {
        router.push(`/partner/deals/edit/${id}`);
    };

    const handleAnalytics = (id: string) => {
        const deal = deals.find(d => d.id === id);
        if (deal) setSelectedDealForAnalytics(deal);
    };

    const filteredDeals = deals.filter(deal => {
        if (currentTab === 'Active' && deal.status === 'Active') return true;
        if (currentTab === 'Scheduled' && deal.status === 'Scheduled') return true;
        if (currentTab === 'Expired' && deal.status === 'Expired') return true;
        if (currentTab === 'Draft' && deal.status === 'Draft') return true;
        return false;
    }).filter(deal =>
        deal.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate counts for tabs
    const counts = deals.reduce((acc, deal) => {
        acc[deal.status] = (acc[deal.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <DealTabs
                    currentTab={currentTab}
                    onTabChange={setCurrentTab}
                    counts={counts}
                />

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search deals..."
                            className="pl-9 bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'table' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <ListIcon className="h-4 w-4" />
                        </button>
                    </div>
                    <Link href="/partner/deals/create">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Create Deal
                        </Button>
                    </Link>
                </div>
            </div>


            {/* Deals Grid / Table */}
            <AnimatePresence mode="popLayout">
                {filteredDeals.length > 0 ? (
                    viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            {filteredDeals.map((deal) => (
                                <motion.div
                                    key={deal.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <DealCard
                                        deal={deal}
                                        onDelete={handleDelete}
                                        onDuplicate={handleDuplicate}
                                        onExtend={handleExtend}
                                        onEdit={() => handleEdit(deal.id)}
                                        onAnalytics={handleAnalytics}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <DealsTable
                                deals={filteredDeals}
                                onDelete={handleDelete}
                                onDuplicate={handleDuplicate}
                                onExtend={handleExtend}
                                onEdit={handleEdit}
                            />
                        </motion.div>
                    )
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="col-span-1 xl:col-span-2 text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed"
                    >
                        <div className="mx-auto h-12 w-12 text-slate-300 mb-3">
                            <Search className="h-full w-full" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">No deals found</h3>
                        <p className="text-slate-500 mt-1">Try adjusting your search or create a new deal.</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Analytics Modal */}
            {selectedDealForAnalytics && (
                <DealAnalyticsModal
                    isOpen={!!selectedDealForAnalytics}
                    onClose={() => setSelectedDealForAnalytics(null)}
                    deal={selectedDealForAnalytics}
                />
            )}
        </div>
    );
}
