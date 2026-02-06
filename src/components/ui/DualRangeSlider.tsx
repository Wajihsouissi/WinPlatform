import React, { useCallback, useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface DualRangeSliderProps {
    min: number;
    max: number;
    minVal: number;
    maxVal: number;
    onChange: (vals: { min: number; max: number }) => void;
    className?: string;
}

export const DualRangeSlider: React.FC<DualRangeSliderProps> = ({
    min,
    max,
    minVal,
    maxVal,
    onChange,
    className,
}) => {
    const [minValState, setMinValState] = useState(minVal);
    const [maxValState, setMaxValState] = useState(maxVal);
    const minValRef = useRef(minVal);
    const maxValRef = useRef(maxVal);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minValState);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minValState, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxValState);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxValState, getPercent]);

    // Sync with props
    useEffect(() => {
        setMinValState(minVal);
        minValRef.current = minVal;
    }, [minVal]);

    useEffect(() => {
        setMaxValState(maxVal);
        maxValRef.current = maxVal;
    }, [maxVal]);

    return (
        <div className={cn("relative w-full h-6 flex items-center", className)}>
            <input
                type="range"
                min={min}
                max={max}
                value={minValState}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxValState - 1);
                    setMinValState(value);
                    minValRef.current = value;
                    onChange({ min: value, max: maxValState });
                }}
                className="pointer-events-none absolute h-0 w-full outline-none z-30 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-slate-900 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md"
                style={{ zIndex: minValState > max - 100 ? "40" : "30" }}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxValState}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minValState + 1);
                    setMaxValState(value);
                    maxValRef.current = value;
                    onChange({ min: minValState, max: value });
                }}
                className="pointer-events-none absolute h-0 w-full outline-none z-40 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-slate-900 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md"
            />

            <div className="relative w-full">
                <div className="absolute h-1.5 w-full rounded bg-slate-200 z-10" />
                <div
                    ref={range}
                    className="absolute h-1.5 rounded bg-slate-900 z-20"
                />
            </div>
        </div>
    );
};
