'use client';

import React from 'react';
import {
    Tag,
    Eye,
    Ticket,
    CheckCircle,
    Heart,
    Bell,
    MoreHorizontal
} from 'lucide-react';
import { PartnerStatsCard } from '@/components/partner/PartnerStatsCard';
import { PartnerQuickActions } from '@/components/partner/PartnerQuickActions';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

// Utility for conditional classes
function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
}

export default function PartnerDashboard() {
    const router = useRouter(); // Initialize router

    // Mock data
    const shopName = "Delicious Burgers";
    const accountStatus = "Active"; // Trial, Active, Expired
    const urgentNotifications = 2;

    // Stats data
    const stats: {
        title: string;
        value: string | number;
        icon: any; // Using any for simplicity with Lucide icons
        trend: {
            value: number;
            isPositive: boolean;
            label: string;
        };
    }[] = [
            {
                title: "Active Deals",
                value: 3,
                icon: Tag,
                trend: { value: 1, isPositive: true, label: "this week" }
            },
            {
                title: "Total Views",
                value: "1,245",
                icon: Eye,
                trend: { value: 12, isPositive: true, label: "vs last week" }
            },
            {
                title: "Total Claims",
                value: 85,
                icon: Ticket,
                trend: { value: 5, isPositive: true, label: "today" }
            },
            {
                title: "Total Redemptions",
                value: 42,
                icon: CheckCircle,
                trend: { value: 8, isPositive: true, label: "vs last week" }
            },
            {
                title: "Saved by Users",
                value: 156,
                icon: Heart,
                trend: { value: 24, isPositive: true, label: "this month" }
            }
        ];

    // Deals data
    const activeDeals = [
        {
            id: 1,
            title: "50% Off Combo Meal",
            views: 450,
            claims: 32,
            status: "Active",
            expires: "2 days left"
        },
        {
            id: 2,
            title: "Buy 1 Get 1 Free",
            views: 210,
            claims: 15,
            status: "Active",
            expires: "5 days left"
        },
        {
            id: 3,
            title: "Free Drink with Burger",
            views: 125,
            claims: 8,
            status: "Ending Soon",
            expires: "12 hours left"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Hi, {shopName}! 👋</h1>
                    <p className="text-slate-500 mt-1">Here's what's happening with your deals today.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-100">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        {accountStatus} Plan
                    </div>

                    <Button variant="outline" size="icon" className="relative h-10 w-10">
                        <Bell className="h-5 w-5 text-slate-600" />
                        {urgentNotifications > 0 && (
                            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-[10px] items-center justify-center flex text-white border-2 border-white font-bold">
                                {urgentNotifications}
                            </span>
                        )}
                    </Button>
                </div>
            </div>

            {/* Quick Actions */}
            <PartnerQuickActions
                onScanQr={() => console.log('Scan QR clicked')}
            />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {stats.map((stat, index) => (
                    <PartnerStatsCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                        trend={stat.trend}
                    />
                ))}
            </div>

            {/* Active Deals Preview */}
            <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Active Deals</h2>
                    <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                        View All
                    </Button>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Deal Name</th>
                                    <th className="px-6 py-4 font-medium">Views</th>
                                    <th className="px-6 py-4 font-medium">Claims</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {activeDeals.map((deal) => (
                                    <tr key={deal.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {deal.title}
                                            <div className="text-xs text-slate-400 font-normal mt-0.5">{deal.expires}</div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{deal.views}</td>
                                        <td className="px-6 py-4 text-slate-600">{deal.claims}</td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-2.5 py-1 rounded-full text-xs font-medium",
                                                deal.status === "Active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                                            )}>
                                                {deal.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
