'use client';

import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'hover' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({
  className,
  variant = 'default',
  padding = 'md',
  children,
  ...props
}: CardProps) {
  const baseStyles = 'rounded-xl bg-white';

  const variants = {
    default: 'border border-[#e2e8f0]',
    hover: 'border border-[#e2e8f0] hover:shadow-lg hover:border-[#2563eb]/20 transition-all duration-300',
    bordered: 'border-2 border-[#e2e8f0]',
    elevated: 'shadow-lg border border-[#e2e8f0]/50',
  };

  return (
    <motion.div
      className={cn(baseStyles, variants[variant], paddingClasses[padding], className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

