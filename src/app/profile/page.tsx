'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, MapPin, Edit2, Package, History, Heart, Store,
    Settings, Bell, Globe, HelpCircle, FileText, LogOut, ChevronRight, Share2
} from 'lucide-react';
import { mockUser } from '@/data/mockUser';
import { NotificationSettings } from '@/components/features/profile/NotificationSettings';
import { EditProfileModal } from '@/components/features/profile/EditProfileModal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState(mockUser);
    const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');
    const [showNotifications, setShowNotifications] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // mock language toggle
    const [language, setLanguage] = useState<'en' | 'fr'>('en');

    const stats = [
        { label: 'Points', value: user.stats.points, icon: '🏆', color: 'text-amber-500', bg: 'bg-amber-50' },
        { label: 'Active Orders', value: user.stats.activeOrders, icon: '📦', color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Saved Deals', value: user.stats.savedDeals, icon: '❤️', color: 'text-red-500', bg: 'bg-red-50' },
        { label: 'Following', value: user.stats.followedShops, icon: '🏪', color: 'text-purple-500', bg: 'bg-purple-50' },
    ];

    const menuItems = [
        { icon: Package, label: 'My Orders', sub: 'Track active & past orders', href: '/orders', color: 'text-blue-600' },
        { icon: Heart, label: 'Saved Deals', sub: 'Your wishlist', href: '/saved', color: 'text-red-600' },
        { icon: Store, label: 'Followed Shops', sub: 'Updates from your favorites', href: '/shops/following', color: 'text-purple-600' },
    ];

    const handleInvite = () => {
        // Mock share
        if (navigator.share) {
            navigator.share({
                title: 'Join WIN',
                text: 'Check out WIN app for amazing local deals!',
                url: 'https://win.app/invite/u1'
            });
        }
    };

    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Header / Hero */}
            <div className="bg-transparent border-b border-border">
                <div className="max-w-3xl mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="relative group">
                            <div className="h-24 w-24 md:h-28 md:w-28 rounded-full border-4 border-slate-50 overflow-hidden shadow-lg">
                                <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
                            </div>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="absolute bottom-0 right-0 p-2 bg-slate-900 text-white rounded-full shadow-md hover:scale-105 transition-transform"
                            >
                                <Edit2 className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
                            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 mt-1">
                                <span className="text-sm">{user.email}</span>
                                <span className="text-xs text-slate-300">•</span>
                                <div className="flex items-center gap-1 text-sm">
                                    <MapPin className="h-3 w-3" />
                                    {user.city}
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-center md:justify-start gap-4">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition-colors"
                                >
                                    Edit Profile
                                </button>
                                <button onClick={handleInvite} className="px-4 py-1.5 rounded-full border border-border text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2">
                                    <Share2 className="h-3 w-3" /> Invite Friend
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex flex-col items-center text-center"
                            >
                                <span className="text-2xl mb-1">{stat.icon}</span>
                                <span className="text-xl font-bold text-slate-900">{stat.value}</span>
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-6 space-y-6">

                {/* Main Menu Links */}
                <div className="space-y-3">
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider px-2">My Activity</h2>
                    {menuItems.map((item, idx) => (
                        <motion.button
                            key={item.label}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => router.push(item.href)}
                            className="w-full bg-white p-4 rounded-xl border border-border shadow-sm flex items-center gap-4 hover:border-slate-300 hover:shadow-md transition-all group"
                        >
                            <div className={`p-3 rounded-full ${item.color.replace('text-', 'bg-').replace('600', '50')} ${item.color}`}>
                                <item.icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 text-left">
                                <h3 className="font-bold text-slate-900 text-lg">{item.label}</h3>
                                <p className="text-sm text-slate-500">{item.sub}</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all" />
                        </motion.button>
                    ))}
                </div>

                {/* Settings Section */}
                <div className="space-y-3">
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider px-2">Settings & Preferences</h2>

                    {/* Notification Settings Toggle */}
                    <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                                    <Bell className="h-5 w-5" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-slate-900">Push Notifications</h3>
                                    <p className="text-xs text-slate-500">Manage your alerts & emails</p>
                                </div>
                            </div>
                            <ChevronRight className={`h-5 w-5 text-slate-400 transition-transform ${showNotifications ? 'rotate-90' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {showNotifications && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-slate-100 bg-slate-50/50"
                                >
                                    <div className="p-6">
                                        <NotificationSettings
                                            settings={user.notificationSettings}
                                            onSave={(newSettings) => setUser({ ...user, notificationSettings: newSettings })}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Language */}
                    <div className="bg-white p-4 rounded-xl border border-border shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <Globe className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">Language</h3>
                                <p className="text-xs text-slate-500">English / French</p>
                            </div>
                        </div>
                        <div className="flex bg-slate-100 p-1 rounded-full">
                            <button
                                onClick={() => setLanguage('en')}
                                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${language === 'en' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => setLanguage('fr')}
                                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${language === 'fr' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
                            >
                                FR
                            </button>
                        </div>
                    </div>
                </div>

                {/* Support & Legal */}
                <div className="space-y-2 pt-4">
                    <button onClick={() => router.push('/support')} className="w-full p-4 bg-white rounded-xl border border-border flex items-center gap-4 text-slate-700 hover:text-slate-900 hover:shadow-sm transition-all">
                        <HelpCircle className="h-5 w-5" />
                        <span className="font-medium">Help & Support</span>
                    </button>
                    <button onClick={() => router.push('/terms')} className="w-full p-4 bg-white rounded-xl border border-border flex items-center gap-4 text-slate-700 hover:text-slate-900 hover:shadow-sm transition-all">
                        <FileText className="h-5 w-5" />
                        <span className="font-medium">Terms & Privacy Policy</span>
                    </button>
                    <button className="w-full p-4 bg-white rounded-xl border border-red-100 flex items-center gap-4 text-red-600 hover:bg-red-50 hover:shadow-sm transition-all mt-6">
                        <LogOut className="h-5 w-5" />
                        <span className="font-bold">Log Out</span>
                    </button>
                </div>

                <div className="text-center text-xs text-slate-400 py-8">
                    Version 1.0.0 (Build 2024.1)
                </div>
            </div>

            <EditProfileModal
                user={user}
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                onSave={(updatedUser) => setUser(updatedUser)}
            />
        </div>
    );
}
