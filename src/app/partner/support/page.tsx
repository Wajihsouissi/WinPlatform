
'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, MessageCircle, Mail, Phone, ChevronDown, PlayCircle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SupportPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="text-center py-8">
                <h1 className="text-3xl font-bold text-slate-900">How can we help you?</h1>
                <p className="text-slate-500 mt-2">Search our knowledge base or get in touch with our team.</p>

                <div className="max-w-xl mx-auto mt-6 relative">
                    <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search for answers..."
                        className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { icon: BookOpen, title: 'Documentation', desc: 'Read guides and tutorials' },
                    { icon: PlayCircle, title: 'Video Tutorials', desc: 'Step-by-step walkthroughs' },
                    { icon: MessageCircle, title: 'Live Chat', desc: 'Chat with support agent' },
                ].map((item, i) => (
                    <button key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all text-left group">
                        <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 mb-4 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                            <item.icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* FAQs */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                    {[
                        "How do I create a flash deal?",
                        "How does the scan redemption work?",
                        "When do I get billed?",
                        "Can I add multiple branches?"
                    ].map((q, i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 flex justify-between items-center cursor-pointer hover:border-emerald-200 transition-colors">
                            <span className="font-medium text-slate-700 text-sm">{q}</span>
                            <ChevronDown className="h-4 w-4 text-slate-400" />
                        </div>
                    ))}
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Contact Support</h2>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Name</label>
                                <Input placeholder="Your name" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label>
                                <Input placeholder="your@email.com" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Subject</label>
                            <select className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:ring-emerald-500">
                                <option>Technical Issue</option>
                                <option>Billing Question</option>
                                <option>Feature Request</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Message</label>
                            <textarea className="w-full h-32 rounded-md border border-slate-200 p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none" placeholder="Describe your issue..." />
                        </div>
                        <Button className="w-full bg-slate-900 text-white hover:bg-slate-800">
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
