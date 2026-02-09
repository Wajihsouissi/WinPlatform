'use client';

import React, { useState } from 'react';
import { ShopProfile, ShopProfileView } from '@/components/partner/ShopProfileView';
import { ShopProfileForm } from '@/components/partner/ShopProfileForm';

// Initial Mock Data
const INITIAL_SHOP_DATA: ShopProfile = {
    name: "Delicious Burgers & Co.",
    description: "We serve the best gourmet burgers in town, made with love and locally sourced ingredients. Come visit us for a delightful experience!",
    logoUrl: "",
    coverUrl: "",
    category: "Food",
    address: "123 Main Street, Downtown Tunis",
    phone: "+216 71 123 456",
    email: "contact@deliciousburgers.tn",
    socialLinks: {
        website: "https://deliciousburgers.tn",
        facebook: "deliciousburgers",
        instagram: "deliciousburgers"
    },
    workingHours: {
        Monday: { open: "09:00", close: "22:00", closed: false },
        Tuesday: { open: "09:00", close: "22:00", closed: false },
        Wednesday: { open: "09:00", close: "22:00", closed: false },
        Thursday: { open: "09:00", close: "23:00", closed: false },
        Friday: { open: "09:00", close: "00:00", closed: false },
        Saturday: { open: "10:00", close: "00:00", closed: false },
        Sunday: { open: "10:00", close: "22:00", closed: false },
    }
};

export default function ShopProfilePage() {
    const [shopData, setShopData] = useState<ShopProfile>(INITIAL_SHOP_DATA);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = (newData: ShopProfile) => {
        setShopData(newData);
        setIsEditing(false);
        // Ideally save to context or backend here
    };

    return (
        <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
            {isEditing ? (
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Edit Shop Profile</h1>
                    <p className="text-slate-500 mt-1">Update your business information.</p>
                </div>
            ) : null}

            {isEditing ? (
                <ShopProfileForm
                    initialData={shopData}
                    onSave={handleSave}
                    onCancel={() => setIsEditing(false)}
                />
            ) : (
                <ShopProfileView
                    data={shopData}
                    onEdit={() => setIsEditing(true)}
                />
            )}
        </div>
    );
}
