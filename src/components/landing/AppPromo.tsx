'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

export function AppPromo() {
    return (
        <section className="py-20 bg-gradient-to-r from-emerald-50 to-teal-50 mt-12">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-6 text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                        Exclusive Giveaways, <br />
                        Personalized Offers and <br />
                        more? <span className="text-emerald-600">App it!</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-lg">
                        Get the full experience on your phone. Unlock location-based deals and never miss a discount nearby.
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-4 pt-4">
                        <button className="hover:opacity-80 transition-opacity">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-12" />
                        </button>
                        <button className="hover:opacity-80 transition-opacity">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-12" />
                        </button>
                    </div>
                    {/* QR Code Placeholder */}
                    <div className="hidden md:flex items-center gap-4 mt-8 bg-white p-4 rounded-xl shadow-sm w-fit">
                        <div className="w-20 h-20 bg-slate-900 rounded-lg flex items-center justify-center text-white text-xs">QR</div>
                        <div className="text-sm font-medium text-slate-600">Scan to get <br /> the app now</div>
                    </div>
                </div>
                <div className="flex-1 relative">
                    <div className="relative w-[300px] h-[600px] bg-slate-900 rounded-[3rem] shadow-2xl mx-auto border-8 border-slate-900 overflow-hidden">
                        <div className="absolute top-0 w-full h-full bg-white flex flex-col">
                            <div className="h-full w-full bg-slate-100 flex items-center justify-center text-slate-300 font-bold">
                                App Mockup
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
