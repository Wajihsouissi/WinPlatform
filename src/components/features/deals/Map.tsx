'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline, Circle, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Deal, Shop } from '@/types';
import { DealCard } from './DealCard';
import { ShopCard } from '../shops/ShopCard';
import { Navigation, Crosshair, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have a cn utility, or use template literals

interface MapProps {
    deals?: Deal[];
    shops?: Shop[];
}

// Tunisia Bounds: South-West to North-East roughly
const TUNISIA_BOUNDS: L.LatLngBoundsExpression = [
    [30.2, 7.5], // South West
    [37.6, 11.9] // North East
];

function MapUpdater({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, map.getZoom(), { animate: true });
    }, [center, map]);
    return null;
}

const getCategoryIcon = (category: string) => {
    // Return SVG strings for common categories
    const svgs: Record<string, string> = {
        'Food': '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>',
        'Wellness': '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21.5c-1.6 0-3-1.3-3-3v-6h6v6c0 1.6-1.3 3-3 3Z"/><path d="M9 8.5V11c0 1.6 1.3 3 3 3h0c1.6 0 3-1.3 3-3V8.5"/><circle cx="12" cy="4" r="2.5"/></svg>',
        'Beauty': '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3v6"/><path d="M12 9 6 3"/><path d="M12 9l6-6"/></svg>',
        'Electronics': '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="12" x="3" y="4" rx="2" ry="2"/><line x1="2" x2="22" y1="20" y2="20"/></svg>',
    };

    const defaultIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>';
    return svgs[category] || defaultIcon;
};

const createPriceIcon = (price: number, category: string, isNew: boolean = false) => {
    const iconSvg = getCategoryIcon(category);
    // Add pulsing effect css class if new
    const animationClass = isNew ? 'animate-pulse ring-2 ring-offset-1 ring-[#ff385c]' : '';

    return L.divIcon({
        className: 'custom-map-marker',
        html: `<div class="price-marker bg-white px-2.5 py-1.5 rounded-full shadow-md border-[0.5px] border-slate-300 font-extrabold text-sm hover:scale-110 transition-transform text-slate-900 whitespace-nowrap flex items-center justify-center gap-1.5 ${animationClass}">
                <span class="text-slate-600">${iconSvg}</span>
                <span>${price.toFixed(0)} TND</span>
               </div>`,
        iconAnchor: [50, 20],
    });
};

const createShopIcon = (rating: number, isNew: boolean = false) => {
    const animationClass = isNew ? 'animate-bounce' : '';
    return L.divIcon({
        className: 'custom-shop-marker',
        html: `<div class="shop-marker bg-slate-900 text-white p-2 rounded-xl shadow-lg border-2 border-white hover:scale-110 transition-transform ${animationClass}">
                <div class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>
                    <span class="font-bold text-sm">${rating}</span>
                </div>
               </div>`,
        iconAnchor: [20, 40],
    });
};

export default function Map({ deals = [], shops = [] }: MapProps) {
    const [center, setCenter] = useState<[number, number]>([36.8065, 10.1815]);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [routePath, setRoutePath] = useState<[number, number][]>([]);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation([latitude, longitude]);
            });
        }
    }, []);

    const handleGetDirections = async (dealLocation: { lat: number, lng: number }) => {
        if (!userLocation) {
            alert("Please enable location services to get directions.");
            return;
        }

        try {
            const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${userLocation[1]},${userLocation[0]};${dealLocation.lng},${dealLocation.lat}?overview=full&geometries=geojson`);
            const data = await response.json();

            if (data.routes && data.routes.length > 0) {
                const coordinates = data.routes[0].geometry.coordinates;
                const path = coordinates.map((coord: number[]) => [coord[1], coord[0]] as [number, number]);
                setRoutePath(path);
            }
        } catch (error) {
            console.error("Failed to fetch directions", error);
        }
    };

    const handleCenterOnUser = () => {
        if (userLocation) {
            setCenter(userLocation);
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
                    setCenter([latitude, longitude]);
                });
            }
        }
    };

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
        // Trigger a resize event to make sure leaflet updates after transition
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
    };

    return (
        <div
            className={cn(
                "relative transition-all duration-300 ease-in-out bg-white",
                isFullScreen ? "fixed inset-0 z-[9999] h-screen w-screen" : "h-full w-full rounded-xl"
            )}
        >
            <MapContainer
                center={center}
                zoom={13}
                scrollWheelZoom={true}
                className={cn("h-full w-full z-0", isFullScreen ? "" : "rounded-xl")}
                maxBounds={TUNISIA_BOUNDS}
                minZoom={6}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                {deals.map(deal => (
                    <Marker
                        key={deal.id}
                        position={[deal.location.lat, deal.location.lng]}
                        icon={createPriceIcon(deal.newPrice, deal.category, Math.random() > 0.8)} // Simulate "New" status randomly for now
                    >
                        <Popup className="min-w-[300px] p-0 overflow-hidden rounded-xl border-none shadow-xl">
                            <div className="w-[280px]">
                                <DealCard deal={deal} />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleGetDirections(deal.location);
                                    }}
                                    className="w-full bg-[#0a1045] text-white py-3 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
                                >
                                    <Navigation className="h-4 w-4" />
                                    Get Directions
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {shops.map(shop => (
                    <Marker
                        key={shop.id}
                        position={[shop.location.lat, shop.location.lng]}
                        icon={createShopIcon(shop.rating, Math.random() > 0.8)} // Simulate "New" status
                    >
                        <Popup className="min-w-[300px] p-0 overflow-hidden rounded-xl border-none shadow-xl">
                            <div className="w-[280px]">
                                <div className="h-[200px]">
                                    <ShopCard shop={shop} />
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleGetDirections(shop.location);
                                    }}
                                    className="w-full bg-[#0a1045] text-white py-3 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
                                >
                                    <Navigation className="h-4 w-4" />
                                    Get Directions
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {userLocation && (
                    <>
                        <CircleMarker
                            center={userLocation}
                            radius={8}
                            pathOptions={{ color: '#ffffff', fillColor: '#3b82f6', fillOpacity: 1, weight: 3 }}
                        >
                            <Popup>You are here</Popup>
                        </CircleMarker>

                        {/* Range Circle - 2km radius example to match "Deals Nearby" concept involving distance */}
                        <Circle
                            center={userLocation}
                            radius={2000} // 2km
                            pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.1, weight: 1, dashArray: '5, 10' }}
                        />
                    </>
                )}

                {routePath.length > 0 && (
                    <Polyline
                        positions={routePath}
                        pathOptions={{ color: '#3b82f6', weight: 4, opacity: 0.7, lineCap: 'round' }}
                    />
                )}

                <MapUpdater center={center} />
            </MapContainer>

            {/* Controls */}
            <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
                <button
                    onClick={toggleFullScreen}
                    className="bg-white p-3 rounded-full shadow-lg text-slate-700 hover:bg-slate-50 hover:text-[#0EA5E9] transition-all active:scale-95"
                    title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                >
                    {isFullScreen ? <Minimize2 className="h-6 w-6" /> : <Maximize2 className="h-6 w-6" />}
                </button>
            </div>

            <button
                onClick={handleCenterOnUser}
                className="absolute bottom-6 right-6 z-[400] bg-white p-3 rounded-full shadow-lg text-slate-700 hover:bg-slate-50 hover:text-[#0EA5E9] transition-all active:scale-95"
                title="My Location"
            >
                <Crosshair className="h-6 w-6" />
            </button>
        </div>
    );
}
