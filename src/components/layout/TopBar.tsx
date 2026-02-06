'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { MapPin, Search, Bell, Map, Building2, Store, Plus, Minus, ShoppingBag } from 'lucide-react';
import { DualRangeSlider } from '@/components/ui/DualRangeSlider';
import { cn } from '@/lib/utils';
import { useSidebar } from './SidebarContext';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export function TopBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { isCollapsed } = useSidebar();
    const { cartItems } = useCart();

    // Calculate active orders (Pending or Paid)
    const activeOrdersCount = cartItems.filter(item => ['PENDING', 'PAID'].includes(item.status)).length;

    const isHomePage = pathname === '/';

    // Scroll State
    const [isScrolled, setIsScrolled] = useState(false);

    // Manual expansion state (mainly for Search page where it is minimized by default)
    const [isManualExpanded, setIsManualExpanded] = useState(false);

    // Search Method State: 'structured' (Where/What/Price) or 'simple' (Text input)
    const [searchMethod, setSearchMethod] = useState<'structured' | 'simple'>('structured');
    const [searchStep, setSearchStep] = useState<'where' | 'what' | 'price' | null>(null);

    // Structured Search State
    const [selectedLocation, setSelectedLocation] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [priceRange, setPriceRange] = useState<{ min: string, max: string }>({ min: '', max: '' });

    // Simple Search State
    const [simpleQuery, setSimpleQuery] = useState('');

    const containerRef = useRef<HTMLDivElement>(null);

    // Dynamic Compact State check:
    // Compact if: Scrolled OR (Not Home Page AND Not Manually Expanded)
    const isCompact = isScrolled || (!isHomePage && !isManualExpanded);

    // Handle Scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // Add hysteresis to prevent flickering
            if (scrollY > 100) {
                setIsScrolled(true);
                // If we scroll down, we reset the manual expansion so it re-minimizes
                setIsManualExpanded(false);
            } else if (scrollY < 50) {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Reset manual expansion on route change
    useEffect(() => {
        setIsManualExpanded(false);
    }, [pathname]);

    // Persist search state from URL on mount
    useEffect(() => {
        const loc = searchParams.get('location');
        const cat = searchParams.get('category');
        const min = searchParams.get('minPrice');
        const max = searchParams.get('maxPrice');
        const q = searchParams.get('q');

        if (q) {
            setSearchMethod('simple');
            setSimpleQuery(q);
        } else if (loc || cat || min || max) {
            setSearchMethod('structured');
            if (loc) setSelectedLocation(loc);
            if (cat) setSelectedCategory(cat);
            if (min) setPriceRange(prev => ({ ...prev, min }));
            if (max) setPriceRange(prev => ({ ...prev, max }));
        }
    }, [searchParams]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setSearchStep(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleStep = (step: 'where' | 'what' | 'price') => {
        setSearchStep(prev => prev === step ? null : step);
    };

    const handleSearch = () => {
        const params = new URLSearchParams();

        if (searchMethod === 'structured') {
            if (selectedLocation) params.set('location', selectedLocation);
            if (selectedCategory) params.set('category', selectedCategory);
            if (priceRange.min) params.set('minPrice', priceRange.min);
            if (priceRange.max) params.set('maxPrice', priceRange.max);
        } else {
            if (simpleQuery) params.set('q', simpleQuery);
        }

        setSearchStep(null);
        router.push(`/search?${params.toString()}`);
    };

    const resetToExpanded = () => {
        setIsManualExpanded(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <header
            className={cn(
                "sticky top-0 z-50 flex flex-col items-center border-b bg-background/80 backdrop-blur-md transition-all duration-300 ease-in-out justify-start",
                isCollapsed ? "md:ml-20" : "md:ml-64",
                isCompact ? "h-[80px]" : "h-[180px]"
            )}
        >

            {/* Search Method Switcher */}
            <div className={cn(
                "grid transition-all duration-300 ease-in-out",
                isCompact ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
            )}>
                <div className="overflow-hidden">
                    <div className="flex items-center gap-6 pt-6 pb-2">
                        <button
                            onClick={() => setSearchMethod('structured')}
                            className={cn(
                                "text-sm font-semibold pb-2 border-b-2 transition-all relative",
                                searchMethod === 'structured' ? "text-slate-900" : "text-slate-500 hover:text-slate-800"
                            )}
                        >
                            Deals
                            {searchMethod === 'structured' && (
                                <motion.div
                                    layoutId="active-tab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(var(--secondary))]"
                                />
                            )}
                        </button>
                        <button
                            onClick={() => setSearchMethod('simple')}
                            className={cn(
                                "text-sm font-semibold pb-2 border-b-2 transition-all relative",
                                searchMethod === 'simple' ? "text-[hsl(var(--secondary))]" : "text-slate-500 hover:text-slate-800"
                            )}
                        >
                            Specific
                            {searchMethod === 'simple' && (
                                <motion.div
                                    layoutId="active-tab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(var(--secondary))]"
                                />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className={cn(
                "w-full px-8 relative flex items-center justify-center transition-all duration-300 flex-1",
                isCompact ? "pb-0" : "pb-6"
            )}>

                {/* Search Bar Container - Uses absolute positioning for cross-fade */}
                <div className="w-full relative flex justify-center items-center">

                    {/* COMPACT VIEW (Overlay) */}
                    <AnimatePresence>
                        {isCompact && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                transition={{ duration: 0.2 }}
                                onClick={resetToExpanded}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center z-50 cursor-pointer"
                            >
                                <div className="flex items-center justify-between border border-border rounded-full shadow-sm hover:shadow-md transition-all bg-white py-2.5 pl-4 pr-2 gap-2 w-[350px]">
                                    <div className="flex items-center gap-3 text-sm font-medium text-slate-600 px-2 border-r border-slate-100 flex-1 min-w-0">
                                        <span className="truncate">{selectedLocation || 'Anywhere'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-medium text-slate-600 px-2 border-r border-slate-100 flex-1 min-w-0">
                                        <span className="truncate">{selectedCategory || 'Any Category'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-medium text-slate-600 px-2 flex-1 min-w-0">
                                        <span className="truncate">{priceRange.min ? `${priceRange.min}+` : 'Add Price'}</span>
                                    </div>
                                    <div className="bg-[hsl(var(--primary))] text-white p-2 rounded-full flex-shrink-0">
                                        <Search className="h-3 w-3 stroke-[3px]" />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* EXPANDED VIEW (Base) */}
                    <div
                        className={cn(
                            "grid transition-all duration-300 ease-in-out w-full max-w-2xl origin-top",
                            isCompact
                                ? "grid-rows-[0fr] opacity-0 pointer-events-none"
                                : "grid-rows-[1fr] opacity-100 pointer-events-auto"
                        )}
                        aria-hidden={isCompact}
                    >
                        <div className="overflow-visible pt-1 relative" ref={containerRef}>
                            <motion.div layout transition={{ type: "spring", stiffness: 500, damping: 30 }} className="relative z-50">
                                {searchMethod === 'structured' ? (
                                    <motion.div
                                        layoutId="search-container"
                                        className={cn(
                                            "flex items-center rounded-full border bg-white p-2 shadow-sm transition-all relative z-50",
                                            searchStep ? "bg-slate-100 border-transparent shadow-none" : "border-border hover:shadow-md"
                                        )}>
                                        {/* Where */}
                                        <div className="flex-1 relative">
                                            <button
                                                onClick={() => toggleStep('where')}
                                                className={cn("w-full px-6 rounded-full text-left py-2 relative transition-all z-10", !searchStep && "hover:bg-slate-50 border-r border-border")}
                                            >
                                                <div className="relative z-10">
                                                    <div className={cn("text-xs font-bold transition-colors", searchStep === 'where' ? "text-white" : "text-slate-800")}>Where</div>
                                                    <div className={cn("text-sm truncate min-h-[1.25rem] transition-colors", searchStep === 'where' ? "text-slate-300" : "text-muted-foreground")}>{selectedLocation || 'Search destinations'}</div>
                                                </div>
                                                {searchStep === 'where' && (
                                                    <motion.div
                                                        layoutId="active-search-step-bg"
                                                        className="absolute inset-0 bg-[hsl(var(--secondary))] rounded-full z-0 pointer-events-none"
                                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                    />
                                                )}
                                            </button>
                                        </div>

                                        {/* What */}
                                        <div className="flex-1 relative">
                                            <button
                                                onClick={() => toggleStep('what')}
                                                className={cn("w-full px-6 rounded-full text-left py-2 relative transition-all z-10", !searchStep && "hover:bg-slate-50 border-r border-border")}
                                            >
                                                <div className="relative z-10">
                                                    <div className={cn("text-xs font-bold transition-colors", searchStep === 'what' ? "text-white" : "text-slate-800")}>What</div>
                                                    <div className={cn("text-sm truncate min-h-[1.25rem] transition-colors", searchStep === 'what' ? "text-slate-300" : "text-muted-foreground")}>{selectedCategory || 'All categories'}</div>
                                                </div>
                                                {searchStep === 'what' && (
                                                    <motion.div
                                                        layoutId="active-search-step-bg"
                                                        className="absolute inset-0 bg-[hsl(var(--secondary))] rounded-full z-0 pointer-events-none"
                                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                    />
                                                )}
                                            </button>
                                        </div>

                                        {/* Price */}
                                        <div className="flex-[0.8] relative">
                                            <button
                                                onClick={() => toggleStep('price')}
                                                className={cn("w-full px-6 rounded-full text-left py-2 relative transition-all z-10", !searchStep && "hover:bg-slate-50")}
                                            >
                                                <div className="relative z-10">
                                                    <div className={cn("text-xs font-bold transition-colors", searchStep === 'price' ? "text-white" : "text-slate-800")}>Price</div>
                                                    <div className={cn("text-sm truncate min-h-[1.25rem] transition-colors", searchStep === 'price' ? "text-slate-300" : "text-muted-foreground")}>{priceRange.min || priceRange.max ? `${priceRange.min || 0} - ${priceRange.max || 'Any'}` : 'Any price'}</div>
                                                </div>
                                                {searchStep === 'price' && (
                                                    <motion.div
                                                        layoutId="active-search-step-bg"
                                                        className="absolute inset-0 bg-[hsl(var(--secondary))] rounded-full z-0 pointer-events-none"
                                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                    />
                                                )}
                                            </button>
                                        </div>

                                        {/* Search Btn */}
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleSearch}
                                            className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-white p-4 rounded-full shadow-md ml-2 flex-shrink-0 flex items-center gap-2 overflow-hidden relative z-20"
                                        >
                                            <motion.div
                                                layout
                                                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                                                className="flex items-center gap-2"
                                            >
                                                <Search className="h-5 w-5 stroke-[3px]" />
                                                <AnimatePresence mode='popLayout'>
                                                    {searchStep && (
                                                        <motion.span
                                                            initial={{ width: 0, opacity: 0 }}
                                                            animate={{ width: "auto", opacity: 1 }}
                                                            exit={{ width: 0, opacity: 0 }}
                                                            className="text-base font-bold whitespace-nowrap overflow-hidden"
                                                        >
                                                            Search
                                                        </motion.span>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        </motion.button>
                                    </motion.div>
                                ) : (
                                    /* Simple Search Input */
                                    <motion.div
                                        layoutId="search-container"
                                        className="flex items-center rounded-full border border-border bg-white p-2 shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <input
                                            type="text"
                                            value={simpleQuery}
                                            onChange={(e) => setSimpleQuery(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                            placeholder="Search by product, store or experience..."
                                            className="flex-1 bg-transparent px-6 text-sm outline-none placeholder:text-muted-foreground text-foreground py-3"
                                            autoFocus
                                        />
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleSearch}
                                            className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-white p-4 rounded-full transition-colors shadow-md ml-2 flex-shrink-0"
                                        >
                                            <Search className="h-5 w-5 stroke-[3px]" />
                                        </motion.button>
                                    </motion.div>
                                )}
                            </motion.div>

                            {/* Dropdown Panel (Only for Structured) */}
                            <AnimatePresence>
                                {searchStep && searchMethod === 'structured' && !isCompact && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20, scale: 0.95, height: 0 }}
                                        animate={{ opacity: 1, y: 0, scale: 1, height: "auto" }}
                                        exit={{ opacity: 0, y: -20, scale: 0.95, height: 0 }}
                                        transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
                                        className="absolute top-full left-0 w-full mt-3 bg-white rounded-[32px] p-8 shadow-[0_6px_20px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden z-40"
                                    >
                                        {/* WHERE Content */}
                                        {searchStep === 'where' && (
                                            <motion.div
                                                key="where"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ duration: 0.2 }}
                                                className="space-y-4"
                                            >
                                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Suggested destinations</h3>
                                                <div className="space-y-1">
                                                    {[
                                                        { label: 'Nearby', sub: "Find what's around you", icon: MapPin },
                                                        { label: 'Tunis Centre', sub: "Popular for food", icon: Building2 },
                                                        { label: 'La Marsa', sub: "Trending beach spots", icon: Map }
                                                    ].map((item) => (
                                                        <motion.button
                                                            whileHover={{ scale: 1.02, x: 4 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            key={item.label}
                                                            onClick={() => { setSelectedLocation(item.label); toggleStep('what'); }}
                                                            className="flex items-center gap-4 w-full p-2 hover:bg-slate-50 rounded-xl transition-colors text-left group"
                                                        >
                                                            <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all text-slate-700"><item.icon className="h-5 w-5" /></div>
                                                            <div><div className="font-bold text-slate-900">{item.label}</div><div className="text-sm text-slate-500">{item.sub}</div></div>
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* WHAT Content */}
                                        {searchStep === 'what' && (
                                            <motion.div
                                                key="what"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Browse by Category</h3>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {['Food', 'Wellness', 'Beauty', 'Electronics', 'Fashion', 'Home'].map((cat, index) => (
                                                        <motion.button
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: index * 0.05 }}
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            key={cat}
                                                            onClick={() => { setSelectedCategory(cat); toggleStep('price'); }}
                                                            className={cn("flex items-center gap-3 p-3 rounded-xl border transition-all text-left", selectedCategory === cat ? "border-slate-900 bg-slate-50" : "border-border hover:border-slate-900 hover:bg-slate-50")}
                                                        >
                                                            <Store className="h-5 w-5 text-slate-400" />
                                                            <span className="font-semibold text-slate-900">{cat}</span>
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* PRICE Content */}
                                        {searchStep === 'price' && (
                                            <motion.div
                                                key="price"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ duration: 0.2 }}
                                                className="px-2"
                                            >
                                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Price Range</h3>

                                                {/* Quick Presets */}
                                                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                                                    {[
                                                        { label: 'Under 50', min: '', max: '50' },
                                                        { label: '50 - 100', min: '50', max: '100' },
                                                        { label: '100 - 200', min: '100', max: '200' },
                                                        { label: '200+', min: '200', max: '' },
                                                    ].map((preset) => (
                                                        <button
                                                            key={preset.label}
                                                            onClick={() => setPriceRange({ min: preset.min, max: preset.max })}
                                                            className={cn(
                                                                "px-4 py-2 rounded-full border text-sm whitespace-nowrap transition-all",
                                                                priceRange.min === preset.min && priceRange.max === preset.max
                                                                    ? "bg-slate-900 text-white border-slate-900"
                                                                    : "border-border text-slate-600 hover:border-slate-900"
                                                            )}
                                                        >
                                                            {preset.label} <span className="text-xs opacity-80">DT</span>
                                                        </button>
                                                    ))}
                                                </div>

                                                <div className="space-y-8">
                                                    {/* Slider */}
                                                    <div className="px-2">
                                                        <div className="flex justify-between text-xs font-bold text-slate-400 mb-4">
                                                            <span>0 DT</span>
                                                            <span>1000+ DT</span>
                                                        </div>
                                                        <DualRangeSlider
                                                            min={0}
                                                            max={1000}
                                                            minVal={Number(priceRange.min) || 0}
                                                            maxVal={Number(priceRange.max) || 1000}
                                                            onChange={({ min, max }) => setPriceRange({ min: min.toString(), max: max.toString() })}
                                                        />
                                                    </div>

                                                    <div className="flex items-center gap-4">
                                                        {/* Min Input */}
                                                        <div className="flex-1 p-2 rounded-xl border border-border focus-within:ring-2 ring-slate-900 transition-all relative">
                                                            <label className="block text-[10px] font-bold text-slate-500 mb-1 px-1">Min Price</label>
                                                            <div className="flex items-center justify-between">
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); setPriceRange(p => ({ ...p, min: Math.max(0, (Number(p.min) || 0) - 10).toString() })); }}
                                                                    className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                                                                >
                                                                    <Minus className="h-4 w-4" />
                                                                </button>
                                                                <div className="flex items-center text-slate-900 mx-2">
                                                                    <input
                                                                        type="number"
                                                                        value={priceRange.min}
                                                                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                                                        className="w-16 text-center outline-none font-bold text-lg placeholder:text-slate-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                                        placeholder="0"
                                                                    />
                                                                    <span className="font-bold text-sm ml-1 text-slate-400">DT</span>
                                                                </div>
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); setPriceRange(p => ({ ...p, min: ((Number(p.min) || 0) + 10).toString() })); }}
                                                                    className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                                                                >
                                                                    <Plus className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <span className="text-slate-300">-</span>

                                                        {/* Max Input */}
                                                        <div className="flex-1 p-2 rounded-xl border border-border focus-within:ring-2 ring-slate-900 transition-all relative">
                                                            <label className="block text-[10px] font-bold text-slate-500 mb-1 px-1">Max Price</label>
                                                            <div className="flex items-center justify-between">
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); setPriceRange(p => ({ ...p, max: Math.max(0, (Number(p.max) || 0) - 10).toString() })); }}
                                                                    className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                                                                >
                                                                    <Minus className="h-4 w-4" />
                                                                </button>
                                                                <div className="flex items-center text-slate-900 mx-2">
                                                                    <input
                                                                        type="number"
                                                                        value={priceRange.max}
                                                                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                                                        className="w-16 text-center outline-none font-bold text-lg placeholder:text-slate-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                                        placeholder="Any"
                                                                    />
                                                                    <span className="font-bold text-sm ml-1 text-slate-400">DT</span>
                                                                </div>
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); setPriceRange(p => ({ ...p, max: ((Number(p.max) || 0) + 10).toString() })); }}
                                                                    className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                                                                >
                                                                    <Plus className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <motion.button
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={handleSearch}
                                                        className="w-full bg-[#ff385c] hover:bg-[#d9324e] text-white py-3.5 rounded-xl font-bold text-lg transition-transform active:scale-[0.98] shadow-md hover:shadow-lg"
                                                    >
                                                        Search Deals
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Mobile Actions / Profile */}
                <div className="absolute right-8 flex items-center gap-4">
                    {/* Orders Button */}
                    <button
                        onClick={() => router.push('/orders')}
                        className={cn(
                            "relative rounded-full transition-all hover:bg-slate-100 hover:text-slate-900 flex items-center gap-2",
                            isCompact ? "p-2 text-slate-500" : "px-4 py-2 bg-slate-50 text-slate-700 border border-border"
                        )}
                    >
                        <div className="relative">
                            <ShoppingBag className="h-5 w-5" />
                            {activeOrdersCount > 0 && (
                                <span className={cn(
                                    "absolute -top-1 -right-1 bg-[hsl(var(--primary))] rounded-full border-2 border-white flex items-center justify-center animate-in zoom-in",
                                    isCompact ? "h-3 w-3" : "h-4 w-4 text-[9px] font-bold text-white -top-2 -right-2"
                                )}>
                                    {!isCompact && activeOrdersCount}
                                </span>
                            )}
                        </div>
                        {!isCompact && (
                            <span className="font-bold text-sm">Orders</span>
                        )}
                        {isCompact && activeOrdersCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[hsl(var(--primary))] ring-2 ring-white" />
                        )}
                    </button>

                    <button className="relative rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900">
                        <Bell className="h-5 w-5" />
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[hsl(var(--primary))] ring-2 ring-white" />
                    </button>

                </div>
            </div>
        </header>
    );
}
