'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Video,
  MoreVertical,
  RefreshCw,
  HelpCircle,
  Zap,
  Bell,
  Search,
} from 'lucide-react';
import { Header } from '@/components/layout';
import { Button, Card, Badge, Avatar } from '@/components/ui';
import { cn } from '@/lib/utils';

const bookings = {
  today: [
    {
      id: '1',
      date: '25',
      month: 'OCT',
      name: 'Sarah Jenkins',
      role: 'Senior UI Designer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      project: 'Mobile App Redesign Consultation',
      time: '10:00 AM - 11:00 AM',
      status: 'Confirmed',
    },
  ],
  thisWeek: [
    {
      id: '2',
      date: '27',
      month: 'OCT',
      name: 'Michael Chen',
      role: 'Backend Engineer (Python)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      project: 'API Optimization & Scaling',
      time: '2:00 PM - 4:00 PM',
      status: 'Pending',
    },
    {
      id: '3',
      date: '28',
      month: 'OCT',
      name: 'Emily Rodriguez',
      role: 'DevOps Specialist',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      project: 'CI/CD Pipeline Setup',
      time: '9:00 AM - 12:00 PM',
      status: 'Upcoming',
    },
  ],
  later: [
    {
      id: '4',
      date: '02',
      month: 'NOV',
      name: 'James Wilson',
      role: 'System Architect',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      project: 'Enterprise Architecture Review',
      time: '1:00 PM - 2:00 PM',
      status: 'Scheduled',
    },
  ],
};

const statusColors: Record<string, 'success' | 'warning' | 'primary' | 'default'> = {
  Confirmed: 'success',
  Pending: 'warning',
  Upcoming: 'primary',
  Scheduled: 'default',
};

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Past'>('Upcoming');

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <Header
        variant="dashboard"
        user={{ name: 'User', role: 'client' }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold text-[#0f172a]">My Bookings</h1>
            <p className="text-[#64748b]">
              Manage your upcoming sessions and view history.
            </p>
          </div>
          <Button variant="secondary" leftIcon={<RefreshCw className="w-4 h-4" />}>
            Sync Calendar
          </Button>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-[#e2e8f0] mb-8">
          {(['Upcoming', 'Past'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'pb-4 text-sm font-medium relative',
                activeTab === tab ? 'text-[#0f172a]' : 'text-[#64748b]'
              )}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563eb]"
                />
              )}
            </button>
          ))}
        </div>

        <Card padding="lg">
          {/* Today */}
          <div className="mb-8">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-[#0f172a] mb-4">
              <Calendar className="w-4 h-4 text-[#2563eb]" />
              Today
            </h2>
            {bookings.today.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 p-4 bg-[#f8fafc] rounded-xl"
              >
                <div className="w-14 h-16 bg-[#dbeafe] rounded-xl flex flex-col items-center justify-center">
                  <span className="text-xs text-[#2563eb] font-medium">
                    {booking.month}
                  </span>
                  <span className="text-xl font-bold text-[#2563eb]">
                    {booking.date}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={booking.avatar}
                    alt={booking.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-[#0f172a]">{booking.name}</p>
                    <Badge variant={statusColors[booking.status]} size="sm">
                      • {booking.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-[#2563eb]">{booking.role}</p>
                  <p className="text-sm text-[#64748b]">
                    Project: {booking.project}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-sm text-[#64748b]">
                    <Clock className="w-4 h-4" />
                    {booking.time}
                  </div>
                </div>
                <Button leftIcon={<Video className="w-4 h-4" />}>
                  Join Meeting
                </Button>
                <button className="p-2 text-[#64748b] hover:text-[#0f172a]">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* This Week */}
          <div className="mb-8">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-[#0f172a] mb-4">
              <Calendar className="w-4 h-4 text-[#64748b]" />
              This Week
            </h2>
            <div className="space-y-4">
              {bookings.thisWeek.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-[#f8fafc] rounded-xl"
                >
                  <div className="w-14 h-16 bg-white border border-[#e2e8f0] rounded-xl flex flex-col items-center justify-center">
                    <span className="text-xs text-[#64748b] font-medium">
                      {booking.month}
                    </span>
                    <span className="text-xl font-bold text-[#0f172a]">
                      {booking.date}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={booking.avatar}
                      alt={booking.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-[#0f172a]">{booking.name}</p>
                      <Badge variant={statusColors[booking.status]} size="sm">
                        • {booking.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#2563eb]">{booking.role}</p>
                    <p className="text-sm text-[#64748b]">
                      Project: {booking.project}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm text-[#64748b]">
                      <Clock className="w-4 h-4" />
                      {booking.time}
                    </div>
                  </div>
                  <Button variant="secondary">Details</Button>
                  <button className="p-2 text-[#64748b] hover:text-[#0f172a]">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Later */}
          <div>
            <h2 className="flex items-center gap-2 text-sm font-semibold text-[#0f172a] mb-4">
              <Calendar className="w-4 h-4 text-[#64748b]" />
              Later
            </h2>
            {bookings.later.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 p-4 bg-[#f8fafc] rounded-xl"
              >
                <div className="w-14 h-16 bg-white border border-[#e2e8f0] rounded-xl flex flex-col items-center justify-center">
                  <span className="text-xs text-[#64748b] font-medium">
                    {booking.month}
                  </span>
                  <span className="text-xl font-bold text-[#0f172a]">
                    {booking.date}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={booking.avatar}
                    alt={booking.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-[#0f172a]">{booking.name}</p>
                    <Badge variant={statusColors[booking.status]} size="sm">
                      • {booking.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-[#2563eb]">{booking.role}</p>
                  <p className="text-sm text-[#64748b]">
                    Project: {booking.project}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-sm text-[#64748b]">
                    <Clock className="w-4 h-4" />
                    {booking.time}
                  </div>
                </div>
                <Button variant="secondary">Manage</Button>
                <button className="p-2 text-[#64748b] hover:text-[#0f172a]">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Help Footer */}
        <div className="mt-8 text-center">
          <div className="w-12 h-12 bg-[#f1f5f9] rounded-full flex items-center justify-center mx-auto mb-3">
            <HelpCircle className="w-6 h-6 text-[#64748b]" />
          </div>
          <p className="text-sm text-[#64748b]">
            Need help with your bookings?
          </p>
          <Link
            href="/help"
            className="text-sm text-[#2563eb] hover:underline font-medium"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}

