'use client';

import React from 'react';
import { Clock, MapPin, Tag, Heart } from 'lucide-react';
import Image from 'next/image';

interface DealPreviewProps {
    title: string;
    description?: string;
    originalPrice: string | number;
    discountedPrice: string | number;
    image?: string | File | null;
    category?: string;
    isFlashDeal?: boolean;
    validUntil?: string;
    shopName?: string;
    // Optional data prop for backward compatibility or direct object passing
    data?: any;
}

export function DealPreview({
    title,
    description,
    originalPrice,
    discountedPrice,
    image,
    category,
    isFlashDeal,
    validUntil,
    shopName = "My Shop Name",
    data
}: DealPreviewProps) {
    // Fallback to data object if individual props are missing
    const _title = title || data?.title;
    const _description = description || data?.description;
    const _originalPrice = originalPrice || data?.originalPrice;
    const _discountedPrice = discountedPrice || data?.discountedPrice;
    const _category = category || data?.category;
    const _isFlashDeal = isFlashDeal || data?.isFlashDeal;
    const _validUntil = validUntil || data?.validUntil;

    // Handle image priority: direct prop -> data.image -> data.images[0]
    const _image = image || (data?.image) || (data?.images?.length ? data.images[0] : null);

    const discountPercentage = _originalPrice && _discountedPrice
        ? Math.round(((Number(_originalPrice) - Number(_discountedPrice)) / Number(_originalPrice)) * 100)
        : 0;

    const previewImage = React.useMemo(() => {
        if (typeof _image === 'string') return _image;
        if (_image instanceof File) return URL.createObjectURL(_image);
        return null;
    }, [_image]);

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 max-w-sm mx-auto">
            {/* Image Overlay */}
            <div className="relative h-48 bg-slate-100">
                {previewImage ? (
                    <Image
                        src={previewImage}
                        alt="Deal Preview"
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">
                        No Image
                    </div>
                )}

                {_isFlashDeal && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md animate-pulse">
                        <Tag className="h-3 w-3" /> FLASH DEAL
                    </div>
                )}

                <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 transition-colors shadow-sm">
                    <Heart className="h-4 w-4" />
                </button>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{_title || 'Deal Title'}</h3>
                        <p className="text-sm text-slate-500 flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {shopName}
                        </p>
                    </div>
                    {_category && (
                        <span className="text-[10px] font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-full uppercase tracking-wide">
                            {_category}
                        </span>
                    )}
                </div>

                <p className="text-sm text-slate-600 line-clamp-2 mb-4 min-h-[2.5rem]">
                    {_description || 'Description will appear here...'}
                </p>

                {/* Footer with Price and Timer */}
                <div className="flex items-end justify-between border-t border-slate-100 pt-4">
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-indigo-600">
                                {_discountedPrice ? `${_discountedPrice} TND` : '- TND'}
                            </span>
                            {_originalPrice && (
                                <span className="text-sm text-slate-400 line-through">
                                    {_originalPrice} TND
                                </span>
                            )}
                        </div>
                        {discountPercentage > 0 && (
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded ml-auto inline-block mt-1">
                                {discountPercentage}% OFF
                            </span>
                        )}
                    </div>

                    {_validUntil && (
                        <div className="text-right">
                            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-0.5">Expires in</p>
                            <div className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded-lg">
                                <Clock className="h-3 w-3 text-slate-400" />
                                <span>2d 14h</span> {/* Mocked for preview */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
