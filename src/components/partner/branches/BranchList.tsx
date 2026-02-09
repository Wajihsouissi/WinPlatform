
'use client';

import React, { useState } from 'react';
import { Branch, BranchModal } from './BranchModal';
import { Button } from '@/components/ui/Button';
import { Plus, MapPin, Phone, Edit2, Trash2, Store } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_BRANCHES: Branch[] = [
    {
        id: '1',
        name: 'Main Branch',
        address: '12 Avenue Habib Bourguiba, Tunis',
        phone: '+216 71 123 456',
        activeDeals: 3,
        status: 'Active',
        managerName: 'Ahmed Ben Ali',
        openingHours: 'Mon-Sun: 09:00 - 22:00'
    },
    {
        id: '2',
        name: 'La Marsa Branch',
        address: '5 Rue de l\'Indépendance, La Marsa',
        phone: '+216 71 987 654',
        activeDeals: 2,
        status: 'Renovation',
        managerName: 'Sarah Jlassi',
        googleMapsUrl: 'https://maps.google.com'
    }
];

export function BranchList() {
    const [branches, setBranches] = useState<Branch[]>(MOCK_BRANCHES);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBranch, setEditingBranch] = useState<Branch | undefined>(undefined);

    const handleAdd = (newBranch: Branch) => {
        if (editingBranch) {
            setBranches(branches.map(b => b.id === newBranch.id ? newBranch : b));
        } else {
            setBranches([...branches, newBranch]);
        }
        setEditingBranch(undefined);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this branch?')) {
            setBranches(branches.filter(b => b.id !== id));
        }
    };

    const openEdit = (branch: Branch) => {
        setEditingBranch(branch);
        setIsModalOpen(true);
    };

    const openAdd = () => {
        setEditingBranch(undefined);
        setIsModalOpen(true);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Renovation': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Closed': return 'bg-slate-100 text-slate-600 border-slate-200';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-slate-900">Your Branches</h2>
                    <p className="text-slate-500 text-sm">Manage your store locations</p>
                </div>
                <Button onClick={openAdd} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Branch
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                    {branches.map((branch) => (
                        <motion.div
                            key={branch.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            layout
                            className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusColor(branch.status || 'Active')}`}>
                                    {branch.status || 'Active'}
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openEdit(branch)}
                                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(branch.id)}
                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h3 className="font-bold text-slate-900 text-lg mb-1">{branch.name}</h3>
                                <p className="text-slate-500 text-sm flex items-center gap-1.5">
                                    <MapPin className="h-3.5 w-3.5" />
                                    <span className="truncate">{branch.address}</span>
                                </p>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-slate-100 text-sm mt-auto">
                                {branch.managerName && (
                                    <div className="flex justify-between items-center text-slate-600">
                                        <span className="text-xs text-slate-400 uppercase font-semibold">Manager</span>
                                        <span className="font-medium">{branch.managerName}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center text-slate-600">
                                    <span className="text-xs text-slate-400 uppercase font-semibold">Phone</span>
                                    <span className="font-medium">{branch.phone || '-'}</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-600">
                                    <span className="text-xs text-slate-400 uppercase font-semibold">Active Deals</span>
                                    <span className="font-medium text-emerald-600">{branch.activeDeals}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Empty State Add Button */}
                <motion.button
                    onClick={openAdd}
                    className="flex flex-col items-center justify-center h-full min-h-[200px] border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all gap-3 group"
                >
                    <div className="h-12 w-12 rounded-full bg-slate-100 group-hover:bg-white flex items-center justify-center transition-colors">
                        <Plus className="h-6 w-6" />
                    </div>
                    <span className="font-medium">Add Another Branch</span>
                </motion.button>
            </div>

            <BranchModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAdd}
                branch={editingBranch}
            />
        </div>
    );
}
