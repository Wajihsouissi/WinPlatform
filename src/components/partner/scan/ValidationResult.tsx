
import React from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ValidationResultProps {
    status: 'success' | 'error';
    message: string;
    ticket?: {
        dealTitle: string;
        customerName: string;
        discount: string;
        finalPrice: number;
        originalPrice: number;
    };
    onReset: () => void;
    onRedeem: () => void;
}

export function ValidationResult({ status, message, ticket, onReset, onRedeem }: ValidationResultProps) {
    const isSuccess = status === 'success';

    return (
        <div className="flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-300">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`mb-6 p-4 rounded-full ${isSuccess ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
            >
                {isSuccess ? <CheckCircle className="w-16 h-16" /> : <XCircle className="w-16 h-16" />}
            </motion.div>

            <h2 className={`text-2xl font-bold mb-2 ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
                {isSuccess ? 'Valid Ticket!' : 'Invalid Ticket'}
            </h2>

            <p className="text-slate-600 mb-8 max-w-xs mx-auto">
                {message}
            </p>

            {isSuccess && ticket && (
                <div className="w-full max-w-sm bg-white border border-slate-200 rounded-xl p-4 mb-8 shadow-sm">
                    <p className="text-sm text-slate-500 mb-1">Customer</p>
                    <p className="font-semibold text-slate-900 mb-3">{ticket.customerName}</p>

                    <div className="h-px bg-slate-100 my-2" />

                    <p className="text-sm text-slate-500 mb-1">Deal</p>
                    <p className="font-medium text-slate-900 line-clamp-2 mb-3">{ticket.dealTitle}</p>

                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                        <div>
                            <p className="text-xs text-slate-500">Collect Amount</p>
                            <p className="text-lg font-bold text-slate-900">{ticket.finalPrice.toFixed(2)} TND</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-slate-500 line-through">{ticket.originalPrice.toFixed(2)} TND</p>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                -{ticket.discount}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col w-full max-w-xs gap-3">
                {isSuccess ? (
                    <button
                        onClick={onRedeem}
                        className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                        Mark as Redeemed
                        <ArrowRight className="w-4 h-4" />
                    </button>
                ) : (
                    <button
                        onClick={onReset}
                        className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl shadow-sm transition-colors"
                    >
                        Try Again
                    </button>
                )}

                {isSuccess && (
                    <button
                        onClick={onReset}
                        className="w-full py-3 px-4 bg-white border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                    >
                        Scan Another
                    </button>
                )}
            </div>
        </div>
    );
}
