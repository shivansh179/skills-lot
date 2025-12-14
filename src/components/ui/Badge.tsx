'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  variant = 'default',
  size = 'md',
  children,
  className,
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full';

  const variants = {
    default: 'bg-[#f1f5f9] text-[#475569]',
    primary: 'bg-[#dbeafe] text-[#2563eb]',
    success: 'bg-[#dcfce7] text-[#16a34a]',
    warning: 'bg-[#fef3c7] text-[#d97706]',
    danger: 'bg-[#fee2e2] text-[#dc2626]',
    outline: 'bg-transparent border border-[#e2e8f0] text-[#475569]',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
}

