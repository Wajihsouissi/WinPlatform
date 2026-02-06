'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Deal } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { PriceTag } from './PriceTag';
import { CheckCircle, Loader2 } from 'lucide-react';

import { useCart } from '@/context/CartContext';

interface DealActionsProps {
    deal: Deal;
}

export function DealActions({ deal }: DealActionsProps) {
    const router = useRouter();
    const { addToCart } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [step, setStep] = useState<'summary' | 'processing' | 'success'>('summary');
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online'>('cash');

    const handleBuyNow = () => {
        setIsModalOpen(true);
        setStep('summary');
        setPaymentMethod('online'); // Default to online for "Buy Now" flow, though disabled
    };

    const handleReserve = () => {
        addToCart(deal);
        router.push('/orders');
    };

    const handleConfirmOrder = () => {
        setStep('processing');
        // Simulate API call
        setTimeout(() => {
            setStep('success');
        }, 1500);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        if (step === 'success') {
            setStep('summary');
            router.push('/orders');
        }
    };

    return (
        <>
            <div className="mt-auto pt-6">
                <button
                    onClick={handleReserve}
                    className="w-full rounded-xl bg-[#0a1045] py-4 text-white font-bold text-lg shadow-lg hover:bg-[#0a1045]/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    <span className="font-normal opacity-90">Reserve for</span>
                    <span>TND {deal.newPrice.toFixed(2)}</span>
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleClose} title={step === 'success' ? '' : 'Checkout'}>
                {step === 'summary' && (
                    <div className="space-y-6">
                        {/* ... (Deal Product Info) ... */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-4">
                            <img src={deal.imageUrl} alt="" className="h-16 w-16 rounded-lg object-cover" />
                            <div>
                                <p className="font-bold text-slate-900 line-clamp-1">{deal.title}</p>
                                <p className="text-sm text-slate-500">{deal.storeName}</p>
                                <PriceTag oldPrice={deal.oldPrice} newPrice={deal.newPrice} size="sm" className="mt-1" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-medium text-slate-900">Payment Method</p>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setPaymentMethod('cash')}
                                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${paymentMethod === 'cash' ? 'border-green-500 bg-green-50 text-green-700 ring-2 ring-green-500/20' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                                >
                                    <span className="block font-bold mb-0.5">Cash on Delivery</span>
                                    <span className="text-xs opacity-80">(Pay at Store)</span>
                                </button>
                                <button
                                    className={`p-3 rounded-lg border text-sm font-medium transition-all flex flex-col items-center justify-center opacity-70 cursor-not-allowed bg-slate-50 border-slate-200 text-slate-400`}
                                    disabled
                                >
                                    <span className="block font-bold mb-0.5">Online Payment</span>
                                    <span className="text-xs">(Coming Soon)</span>
                                </button>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex justify-between items-center mb-6">
                                <span className="font-bold text-slate-900">Total</span>
                                <span className="font-extrabold text-xl text-green-700">{deal.newPrice.toFixed(2)} TND</span>
                            </div>
                            <button
                                onClick={handleConfirmOrder}
                                className="w-full rounded-xl bg-green-600 py-3 text-white font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/20"
                            >
                                {paymentMethod === 'cash' ? 'Confirm Reservation' : 'Confirm Order'}
                            </button>
                        </div>
                    </div>
                )}
                {step === 'processing' && (
                    <div className="py-12 flex flex-col items-center justify-center text-center">
                        <Loader2 className="h-10 w-10 text-green-600 animate-spin mb-4" />
                        <p className="font-medium text-slate-900">Processing your request...</p>
                    </div>
                )}


                {step === 'success' && (
                    <div className="py-8 flex flex-col items-center justify-center text-center animate-in zoom-in-95">
                        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                            <CheckCircle className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Order Confirmed!</h3>
                        <p className="text-slate-500 max-w-[250px] mx-auto mb-8">
                            Your QR code is ready. Show it at the store to redeem your deal.
                        </p>
                        <button
                            onClick={handleClose} // Should redirect to orders
                            className="w-full rounded-xl bg-slate-900 py-3 text-white font-bold hover:bg-slate-800 transition-all"
                        >
                            View My Orders
                        </button>
                    </div>
                )}
            </Modal>
        </>
    );
}
