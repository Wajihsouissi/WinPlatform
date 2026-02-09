
'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Clock, Edit3, Store, CheckVerified } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface ShopProfile {
    name: string;
    description: string;
    logoUrl: string;
    coverUrl: string;
    address: string;
    phone: string;
    email: string;
    category: string;
    workingHours: {
        [key: string]: { open: string; close: string; closed: boolean };
    };
    socialLinks: { facebook?: string; instagram?: string; website?: string };
}

interface ShopProfileViewProps {
    data: ShopProfile;
    onEdit: () => void;
}

export function ShopProfileView({ data, onEdit }: ShopProfileViewProps) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <div className="bg-slate-50 min-h-screen -m-6 md:-m-8">
            {/* Hero Cover Section */}
            <div className="relative h-64 md:h-80 w-full bg-slate-200 group">
                {data.coverUrl ? (
                    <Image
                        src={data.coverUrl}
                        alt="Cover"
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-slate-400 bg-slate-200/50">
                        <span className="flex items-center gap-2">
                            Add a cover photo to showcase your brand
                        </span>
                    </div>
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Global Actions (Edit/Manage) */}
                <div className="absolute top-6 right-6 flex gap-3 z-20">
                    <Link href="/partner/shop/branches">
                        <Button
                            variant="secondary"
                            className="bg-white/90 hover:bg-white text-slate-800 backdrop-blur-md shadow-sm border-0"
                            size="sm"
                        >
                            <Store className="h-4 w-4 mr-2 text-emerald-600" />
                            Manage Branches
                        </Button>
                    </Link>
                    <Button
                        onClick={onEdit}
                        variant="secondary"
                        className="bg-white/90 hover:bg-white text-slate-800 backdrop-blur-md shadow-sm border-0"
                        size="sm"
                    >
                        <Edit3 className="h-4 w-4 mr-2 text-emerald-600" />
                        Edit Profile
                    </Button>
                </div>
            </div>

            {/* Profile Info Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                {/* Header Information (Overlapping) */}
                <div className="relative -mt-20 sm:-mt-24 mb-10 flex flex-col md:flex-row items-end md:items-end gap-6 pb-6 border-b border-slate-200">
                    {/* Logo/Avatar */}
                    <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-3xl border-[6px] border-white bg-white shadow-xl overflow-hidden flex-shrink-0 z-10">
                        {data.logoUrl ? (
                            <Image
                                src={data.logoUrl}
                                alt="Logo"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full bg-slate-100 text-slate-400 font-bold text-4xl">
                                {data.name.charAt(0)}
                            </div>
                        )}
                    </div>

                    {/* Text Info */}
                    <div className="flex-1 mb-2 text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center md:justify-start gap-2">
                            {data.name}
                            {/* Verified Badge Mockup */}
                            <div className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center p-1" title="Verified Partner">
                                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                        </h1>
                        <div className="flex items-center justify-center md:justify-start gap-3 mt-2 text-slate-600 font-medium">
                            <span className="bg-slate-200/80 px-3 py-1 rounded-full text-slate-700 text-xs uppercase tracking-wide">
                                {data.category}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 text-slate-400" />
                                {data.address}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Sidebar (Sticky) */}
                    <div className="lg:col-span-1 space-y-6 self-start lg:sticky lg:top-24">
                        {/* Contact Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 overflow-hidden">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                Contact Info
                            </h3>
                            <div className="space-y-4">
                                {data.phone && (
                                    <div className="flex items-center gap-4 group">
                                        <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium uppercase">Phone</p>
                                            <p className="text-slate-800 font-medium">{data.phone}</p>
                                        </div>
                                    </div>
                                )}
                                {data.email && (
                                    <div className="flex items-center gap-4 group">
                                        <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-xs text-slate-500 font-medium uppercase">Email</p>
                                            <p className="text-slate-800 font-medium truncate">{data.email}</p>
                                        </div>
                                    </div>
                                )}
                                {(data.socialLinks?.website || data.socialLinks?.facebook) && (
                                    <div className="flex items-center gap-4 group">
                                        <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                                            <Globe className="h-5 w-5" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-xs text-slate-500 font-medium uppercase">Online</p>
                                            <a href={data.socialLinks.website} target="_blank" className="text-emerald-600 font-medium hover:underline truncate block">
                                                {data.socialLinks.website?.replace(/^https?:\/\//, '') || 'Visit Website'}
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Hours Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                Opening Hours
                            </h3>
                            <div className="space-y-3">
                                {days.map(day => {
                                    const hours = data.workingHours[day];
                                    if (!hours) return null;
                                    const isToday = new Date().toLocaleDateString('en-US', { weekday: 'long' }) === day;

                                    return (
                                        <div key={day} className={cn(
                                            "flex justify-between items-center text-sm p-2 rounded-lg transition-colors",
                                            isToday ? "bg-emerald-50 border border-emerald-100/50" : "hover:bg-slate-50"
                                        )}>
                                            <span className={cn("font-medium", isToday ? "text-emerald-700" : "text-slate-500")}>
                                                {day}
                                                {isToday && <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-200 text-emerald-800 uppercase tracking-wide">Today</span>}
                                            </span>
                                            <span className={cn("font-medium", hours.closed ? "text-slate-400 italic" : "text-slate-900")}>
                                                {hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Main Content) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">About Us</h2>
                            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                                {data.description || (
                                    <p className="text-slate-400 italic">Tell your customers about your story, your products, and what makes you unique.</p>
                                )}
                            </div>
                        </div>

                        {/* Map Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Location</h2>
                            <div className="h-80 bg-slate-100 rounded-xl relative overflow-hidden border border-slate-200 flex items-center justify-center group cursor-pointer transition-colors hover:border-emerald-200">
                                <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Tunis&zoom=13&size=600x300&sensor=false')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500" />
                                <div className="relative z-10 flex flex-col items-center gap-3">
                                    <div className="h-16 w-16 rounded-full bg-white shadow-lg flex items-center justify-center text-emerald-600 animate-bounce">
                                        <MapPin className="h-8 w-8 fill-current" />
                                    </div>
                                    <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-slate-900 shadow-sm border border-slate-200">
                                        View on Google Maps
                                    </span>
                                </div>
                            </div>
                            <div className="mt-6 flex items-start gap-4">
                                <div className="h-10 w-10 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-slate-900">{data.address}</p>
                                    <p className="text-slate-500">Tunis, Tunisia</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Metrics Placeholders (Future) */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                                { label: 'Active Deals', value: '12', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                                { label: 'Total Redemptions', value: '1,284', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                                { label: 'Rating', value: '4.8', color: 'text-amber-500', bg: 'bg-amber-50' },
                                { label: 'Profile Views', value: '3.4k', color: 'text-blue-600', bg: 'bg-blue-50' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                                    <span className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</span>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
