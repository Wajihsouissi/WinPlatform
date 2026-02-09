'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-[#1a1a1a] text-white py-16">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h4 className="font-bold text-lg mb-4 text-white">Contact</h4>
                    <ul className="space-y-2 text-slate-400 text-sm">
                        <li><Link href="#" className="hover:text-white">Help & Support</Link></li>
                        <li><Link href="#" className="hover:text-white">Press</Link></li>
                        <li><Link href="#" className="hover:text-white">Careers</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-4 text-white">Company</h4>
                    <ul className="space-y-2 text-slate-400 text-sm">
                        <li><Link href="#" className="hover:text-white">About Us</Link></li>
                        <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-4 text-white">Partners</h4>
                    <ul className="space-y-2 text-slate-400 text-sm">
                        <li><Link href="#" className="hover:text-white">For Business</Link></li>
                        <li><Link href="#" className="hover:text-white">Advertising</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-4 text-white">Social</h4>
                    <ul className="space-y-2 text-slate-400 text-sm">
                        <li><Link href="#" className="hover:text-white">Instagram</Link></li>
                        <li><Link href="#" className="hover:text-white">Twitter</Link></li>
                        <li><Link href="#" className="hover:text-white">TikTok</Link></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs">
                <p>&copy; {new Date().getFullYear()} WIN Platform. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <span>Privacy</span>
                    <span>Cookie Policy</span>
                </div>
            </div>
        </footer>
    );
}
