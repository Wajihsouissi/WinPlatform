
'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { User, Bell, Shield, Lock, Globe, Moon, Trash2, LogOut, Smartphone, Mail, AlertTriangle, Megaphone, CreditCard, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500 mt-1">Manage your account preferences and security.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Navigation Sidebar (Future: could be tabs) */}
                <div className="md:col-span-1 space-y-1">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-emerald-50 text-emerald-700 rounded-lg font-medium">
                        <User className="h-5 w-5" /> Account
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium transition-colors">
                        <Bell className="h-5 w-5" /> Notifications
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium transition-colors">
                        <Shield className="h-5 w-5" /> Privacy & Security
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-2 space-y-8">

                    {/* Business Management Links */}
                    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Link href="/partner/marketing" className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all group">
                            <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-3 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                <Megaphone className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-slate-900 group-hover:text-purple-700">Marketing</h3>
                            <p className="text-xs text-slate-500 mt-1">Push notifications & campaigns</p>
                        </Link>

                        <Link href="/partner/billing" className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all group">
                            <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <CreditCard className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-slate-900 group-hover:text-emerald-700">Billing</h3>
                            <p className="text-xs text-slate-500 mt-1">Manage subscription & invoices</p>
                        </Link>

                        <Link href="/partner/support" className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all group">
                            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <HelpCircle className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-slate-900 group-hover:text-blue-700">Support</h3>
                            <p className="text-xs text-slate-500 mt-1">Get help & tutorials</p>
                        </Link>
                    </section>

                    {/* Account Section */}
                    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                                <User className="h-5 w-5" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-900">Account Information</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                <div className="flex gap-2">
                                    <Input value="owner@deliciousburgers.tn" readOnly className="bg-slate-50" />
                                    <span className="inline-flex items-center px-3 py-1 rounded-md bg-emerald-100 text-emerald-700 text-xs font-semibold">Verified</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                                <Button variant="outline" className="w-full justify-start text-slate-600">
                                    <Lock className="h-4 w-4 mr-2" /> Change Password
                                </Button>
                            </div>
                        </div>
                    </section>

                    {/* Preferences Section */}
                    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                <Globe className="h-5 w-5" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-900">Regional Preferences</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Language</label>
                                <select className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500">
                                    <option>English</option>
                                    <option>Français</option>
                                    <option>العربية</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Time Zone</label>
                                <select className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500">
                                    <option>(GMT+01:00) Tunis</option>
                                    <option>(GMT+01:00) Paris</option>
                                    <option>(GMT+00:00) London</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Notifications Section */}
                    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                            <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                                <Bell className="h-5 w-5" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-900">Notifications</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                    <div>
                                        <p className="font-medium text-slate-900">Email Notifications</p>
                                        <p className="text-xs text-slate-500">Receive updates about new orders & deals.</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Smartphone className="h-5 w-5 text-slate-400" />
                                    <div>
                                        <p className="font-medium text-slate-900">Push Notifications</p>
                                        <p className="text-xs text-slate-500">Receive real-time alerts on your device.</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* Security Zone */}
                    <section className="bg-white rounded-2xl shadow-sm border border-red-100 p-6 space-y-6">
                        <div className="flex items-center gap-3 border-b border-red-50 pb-4">
                            <div className="p-2 bg-red-100 rounded-lg text-red-600">
                                <AlertTriangle className="h-5 w-5" />
                            </div>
                            <h2 className="text-lg font-bold text-red-900">Danger Zone</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-slate-900">Log Out</p>
                                    <p className="text-xs text-slate-500">Sign out of your account on this device.</p>
                                </div>
                                <Button variant="outline" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                                    <LogOut className="h-4 w-4 mr-2" /> Log Out
                                </Button>
                            </div>

                            <hr className="border-slate-100" />

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-red-600">Delete Account</p>
                                    <p className="text-xs text-slate-500">Permanently remove your account and all data.</p>
                                </div>
                                <Button variant="destructive" className="bg-red-50 text-red-600 hover:bg-red-100 border-red-100 hover:border-red-200 shadow-none">
                                    <Trash2 className="h-4 w-4 mr-2" /> Delete Account
                                </Button>
                            </div>
                        </div>
                    </section>

                    <div className="flex justify-center pt-8 pb-4 text-xs text-slate-400 gap-4">
                        <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
                        <span>•</span>
                        <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
