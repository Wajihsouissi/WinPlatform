'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
    targetDate: string;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft(null);
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!timeLeft) {
        return <span className="text-red-500 font-bold">Expired</span>;
    }

    return (
        <div className="flex items-center gap-4 text-slate-700">
            <div className="flex flex-col items-center min-w-[3rem]">
                <span className="text-2xl font-black">{timeLeft.days}</span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Days</span>
            </div>
            <span className="text-xl font-bold text-slate-300">:</span>
            <div className="flex flex-col items-center min-w-[3rem]">
                <span className="text-2xl font-black">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Hours</span>
            </div>
            <span className="text-xl font-bold text-slate-300">:</span>
            <div className="flex flex-col items-center min-w-[3rem]">
                <span className="text-2xl font-black">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Mins</span>
            </div>
            <span className="text-xl font-bold text-slate-300">:</span>
            <div className="flex flex-col items-center min-w-[3rem]">
                <span className="text-2xl font-black text-red-500">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Secs</span>
            </div>
        </div>
    );
}
