'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface ReservationTimerProps {
    reservedAt: number;
    durationMinutes?: number;
    onExpire?: () => void;
}

export function ReservationTimer({ reservedAt, durationMinutes = 30, onExpire }: ReservationTimerProps) {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    useEffect(() => {
        const targetTime = reservedAt + durationMinutes * 60 * 1000;

        const updateTimer = () => {
            const now = Date.now();
            const difference = targetTime - now;

            if (difference <= 0) {
                setTimeLeft(0);
                if (onExpire) onExpire();
            } else {
                setTimeLeft(difference);
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [reservedAt, durationMinutes, onExpire]);

    if (timeLeft === null) return null;
    if (timeLeft === 0) return <span className="text-red-500 font-bold text-xs uppercase">Expired</span>;

    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return (
        <div className="flex items-center gap-1.5 text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md border border-orange-100">
            <Clock className="h-3 w-3 animate-pulse" />
            <span>Reserved for {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
        </div>
    );
}
