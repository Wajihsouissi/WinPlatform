'use client';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SupportPage() {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-background p-6 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
                <h1 className="text-2xl font-bold mb-4">Help & Support</h1>
                <p className="text-slate-500 mb-6">Need help? Contact our support team at support@win.app or call us at +216 11 222 333.</p>
                <button onClick={() => router.back()} className="text-[#ff385c] font-bold hover:underline flex items-center justify-center gap-2 mx-auto">
                    <ArrowLeft className="h-4 w-4" /> Go Back
                </button>
            </div>
        </div>
    );
}
