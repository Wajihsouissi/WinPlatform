
'use client';

import React, { useState } from 'react';
import { ShopProfile } from './ShopProfileView';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ImageUpload } from '@/components/partner/ImageUpload';
import { Save, X, Clock, MapPin, Globe, Phone, Mail, Building2, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ShopProfileFormProps {
    initialData: ShopProfile;
    onSave: (data: ShopProfile) => void;
    onCancel: () => void;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function ShopProfileForm({ initialData, onSave, onCancel }: ShopProfileFormProps) {
    const [formData, setFormData] = useState<ShopProfile>(initialData);
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            onSave(formData);
            setIsSaving(false);
        }, 1000);
    };

    const handleWorkingHoursChange = (day: string, field: 'open' | 'close' | 'closed', value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            workingHours: {
                ...prev.workingHours,
                [day]: {
                    ...prev.workingHours[day],
                    [field]: value
                }
            }
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24 z-30">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Edit Shop Profile</h2>
                    <p className="text-slate-500 text-sm">Update your public business information</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <Button type="button" variant="ghost" onClick={onCancel} disabled={isSaving} className="flex-1 sm:flex-none">
                        <X className="h-4 w-4 mr-2" /> Cancel
                    </Button>
                    <Button type="submit" disabled={isSaving} className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200">
                        <Save className="h-4 w-4 mr-2" />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Brand & Basics */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Brand Identity Card */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                            <ImageIcon className="h-5 w-5 text-emerald-600" />
                            Brand Identity
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Cover Photo</label>
                                <div className="h-48 w-full rounded-xl overflow-hidden border-2 border-dashed border-slate-200 hover:border-emerald-400 transition-colors bg-slate-50">
                                    <ImageUpload
                                        maxFiles={1}
                                        onImageSelect={(file) => setFormData(prev => ({ ...prev, coverUrl: URL.createObjectURL(file) }))}
                                        previewUrl={formData.coverUrl}
                                    />
                                </div>
                                <p className="text-xs text-slate-400 mt-2">Recommended size: 1200x400px</p>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700">Logo</label>
                                    <div className="h-32 w-32 rounded-2xl overflow-hidden border-2 border-dashed border-slate-200 hover:border-emerald-400 transition-colors bg-slate-50">
                                        <ImageUpload
                                            maxFiles={1}
                                            onImageSelect={(file) => setFormData(prev => ({ ...prev, logoUrl: URL.createObjectURL(file) }))}
                                            previewUrl={formData.logoUrl}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Shop Name</label>
                                        <Input
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            className="font-bold text-lg"
                                            placeholder="e.g. Delicious Burgers"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Category</label>
                                        <select
                                            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option value="Food">Food & Dining</option>
                                            <option value="Wellness">Health & Wellness</option>
                                            <option value="Beauty">Beauty & Spa</option>
                                            <option value="Retail">Retail & Shopping</option>
                                            <option value="Services">Services</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 pt-2">
                                <label className="text-sm font-medium text-slate-700">Description</label>
                                <textarea
                                    className="flex min-h-[120px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 resize-y"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Tell customers about your story, your products, and what makes you unique..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Info Card */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                            <Building2 className="h-5 w-5 text-emerald-600" />
                            Contact & Location
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-slate-400" /> Phone
                                </label>
                                <Input
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+216 00 000 000"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-slate-400" /> Email
                                </label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="contact@business.com"
                                />
                            </div>
                            <div className="col-span-1 md:col-span-2 space-y-2">
                                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-slate-400" /> Address
                                </label>
                                <Input
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    placeholder="Full street address"
                                />
                            </div>
                            <div className="col-span-1 md:col-span-2 space-y-2">
                                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-slate-400" /> Website
                                </label>
                                <Input
                                    value={formData.socialLinks.website || ''}
                                    onChange={e => setFormData({
                                        ...formData,
                                        socialLinks: { ...formData.socialLinks, website: e.target.value }
                                    })}
                                    placeholder="https://www.yourbusiness.com"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Working Hours */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-24">
                        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                            <Clock className="h-5 w-5 text-emerald-600" />
                            Working Hours
                        </h3>
                        <div className="space-y-4">
                            {DAYS.map(day => (
                                <div key={day} className="bg-slate-50 rounded-xl p-3 hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-200">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-semibold text-slate-700">{day}</span>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id={`closed-${day}`}
                                                checked={formData.workingHours[day]?.closed}
                                                onChange={e => handleWorkingHoursChange(day, 'closed', e.target.checked)}
                                                className="h-4 w-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                                            />
                                            <label htmlFor={`closed-${day}`} className="text-xs text-slate-500 cursor-pointer select-none">Closed</label>
                                        </div>
                                    </div>

                                    {!formData.workingHours[day]?.closed && (
                                        <div className="grid grid-cols-2 gap-2 animate-in slide-in-from-top-2 duration-200">
                                            <div>
                                                <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Open</label>
                                                <input
                                                    type="time"
                                                    value={formData.workingHours[day]?.open}
                                                    onChange={e => handleWorkingHoursChange(day, 'open', e.target.value)}
                                                    className="w-full text-xs border-slate-200 rounded-lg py-1.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Close</label>
                                                <input
                                                    type="time"
                                                    value={formData.workingHours[day]?.close}
                                                    onChange={e => handleWorkingHoursChange(day, 'close', e.target.value)}
                                                    className="w-full text-xs border-slate-200 rounded-lg py-1.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
