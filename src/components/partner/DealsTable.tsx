'use client';

import React from 'react';
import { Deal } from './DealCard';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { MoreVertical, Edit3, Copy, RefreshCw, Trash2, Eye, Ticket, CheckCircle, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DealsTableProps {
    deals: Deal[];
    onDelete: (id: string) => void;
    onDuplicate: (id: string) => void;
    onExtend: (id: string) => void;
    onEdit: (id: string) => void;
}

export function DealsTable({ deals, onDelete, onDuplicate, onExtend, onEdit }: DealsTableProps) {
    const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);
    const menuRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getStatusColor = (status: Deal['status']) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-700';
            case 'Scheduled': return 'bg-blue-100 text-blue-700';
            case 'Expired': return 'bg-slate-100 text-slate-700';
            case 'Draft': return 'bg-gray-100 text-gray-700';
            case 'Sold Out': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 font-medium w-16">Image</th>
                            <th className="px-6 py-4 font-medium">Deal Name</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Price</th>
                            <th className="px-6 py-4 font-medium">Stats</th>
                            <th className="px-6 py-4 font-medium">Expires</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {deals.map((deal) => (
                            <tr key={deal.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-slate-100">
                                        <Image
                                            src={deal.image || '/placeholder-deal.jpg'}
                                            alt={deal.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-900">
                                    <div className="line-clamp-1 max-w-[200px]">{deal.title}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        "px-2.5 py-1 rounded-full text-xs font-medium",
                                        getStatusColor(deal.status)
                                    )}>
                                        {deal.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-indigo-600">{deal.discountedPrice} TND</span>
                                        <span className="text-xs text-slate-400 line-through">{deal.originalPrice} TND</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3 text-slate-500 text-xs">
                                        <div className="flex items-center gap-1" title="Views">
                                            <Eye className="h-3 w-3" /> {deal.views}
                                        </div>
                                        <div className="flex items-center gap-1" title="Claims">
                                            <Ticket className="h-3 w-3" /> {deal.claims}
                                        </div>
                                        <div className="flex items-center gap-1" title="Redemptions">
                                            <CheckCircle className="h-3 w-3" /> {deal.redemptions}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600">
                                    {new Date(deal.validUntil).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-right relative">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-slate-400 hover:text-slate-600"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenMenuId(openMenuId === deal.id ? null : deal.id);
                                        }}
                                    >
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>

                                    {openMenuId === deal.id && (
                                        <div ref={menuRef} className="absolute right-8 top-8 mt-1 w-48 bg-white rounded-lg shadow-xl border border-slate-100 z-50 py-1 animate-in fade-in zoom-in-95 duration-200 text-left">
                                            <button onClick={() => { onEdit(deal.id); setOpenMenuId(null); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                                <Edit3 className="h-4 w-4 text-slate-400" /> Edit Deal
                                            </button>
                                            <button onClick={() => { onDuplicate(deal.id); setOpenMenuId(null); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                                <Copy className="h-4 w-4 text-slate-400" /> Duplicate
                                            </button>
                                            <button onClick={() => { onExtend(deal.id); setOpenMenuId(null); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                                <RefreshCw className="h-4 w-4 text-slate-400" /> Extend Expiry
                                            </button>
                                            <div className="h-px bg-slate-100 my-1"></div>
                                            <button onClick={() => { onDelete(deal.id); setOpenMenuId(null); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                                <Trash2 className="h-4 w-4" /> Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
