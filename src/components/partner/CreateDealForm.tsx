'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ImageUpload } from './ImageUpload';
import { DealPreview } from './DealPreview';
import {
    Tag,
    Clock,
    DollarSign,
    Box,
    Calendar,
    Save,
    ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { useDeals } from '@/context/DealsContext';
import { useRouter } from 'next/navigation';
import { Deal } from './DealCard';

interface CreateDealFormProps {
    dealId?: string;
}

export function CreateDealForm({ dealId }: CreateDealFormProps) {
    const router = useRouter();
    const { addDeal, updateDeal, getDeal } = useDeals();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        originalPrice: '',
        discountedPrice: '',
        quantity: '',
        category: '',
        subCategory: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        image: null as File | null,
        imageUrl: '',
        isFlashDeal: false,
        isHappyHour: false
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (dealId) {
            const deal = getDeal(dealId);
            if (deal) {
                const startDate = new Date();
                const endDate = new Date(deal.validUntil);

                setFormData({
                    title: deal.title,
                    description: 'Detailed description not in mock model yet...',
                    originalPrice: deal.originalPrice.toString(),
                    discountedPrice: deal.discountedPrice.toString(),
                    quantity: deal.quantity.toString(),
                    category: 'Food & Drink',
                    subCategory: 'Fast Food',
                    startDate: startDate.toISOString().split('T')[0],
                    startTime: '09:00',
                    endDate: endDate.toISOString().split('T')[0],
                    endTime: '23:59',
                    image: null,
                    imageUrl: deal.image,
                    isFlashDeal: false,
                    isHappyHour: false
                });
            }
        }
    }, [dealId, getDeal]);


    const handleImageChange = (file: File) => {
        setFormData(prev => ({
            ...prev,
            image: file,
            imageUrl: URL.createObjectURL(file)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        const dealData = {
            title: formData.title,
            image: formData.imageUrl,
            discountedPrice: Number(formData.discountedPrice),
            originalPrice: Number(formData.originalPrice),
            quantity: Number(formData.quantity),
            validUntil: `${formData.endDate}T${formData.endTime}`,
            status: 'Active' as Deal['status']
        };

        if (dealId) {
            updateDeal(dealId, dealData);
            // alert('Deal updated successfully!');
        } else {
            addDeal(dealData);
            // alert('Deal created successfully!');
        }

        setIsLoading(false);
        router.push('/partner/deals');
    };

    const getSubCategories = (category: string) => {
        switch (category) {
            case 'Food & Drink': return ['Fast Food', 'Fine Dining', 'Cafe', 'Bakery'];
            case 'Services': return ['Cleaning', 'Repair', 'Moving', 'Beauty'];
            case 'Entertainment': return ['Movies', 'Concerts', 'Games', 'Events'];
            case 'Retail': return ['Clothing', 'Electronics', 'Home & Garden', 'Accessories'];
            default: return [];
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Form Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <Link href="/partner/deals" className="text-slate-500 hover:text-slate-800 text-sm flex items-center gap-1 mb-1 transition-colors">
                            <ArrowLeft className="h-3 w-3" /> Back to Deals
                        </Link>
                        <h2 className="text-xl font-bold text-slate-900">{dealId ? 'Edit Deal' : 'Create New Deal'}</h2>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    {/* 1. Basic Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-indigo-600 font-semibold border-b border-indigo-50 pb-2">
                            <Tag className="h-4 w-4" />
                            <h3>Basic Information</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Deal Title <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    placeholder="e.g., 50% Off Gourmet Burger Combo"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value, subCategory: '' })}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Food & Drink">Food & Drink</option>
                                        <option value="Services">Services</option>
                                        <option value="Entertainment">Entertainment</option>
                                        <option value="Retail">Retail</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Sub-Category
                                    </label>
                                    <select
                                        className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={formData.subCategory}
                                        onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                                        disabled={!formData.category}
                                    >
                                        <option value="">Select Sub-Category</option>
                                        {getSubCategories(formData.category).map(sub => (
                                            <option key={sub} value={sub}>{sub}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    className="w-full h-24 px-3 py-2 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                    placeholder="Describe your deal..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 2. Media */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-indigo-600 font-semibold border-b border-indigo-50 pb-2">
                            <Box className="h-4 w-4" />
                            <h3>Product Media</h3>
                        </div>
                        <ImageUpload
                            onImageSelect={handleImageChange}
                            previewUrl={formData.imageUrl}
                        />
                    </div>

                    {/* 3. Pricing & Inventory */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-indigo-600 font-semibold border-b border-indigo-50 pb-2">
                            <DollarSign className="h-4 w-4" />
                            <h3>Pricing & Inventory</h3>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Original Price (TND)
                                </label>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    min="0"
                                    value={formData.originalPrice}
                                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Discounted Price (TND)
                                </label>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    min="0"
                                    value={formData.discountedPrice}
                                    onChange={(e) => setFormData({ ...formData, discountedPrice: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Quantity
                                </label>
                                <Input
                                    type="number"
                                    placeholder="100"
                                    min="1"
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* 4. Timing */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-emerald-600 font-semibold border-b border-emerald-50 pb-2">
                            <Calendar className="h-4 w-4" />
                            <h3>Timing</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                                <Input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Start Time</label>
                                <Input
                                    type="time"
                                    value={formData.startTime}
                                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                                <Input
                                    type="date"
                                    value={formData.endDate}
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">End Time</label>
                                <Input
                                    type="time"
                                    value={formData.endTime}
                                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* 5. Special Tags */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-indigo-600 font-semibold border-b border-indigo-50 pb-2">
                            <Tag className="h-4 w-4" />
                            <h3>Special Tags</h3>
                        </div>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors flex-1">
                                <input
                                    type="checkbox"
                                    checked={formData.isFlashDeal}
                                    onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-slate-900">Flash Deal</span>
                                    <span className="text-xs text-slate-500">Highlight as urgent limited-time offer</span>
                                </div>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors flex-1">
                                <input
                                    type="checkbox"
                                    checked={formData.isHappyHour}
                                    onChange={(e) => setFormData({ ...formData, isHappyHour: e.target.checked })}
                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-slate-900">Happy Hour</span>
                                    <span className="text-xs text-slate-500">Boost visibility during slow hours</span>
                                </div>
                            </label>
                        </div>
                    </div>


                    <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 sticky bottom-0 bg-white p-4 -mx-6 -mb-6 shadow-neutral-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" isLoading={isLoading} className="bg-indigo-600 hover:bg-indigo-700 min-w-[150px]">
                            {dealId ? 'Update Deal' : 'Publish Deal'}
                        </Button>
                    </div>
                </form>
            </div>

            {/* Preview Section */}
            <div className="hidden lg:block space-y-6 sticky top-24 h-fit">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-700">Live Preview</h3>
                    <span className="text-xs text-slate-400">Updates in real-time</span>
                </div>

                <DealPreview
                    data={formData}
                    title={formData.title}
                    image={formData.imageUrl}
                    originalPrice={formData.originalPrice}
                    discountedPrice={formData.discountedPrice}
                    shopName="Delicious Burgers"
                />

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800">
                    <p className="font-semibold mb-1">💡 Pro Tip:</p>
                    <p>Deals with high-quality images and discounts over 30% see 2x more engagement.</p>
                </div>
            </div>
        </div>
    );
}
