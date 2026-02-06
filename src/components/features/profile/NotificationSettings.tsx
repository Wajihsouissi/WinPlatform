'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Clock, Zap, ShoppingBag, Calendar, Mail, Check } from 'lucide-react';
import { NotificationSettings as SettingsType } from '@/types';

// Simple Toggle Component if not exists
function SimpleToggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <button
            onClick={() => onChange(!checked)}
            className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${checked ? 'bg-[#ff385c]' : 'bg-slate-200'}`}
        >
            <motion.div
                className="bg-white h-4 w-4 rounded-full shadow-sm"
                animate={{ x: checked ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
        </button>
    );
}

interface Props {
    settings: SettingsType;
    onSave: (newSettings: SettingsType) => void;
}

export function NotificationSettings({ settings, onSave }: Props) {
    const [localSettings, setLocalSettings] = useState(settings);
    const [isSaving, setIsSaving] = useState(false);

    const handleToggle = (key: keyof SettingsType) => {
        setLocalSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            onSave(localSettings);
            setIsSaving(false);
        }, 800);
    };

    const items = [
        { key: 'newDeals', label: 'New Deals from Followed Shops', icon: Bell, desc: 'Get notified when your favorite places post a new deal.' },
        { key: 'expiringSoon', label: 'Deals Expiring Soon', icon: Clock, desc: 'Reminder 24h before your saved deals expire.' },
        { key: 'flashDeals', label: 'Flash Deals Nearby', icon: Zap, desc: 'Instant alerts for high-value deals within 2km.' },
        { key: 'orderReminders', label: 'Order Reminders', icon: ShoppingBag, desc: 'Updates on your order status and pickup times.' },
        { key: 'weeklySummary', label: 'Weekly Summary', icon: Calendar, desc: 'A digest of your savings and activity this week.' },
        { key: 'promotionalThemails', label: 'Promotional Emails', icon: Mail, desc: 'Occasional news about updates and special campaigns.' },
    ] as const;

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-white rounded-lg shadow-sm text-slate-600">
                                <item.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">{item.label}</h3>
                                <p className="text-sm text-slate-500 max-w-[250px] sm:max-w-md leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                        <SimpleToggle
                            checked={localSettings[item.key]}
                            onChange={() => handleToggle(item.key)}
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-4">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-[#222] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
                >
                    {isSaving ? (
                        <>Saving...</>
                    ) : (
                        <>Save Changes</>
                    )}
                </button>
            </div>
        </div>
    );
}
