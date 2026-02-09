import React from 'react';
import { Eye, Ticket, CheckCircle, MoreVertical, Calendar, TrendingUp, Edit3, Trash2, Copy, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface Deal {
    id: string;
    title: string;
    image: string;
    discountedPrice: number;
    originalPrice: number;
    views: number;
    claims: number;
    redemptions: number;
    quantity: number;
    status: 'Active' | 'Scheduled' | 'Expired' | 'Draft' | 'Sold Out';
    validUntil: string;
}

interface DealCardProps {
    deal: Deal;
    onDelete: (id: string) => void;
    onDuplicate: (id: string) => void;
    onExtend: (id: string) => void;
    onEdit: (id: string) => void;
    onAnalytics?: (id: string) => void;
}

export function DealCard({ deal, onDelete, onDuplicate, onExtend, onEdit, onAnalytics }: DealCardProps) {
    const discountPercentage = Math.round(((deal.originalPrice - deal.discountedPrice) / deal.originalPrice) * 100);

    const getStatusColor = (status: Deal['status']) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-700 border-green-200';
            case 'Scheduled': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Expired': return 'bg-slate-100 text-slate-700 border-slate-200';
            case 'Draft': return 'bg-gray-100 text-gray-700 border-gray-200';
            case 'Sold Out': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const [showMenu, setShowMenu] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="relative w-full md:w-48 h-48 md:h-auto shrink-0">
                <Image
                    src={deal.image || '/placeholder-deal.jpg'}
                    alt={deal.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-2 left-2">
                    <span className={cn("px-2.5 py-1 rounded-full text-xs font-bold border", getStatusColor(deal.status))}>
                        {deal.status}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{deal.title}</h3>
                            <div className="flex items-baseline gap-2 mt-1">
                                <span className="text-xl font-bold text-indigo-600">{deal.discountedPrice} TND</span>
                                <span className="text-sm text-slate-400 line-through">{deal.originalPrice} TND</span>
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                                    {discountPercentage}% OFF
                                </span>
                            </div>
                        </div>

                        {/* Actions Dropdown */}
                        <div className="relative" ref={menuRef}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600" onClick={() => setShowMenu(!showMenu)}>
                                <MoreVertical className="h-4 w-4" />
                            </Button>

                            {showMenu && (
                                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl border border-slate-100 z-10 py-1 animate-in fade-in zoom-in-95 duration-200">
                                    <button onClick={() => { onEdit(deal.id); setShowMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                        <Edit3 className="h-4 w-4 text-slate-400" /> Edit Deal
                                    </button>
                                    <button onClick={() => onDuplicate(deal.id)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                        <Copy className="h-4 w-4 text-slate-400" /> Duplicate
                                    </button>
                                    <button onClick={() => onExtend(deal.id)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                        <RefreshCw className="h-4 w-4 text-slate-400" /> Extend Expiry
                                    </button>
                                    <div className="h-px bg-slate-100 my-1"></div>
                                    <button onClick={() => onDelete(deal.id)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                        <Trash2 className="h-4 w-4" /> Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className="text-center p-2 bg-slate-50 rounded-lg">
                            <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
                                <Eye className="h-3 w-3" />
                                <span className="text-[10px] uppercase font-bold tracking-wider">Views</span>
                            </div>
                            <span className="font-bold text-slate-700">{deal.views}</span>
                        </div>
                        <div className="text-center p-2 bg-slate-50 rounded-lg">
                            <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
                                <Ticket className="h-3 w-3" />
                                <span className="text-[10px] uppercase font-bold tracking-wider">Claims</span>
                            </div>
                            <span className="font-bold text-slate-700">{deal.claims}</span>
                        </div>
                        <div className="text-center p-2 bg-slate-50 rounded-lg">
                            <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
                                <CheckCircle className="h-3 w-3" />
                                <span className="text-[10px] uppercase font-bold tracking-wider">Redeemed</span>
                            </div>
                            <span className="font-bold text-slate-700">{deal.redemptions}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Calendar className="h-3 w-3" />
                        <span>Expires: {new Date(deal.validUntil).toLocaleDateString()}</span>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs gap-1"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAnalytics?.(deal.id);
                        }}
                    >
                        <TrendingUp className="h-3 w-3" /> Analytics
                    </Button>
                </div>
            </div>
        </div>
    );
}
