'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MapPin, Clock, Calendar, CheckCircle2, X, Wallet, ArrowRight, Trash2, QrCode, History, RotateCcw, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCart, CartItem } from '@/context/CartContext';
import { ReservationTimer } from '@/components/features/orders/ReservationTimer';
import { TicketModal } from '@/components/features/orders/TicketModal';

type OrderTab = 'all' | 'pending' | 'paid' | 'redeemed';

export default function OrdersPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { removeFromCart, cartItems, markStoreAsPaid, reorderItem } = useCart();
    const [selectedOrder, setSelectedOrder] = useState<CartItem | null>(null);
    const [activeTab, setActiveTab] = useState<OrderTab>('all');

    // Handle payment success
    useEffect(() => {
        const paymentSuccess = searchParams.get('payment_success');
        const storeName = searchParams.get('store');

        // If we just paid, find the item(s) and redirect to the first one's ticket
        // In a real app we'd have a batch order ID, but for now let's just pick one or go to orders
        if (paymentSuccess && storeName) {
            markStoreAsPaid(storeName);
            // We need to wait for state update or assume logic happens
            // For better UX, let's find the items we just paid for from the updated cart
            // But since state update is async, we'll just go to orders for now, or maybe the user wants to see the ticket immediately
            router.replace('/orders?tab=paid');
        }
    }, [searchParams, markStoreAsPaid, router]);

    // Sorting Helper
    const sortItems = (items: CartItem[]) => {
        // Sort by status priority then distance
        return [...items].sort((a, b) => {
            // Primary Sort: Distance
            if (a.distanceKm !== b.distanceKm) return a.distanceKm - b.distanceKm;
            return 0;
        });
    };

    // Filter Items
    const getFilteredItems = () => {
        let items = cartItems;
        if (activeTab === 'pending') items = cartItems.filter(i => i.status === 'PENDING');
        if (activeTab === 'paid') items = cartItems.filter(i => i.status === 'PAID');
        if (activeTab === 'redeemed') items = cartItems.filter(i => i.status === 'REDEEMED' || i.status === 'EXPIRED');

        return sortItems(items);
    };

    // Grouping for "Pending" and "Paid" view (to show store headers)
    const groupedItems = () => {
        const items = getFilteredItems();
        const groups: Record<string, CartItem[]> = {};
        items.forEach(item => {
            // Only group for non-redeemed views usually, but let's keep consistent
            if (!groups[item.storeName]) groups[item.storeName] = [];
            groups[item.storeName].push(item);
        });
        return groups;
    };

    const handleCheckoutStore = (storeName: string, items: CartItem[]) => {
        if (items.length > 0) {
            router.push(`/checkout?store=${encodeURIComponent(storeName)}`);
        }
    };

    const handleReorder = (item: CartItem) => {
        reorderItem(item);
        setActiveTab('pending');
    };

    const handleExport = (item: CartItem) => {
        alert(`Downloading receipt for order ${item.orderNumber || item.cartItemId}...`);
    };

    const handleViewTicket = (item: CartItem) => {
        setSelectedOrder(item);
        // Previously router.push(`/orders/ticket/${item.cartItemId}`);
        // Now using inline modal
    };

    const filteredGroups = groupedItems();
    const hasItems = Object.keys(filteredGroups).length > 0;

    return (
        <div className="min-h-screen bg-slate-50 pb-24 pt-6 px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                    <span className="text-[#0EA5E9]">
                        <ShoppingBagIcon />
                    </span>
                    My Orders
                </h1>

                {/* Tabs */}
                <div className="flex p-1 bg-white rounded-xl border border-slate-200 shadow-sm mb-8 overflow-x-auto no-scrollbar">
                    <TabButton active={activeTab === 'all'} onClick={() => setActiveTab('all')} label="All" />
                    <TabButton active={activeTab === 'pending'} onClick={() => setActiveTab('pending')} label="Pending" count={cartItems.filter(i => i.status === 'PENDING').length} />
                    <TabButton active={activeTab === 'paid'} onClick={() => setActiveTab('paid')} label="Active" count={cartItems.filter(i => i.status === 'PAID').length} />
                    <TabButton active={activeTab === 'redeemed'} onClick={() => setActiveTab('redeemed')} label="History" />
                </div>

                {!hasItems ? (
                    <div className="text-center py-20 opacity-50">
                        <ShoppingBagIcon className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                        <h2 className="text-xl font-bold text-slate-900">No orders found</h2>
                        <p className="text-slate-500 mt-2">Check other tabs or reserve some deals!</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* History View (Redeemed/Expired) uses a different layout */}
                        {activeTab === 'redeemed' ? (
                            <div className="space-y-4">
                                {getFilteredItems().map(item => (
                                    <div key={item.cartItemId} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-5 hover:shadow-md transition-shadow">
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded uppercase tracking-wider">
                                                    {item.orderNumber || 'Legacy Order'}
                                                </span>
                                                <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${item.status === 'REDEEMED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
                                            <p className="text-sm text-slate-500 font-medium mb-1">{item.storeName}</p>
                                            <div className="text-xs text-slate-400 mb-3">
                                                {item.redeemedAt ? `Redeemed on ${new Date(item.redeemedAt).toLocaleDateString()}` : `Expired on ${new Date(item.expiresAt).toLocaleDateString()}`}
                                            </div>
                                            <div className="flex items-center gap-4 mt-2">
                                                <button onClick={() => handleReorder(item)} className="text-sm font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
                                                    <RotateCcw className="h-4 w-4" /> Reorder
                                                </button>
                                                <button onClick={() => handleExport(item)} className="text-sm font-bold text-slate-500 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
                                                    <Download className="h-4 w-4" /> Receipt
                                                </button>
                                            </div>
                                        </div>
                                        <div className="md:text-right flex md:flex-col justify-between items-end">
                                            <div className="text-right">
                                                <span className="block text-xs text-slate-400">Total Paid</span>
                                                <span className="font-black text-slate-900 text-xl">TND {item.newPrice.toFixed(2)}</span>
                                            </div>
                                            <div className="text-right mt-2 md:mt-0">
                                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                                                    Saved TND {(item.oldPrice - item.newPrice).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Standard Grouped View for Pending/Paid/All */
                            Object.entries(filteredGroups).map(([storeName, items]) => {
                                const isPendingGroup = items.some(i => i.status === 'PENDING');
                                const total = items.reduce((sum, item) => sum + item.newPrice, 0);

                                return (
                                    <div key={storeName} className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className={cn("border-b", isPendingGroup ? "border-slate-50 bg-white" : "border-green-50 bg-green-50/30")}>
                                            <StoreHeader storeName={storeName} items={items} isPaid={!isPendingGroup} />
                                        </div>

                                        <div className="divide-y divide-slate-50">
                                            {items.map(item => (
                                                <OrderItem
                                                    key={item.cartItemId}
                                                    item={item}
                                                    onRemove={() => removeFromCart(item.cartItemId)}
                                                    isPaid={item.status === 'PAID'}
                                                    onViewQr={() => handleViewTicket(item)}
                                                />
                                            ))}
                                        </div>

                                        {isPendingGroup && (
                                            <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between gap-4">
                                                <div>
                                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total to Pay</span>
                                                    <span className="text-2xl font-black text-[#0a1045]">TND {total.toFixed(2)}</span>
                                                </div>
                                                <button
                                                    onClick={() => handleCheckoutStore(storeName, items)}
                                                    className="bg-[#0a1045] hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-lg shadow-slate-200 transition-all flex items-center gap-2 active:scale-95"
                                                >
                                                    <span>Checkout</span>
                                                    <ArrowRight className="h-5 w-5" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
            </div>

            {/* Ticket Modal */}
            <TicketModal
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
            />
        </div>
    );
}

// Helper Components

function TabButton({ active, onClick, label, count }: { active: boolean, onClick: () => void, label: string, count?: number }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex-1 px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex items-center justify-center gap-2",
                active ? "bg-[#0a1045] text-white shadow-md" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
        >
            {label}
            {count !== undefined && count > 0 && (
                <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full", active ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600")}>
                    {count}
                </span>
            )}
        </button>
    );
}

import Link from 'next/link';
import { Store } from 'lucide-react';

function StoreHeader({ storeName, items, isPaid }: { storeName: string, items: CartItem[], isPaid?: boolean }) {
    return (
        <div className="p-6 flex items-center justify-between">
            <Link href={`/store/${encodeURIComponent(storeName)}`} className="flex items-center gap-4 group cursor-pointer">
                <div className={cn(
                    "h-12 w-12 rounded-2xl font-bold text-xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-105",
                    isPaid ? "bg-green-100 text-green-700" : "bg-white text-slate-900"
                )}>
                    {storeName.charAt(0)}
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-[#0a1045] group-hover:underline decoration-2 underline-offset-2 transition-colors">{storeName}</h3>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mt-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {items[0].distanceKm} km away
                    </div>
                </div>
            </Link>
            <span className={cn(
                "text-xs font-bold px-3 py-1.5 rounded-full border shadow-sm",
                isPaid ? "bg-green-100 text-green-800 border-green-200" : "bg-white text-slate-500 border-slate-200"
            )}>
                {items.length} item{items.length > 1 ? 's' : ''}
            </span>
        </div>
    );
}

function OrderItem({ item, onRemove, isPaid, onViewQr }: { item: CartItem, onRemove?: () => void, isPaid?: boolean, onViewQr?: () => void }) {
    if (item.status === 'REDEEMED' || item.status === 'EXPIRED') return null; // These are shown in History tab

    return (
        <div className="p-6 flex gap-5 hover:bg-slate-50 transition-colors group">
            <div className="h-20 w-20 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 relative">
                <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 min-w-0 py-1">
                <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-900 text-lg line-clamp-1">{item.title}</h4>
                    <div className="text-right">
                        <span className="block font-bold text-[#0a1045] text-lg">TND {item.newPrice.toFixed(2)}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                    {isPaid ? (
                        <div className="flex items-center justify-between w-full">
                            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-lg tracking-wider uppercase flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" /> Paid
                            </span>
                            <button
                                onClick={onViewQr}
                                className="flex items-center gap-1.5 text-xs font-bold text-[#0EA5E9] bg-sky-50 px-3 py-1.5 rounded-lg hover:bg-sky-100 transition-colors"
                            >
                                <QrCode className="h-3.5 w-3.5" />
                                View QR Code
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                <span className="inline-block bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-lg tracking-wider uppercase">
                                    <Clock className="h-3 w-3 inline mr-1" /> Pending
                                </span>
                                {item.reservedAt && (
                                    <ReservationTimer reservedAt={item.reservedAt} />
                                )}
                            </div>
                            <button
                                onClick={onRemove}
                                className="text-slate-400 hover:text-red-500 p-2 -mr-2 transition-colors"
                                title="Remove item"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ShoppingBagIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
    )
}
