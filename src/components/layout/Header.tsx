'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  Zap,
} from 'lucide-react';
import { Button, Avatar } from '@/components/ui';
import { cn } from '@/lib/utils';

interface HeaderProps {
  variant?: 'default' | 'auth' | 'dashboard';
  user?: {
    name: string;
    avatar?: string;
    role: 'client' | 'talent';
  };
}

export default function Header({ variant = 'default', user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Categories', href: '/#categories' },
  ];

  const dashboardLinks =
    user?.role === 'client'
      ? [
          { label: 'Find Talent', href: '/find-talent' },
          { label: 'My Bookings', href: '/bookings' },
          { label: 'Messages', href: '/messages' },
        ]
      : [
          { label: 'Dashboard', href: '/talent/dashboard' },
          { label: 'Calendar', href: '/talent/calendar' },
          { label: 'Earnings', href: '/talent/earnings' },
          { label: 'Profile', href: '/talent/profile' },
        ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#0f172a]">SkillSlot</span>
          </Link>

          {/* Desktop Navigation */}
          {variant === 'default' && (
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[#475569] hover:text-[#0f172a] font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Dashboard Navigation */}
          {variant === 'dashboard' && (
            <>
              {/* Search Bar */}
              <div className="hidden md:flex flex-1 max-w-md mx-8">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
                  <input
                    type="text"
                    placeholder="Search for talent, jobs, or skills..."
                    className="w-full pl-10 pr-4 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                  />
                </div>
              </div>

              <nav className="hidden lg:flex items-center gap-6">
                {dashboardLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-[#475569] hover:text-[#0f172a] font-medium transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </>
          )}

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {variant === 'default' && (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="hidden sm:flex">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}

            {variant === 'dashboard' && user && (
              <>
                {user.role === 'talent' && (
                  <Button
                    variant="primary"
                    size="sm"
                    className="hidden sm:flex"
                  >
                    Switch to Talent
                  </Button>
                )}
                <button className="relative p-2 text-[#64748b] hover:text-[#0f172a] transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                <button className="p-2 text-[#64748b] hover:text-[#0f172a] transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 pl-3 border-l border-[#e2e8f0]">
                  <Avatar
                    src={user.avatar}
                    name={user.name}
                    size="sm"
                    isOnline
                  />
                  <ChevronDown className="w-4 h-4 text-[#64748b]" />
                </div>
              </>
            )}

            {variant === 'auth' && (
              <Link href="/login">
                <Button variant="secondary" size="sm">
                  Log In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-[#64748b]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#e2e8f0] bg-white"
          >
            <nav className="px-4 py-4 space-y-3">
              {(variant === 'default' ? navLinks : dashboardLinks).map(
                (link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block py-2 text-[#475569] hover:text-[#0f172a] font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              {variant === 'default' && (
                <div className="pt-3 flex flex-col gap-2">
                  <Link href="/login">
                    <Button variant="secondary" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

