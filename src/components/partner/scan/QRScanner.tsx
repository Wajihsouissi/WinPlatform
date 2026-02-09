
import React, { useState } from 'react';
import { Camera, Zap, ZapOff, X } from 'lucide-react';
import { QrReader } from 'react-qr-reader';

interface QRScannerProps {
    onScan: (data: string | null) => void;
    onError?: (err: any) => void;
}

export function QRScanner({ onScan, onError }: QRScannerProps) {
    const [flashOn, setFlashOn] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleScan = (data: any) => {
        if (data) {
            onScan(data?.text);
        }
    };

    const handleError = (err: any) => {
        console.error(err);
        setError('Camera access denied or not available.');
        if (onError) onError(err);
    };

    return (
        <div className="relative w-full aspect-square max-w-sm mx-auto bg-black rounded-3xl overflow-hidden shadow-xl border-4 border-slate-900/10">
            {/* Camera View */}
            <div className="absolute inset-0 z-0">
                <QrReader
                    onResult={(result, error) => {
                        if (!!result) {
                            handleScan(result);
                        }
                        if (!!error) {
                            // console.info(error);
                        }
                    }}
                    constraints={{ facingMode: 'environment' }}
                    containerStyle={{ width: '100%', height: '100%', paddingTop: 0 }}
                    videoStyle={{ objectFit: 'cover' }}
                    ViewFinder={() => null} // We use our own overlay
                />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 pointer-events-none">
                {/* Scan Frame */}
                <div className="relative w-64 h-64 border-2 border-white/50 rounded-3xl backdrop-blur-sm">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl -mt-1 -ml-1"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl -mt-1 -mr-1"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl -mb-1 -ml-1"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl -mb-1 -mr-1"></div>

                    {/* Scanning Line Animation */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary/80 shadow-[0_0_15px_rgba(var(--primary),0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                </div>

                <p className="mt-8 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
                    Point camera at ticket code
                </p>
            </div>

            {/* Controls */}
            <div className="absolute top-4 right-4 z-20">
                <button
                    onClick={() => setFlashOn(!flashOn)}
                    className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all"
                >
                    {flashOn ? <Zap className="w-5 h-5 fill-yellow-400 text-yellow-400" /> : <ZapOff className="w-5 h-5" />}
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="absolute inset-0 z-30 bg-slate-900 flex flex-col items-center justify-center p-6 text-center text-white">
                    <Camera className="w-12 h-12 mb-4 opacity-50" />
                    <p>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-primary rounded-lg text-sm font-bold"
                    >
                        Retry
                    </button>
                </div>
            )}
        </div>
    );
}
