
import React, { useState } from 'react';
import { Search, Filter, Download, Calendar, DollarSign, Tag, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Redemption {
    id: string;
    date: string;
    customerName: string;
    dealTitle: string;
    discount: string;
    amount: number;
    status: 'Redeemed' | 'Refunded';
}

const MOCK_REDEMPTIONS: Redemption[] = [
    { id: 'R001', date: '2024-02-09T10:30:00', customerName: 'Ahmed B.', dealTitle: '50% Off Gourmet Burger', discount: '50%', amount: 17.50, status: 'Redeemed' },
    { id: 'R002', date: '2024-02-09T11:15:00', customerName: 'Sarah K.', dealTitle: 'Morning Dairy Pack', discount: '50%', amount: 4.50, status: 'Redeemed' },
    { id: 'R003', date: '2024-02-08T18:45:00', customerName: 'Mohamed A.', dealTitle: 'Italian Pizza Dinner', discount: '42%', amount: 29.00, status: 'Redeemed' },
    { id: 'R004', date: '2024-02-08T14:20:00', customerName: 'Leila M.', dealTitle: 'Professional Haircut', discount: '44%', amount: 25.00, status: 'Redeemed' },
    { id: 'R005', date: '2024-02-07T09:10:00', customerName: 'Karim S.', dealTitle: 'Farm Fresh Eggs', discount: '50%', amount: 6.00, status: 'Redeemed' },
    { id: 'R006', date: '2024-02-06T12:30:00', customerName: 'Dorra H.', dealTitle: '50% Off Gourmet Burger', discount: '50%', amount: 17.50, status: 'Refunded' },
];

export function RedemptionHistory() {
    const [filter, setFilter] = useState<'Today' | 'Week' | 'Month' | 'All'>('Week');
    const [search, setSearch] = useState('');

    const filteredData = MOCK_REDEMPTIONS.filter(item => {
        const matchesSearch = item.dealTitle.toLowerCase().includes(search.toLowerCase()) ||
            item.customerName.toLowerCase().includes(search.toLowerCase());

        const date = new Date(item.date);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let matchesFilter = true;
        if (filter === 'Today') matchesFilter = diffDays <= 1;
        if (filter === 'Week') matchesFilter = diffDays <= 7;
        if (filter === 'Month') matchesFilter = diffDays <= 30;

        return matchesSearch && matchesFilter;
    });

    const totalRevenue = filteredData.reduce((acc, curr) => curr.status === 'Redeemed' ? acc + curr.amount : acc, 0);
    const totalRedemptions = filteredData.filter(i => i.status === 'Redeemed').length;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Revenue</p>
                            <h3 className="text-2xl font-bold text-slate-900">{totalRevenue.toFixed(2)} TND</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                            <Tag className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Redeemed</p>
                            <h3 className="text-2xl font-bold text-slate-900">{totalRedemptions}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Avg. Order</p>
                            <h3 className="text-2xl font-bold text-slate-900">
                                {totalRedemptions > 0 ? (totalRevenue / totalRedemptions).toFixed(2) : '0.00'} TND
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                    {(['Today', 'Week', 'Month', 'All'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filter === f
                                    ? 'bg-slate-900 text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search customer or deal..."
                            className="pl-9 bg-slate-50 border-slate-200"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="shrink-0" onClick={() => alert('Exporting CSV...')}>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Date & Time</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Deal</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredData.length > 0 ? (
                                filteredData.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-slate-400" />
                                                {new Date(item.date).toLocaleDateString()}
                                                <span className="text-slate-400 text-xs">
                                                    {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-900">{item.customerName}</td>
                                        <td className="px-6 py-4 text-slate-600">
                                            <div>
                                                <p className="text-slate-900">{item.dealTitle}</p>
                                                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                                                    -{item.discount}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Redeemed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold text-slate-900">
                                            {item.amount.toFixed(2)} TND
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        No redemptions found for this period.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
