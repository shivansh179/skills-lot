'use client';

import { cn, getInitials } from '@/lib/utils';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isOnline?: boolean;
  className?: string;
}

const sizeClasses = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

const onlineIndicatorSizes = {
  xs: 'w-2 h-2 border',
  sm: 'w-2.5 h-2.5 border',
  md: 'w-3 h-3 border-2',
  lg: 'w-3.5 h-3.5 border-2',
  xl: 'w-4 h-4 border-2',
};

export default function Avatar({
  src,
  alt = 'Avatar',
  name,
  size = 'md',
  isOnline,
  className,
}: AvatarProps) {
  const initials = name ? getInitials(name) : '?';

  return (
    <div className={cn('relative inline-block', className)}>
      <div
        className={cn(
          'rounded-full overflow-hidden bg-[#f1f5f9] flex items-center justify-center font-medium text-[#64748b]',
          sizeClasses[size]
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 64px) 100vw, 64px"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      {isOnline !== undefined && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-white',
            onlineIndicatorSizes[size],
            isOnline ? 'bg-[#10b981]' : 'bg-[#94a3b8]'
          )}
        />
      )}
    </div>
  );
}

