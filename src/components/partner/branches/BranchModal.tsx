
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { X, MapPin, User, Phone, Globe, Clock, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface Branch {
    id: string;
    name: string;
    address: string;
    phone: string;
    activeDeals: number;
    // New Fields
    managerName?: string;
    managerPhone?: string;
    googleMapsUrl?: string;
    status?: 'Active' | 'Renovation' | 'Closed';
    openingHours?: string;
}

interface BranchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (branch: Branch) => void;
    branch?: Branch;
}

export function BranchModal({ isOpen, onClose, onSave, branch }: BranchModalProps) {
    const [formData, setFormData] = useState<Partial<Branch>>({
        name: '',
        address: '',
        phone: '',
        activeDeals: 0,
        status: 'Active',
        managerName: '',
        managerPhone: '',
        googleMapsUrl: '',
        openingHours: ''
    });

    const [activeTab, setActiveTab] = useState<'details' | 'management'>('details');

    useEffect(() => {
        if (branch) {
            setFormData(branch);
        } else {
            setFormData({
                name: '',
                address: '',
                phone: '',
                activeDeals: 0,
                status: 'Active',
                managerName: '',
                managerPhone: '',
                googleMapsUrl: '',
                openingHours: ''
            });
        }
    }, [branch, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: branch?.id || Math.random().toString(36).substr(2, 9),
            name: formData.name || '',
            address: formData.address || '',
            phone: formData.phone || '',
            activeDeals: formData.activeDeals || 0,
            status: formData.status || 'Active',
            managerName: formData.managerName,
            managerPhone: formData.managerPhone,
            googleMapsUrl: formData.googleMapsUrl,
            openingHours: formData.openingHours
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex justify-end">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                />

                {/* Sheet Content */}
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="relative w-full max-w-lg bg-white shadow-2xl h-full flex flex-col"
                >
                    <div className="flex justify-between items-center p-6 border-b">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">
                                {branch ? 'Edit Branch' : 'Add New Branch'}
                            </h2>
                            <p className="text-sm text-slate-500">Configure your store location details.</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <X className="h-5 w-5 text-slate-500" />
                        </button>
                    </div>

                    <div className="flex border-b">
                        <button
                            onClick={() => setActiveTab('details')}
                            className={cn(
                                "flex-1 py-3 text-sm font-medium border-b-2 transition-colors",
                                activeTab === 'details' ? "border-emerald-600 text-emerald-600" : "border-transparent text-slate-500 hover:text-slate-700"
                            )}
                        >
                            Location Details
                        </button>
                        <button
                            onClick={() => setActiveTab('management')}
                            className={cn(
                                "flex-1 py-3 text-sm font-medium border-b-2 transition-colors",
                                activeTab === 'management' ? "border-emerald-600 text-emerald-600" : "border-transparent text-slate-500 hover:text-slate-700"
                            )}
                        >
                            Management & Status
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        <form id="branch-form" onSubmit={handleSubmit} className="space-y-6">
                            {activeTab === 'details' ? (
                                <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                                    {/* Basic Info */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Branch Name <span className="text-red-500">*</span></label>
                                            <Input
                                                required
                                                placeholder="e.g., Downtown Branch"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Address <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                                <Input
                                                    required
                                                    placeholder="Street, City, Zip Code"
                                                    className="pl-9"
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Google Maps Link</label>
                                            <div className="relative">
                                                <Globe className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                                <Input
                                                    placeholder="https://maps.google.com/..."
                                                    className="pl-9"
                                                    value={formData.googleMapsUrl}
                                                    onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                                                />
                                            </div>
                                            <p className="text-xs text-slate-400 mt-1">Paste the share link from Google Maps</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Branch Phone</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                                <Input
                                                    placeholder="+216 71 000 000"
                                                    className="pl-9"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Opening Hours</label>
                                            <div className="relative">
                                                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                                <Input
                                                    placeholder="e.g., Mon-Sat: 9AM - 8PM"
                                                    className="pl-9"
                                                    value={formData.openingHours}
                                                    onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    {/* Status Section */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-3">Branch Status</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { value: 'Active', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
                                                { value: 'Renovation', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
                                                { value: 'Closed', icon: XCircle, color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' }
                                            ].map((status) => (
                                                <button
                                                    key={status.value}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, status: status.value as any })}
                                                    className={cn(
                                                        "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all gap-2",
                                                        formData.status === status.value
                                                            ? `${status.bg} ${status.border} ${status.color}`
                                                            : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                                                    )}
                                                >
                                                    <status.icon className="h-5 w-5" />
                                                    <span className="text-xs font-bold">{status.value}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Manager Section */}
                                    <div className="pt-4 border-t border-slate-100">
                                        <h3 className="text-sm font-bold text-slate-900 mb-4">Branch Manager</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">Manager Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                                    <Input
                                                        placeholder="Full Name"
                                                        className="pl-9"
                                                        value={formData.managerName}
                                                        onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">Manager Phone</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                                    <Input
                                                        placeholder="Mobile Number"
                                                        className="pl-9"
                                                        value={formData.managerPhone}
                                                        onChange={(e) => setFormData({ ...formData, managerPhone: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="p-6 border-t bg-slate-50">
                        <div className="flex gap-3 justify-end">
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button form="branch-form" type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200">
                                {branch ? 'Save Changes' : 'Create Branch'}
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
