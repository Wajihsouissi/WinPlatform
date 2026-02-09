
'use client';

import React from 'react';
import { Bell, Check, Trash2, Clock, UserPlus, Tag, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const NOTIFICATIONS = [
    {
        id: 1,
        type: 'follow',
        title: 'New Follower',
        message: 'Mohamed Ali started following your shop.',
        time: '2 mins ago',
        read: false,
        icon: UserPlus,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50'
    },
    {
        id: 2,
        type: 'expiry',
        title: 'Deal Expiring Soon',
        message: 'Your "Summer Burger Special" expires in 24 hours.',
        time: '1 hour ago',
        read: false,
        icon: Clock,
        color: 'text-amber-600',
        bg: 'bg-amber-50'
    },
    {
        id: 3,
        type: 'system',
        title: 'System Update',
        message: 'We have updated our terms of service.',
        time: '1 day ago',
        read: true,
        icon: ShieldCheck,
        color: 'text-blue-600',
        bg: 'bg-blue-50'
    },
    {
        id: 4,
        type: 'soldout',
        title: 'Deal Sold Out',
        message: '"Lunch Combo" has reached its redemption limit.',
        time: '2 days ago',
        read: true,
        icon: Tag,
        color: 'text-slate-600',
        bg: 'bg-slate-100'
    },
];

export default function NotificationsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
                    <p className="text-slate-500 mt-1">Stay updated with your shop activities.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="text-slate-600">
                        <Check className="h-4 w-4 mr-2" /> Mark all read
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="divide-y divide-slate-100">
                    {NOTIFICATIONS.map((notif) => (
                        <div
                            key={notif.id}
                            className={cn(
                                "p-4 hover:bg-slate-50 transition-colors flex gap-4 items-start cursor-pointer",
                                !notif.read && "bg-emerald-50/30"
                            )}
                        >
                            <div className={cn("h-10 w-10 rounded-full flex items-center justify-center shrink-0", notif.bg, notif.color)}>
                                <notif.icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h3 className={cn("text-sm font-semibold", notif.read ? "text-slate-900" : "text-slate-900")}>
                                        {notif.title}
                                        {!notif.read && <span className="ml-2 inline-block w-2 h-2 rounded-full bg-emerald-500" />}
                                    </h3>
                                    <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{notif.time}</span>
                                </div>
                                <p className="text-sm text-slate-600 mt-0.5">{notif.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {NOTIFICATIONS.length === 0 && (
                    <div className="p-12 text-center text-slate-400">
                        <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
                        <p>No notifications yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
