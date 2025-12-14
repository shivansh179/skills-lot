'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

const sizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export default function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = true,
  reviewCount,
  className,
}: StarRatingProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            className={cn(
              sizeClasses[size],
              i < Math.floor(rating)
                ? 'fill-[#fbbf24] text-[#fbbf24]'
                : 'fill-[#e5e7eb] text-[#e5e7eb]'
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-[#374151] ml-1">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-sm text-[#6b7280]">({reviewCount} reviews)</span>
      )}
    </div>
  );
}

