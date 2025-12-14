'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Calendar,
  Clock,
  FileText,
  Eye,
  MessageSquare,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { Button, Card, Badge, Avatar } from '@/components/ui';
import { talents } from '@/data/mockData';

export default function BookingConfirmationPage() {
  const talent = talents[0];

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <header className="bg-white border-b border-[#e2e8f0] py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#0f172a]">SkillSlot</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/find-talent"
              className="text-[#64748b] hover:text-[#0f172a] font-medium"
            >
              Find Talent
            </Link>
            <Link
              href="/bookings"
              className="text-[#64748b] hover:text-[#0f172a] font-medium"
            >
              My Bookings
            </Link>
            <Link
              href="/messages"
              className="text-[#64748b] hover:text-[#0f172a] font-medium"
            >
              Messages
            </Link>
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              name="User"
              size="sm"
            />
          </nav>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card padding="lg" className="text-center">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 bg-[#dcfce7] rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-[#16a34a]" />
            </motion.div>

            <h1 className="text-3xl font-bold text-[#0f172a] mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-[#64748b] mb-8">
              Your session has been successfully scheduled.
              <br />
              We&apos;ve sent a confirmation email to your inbox.
            </p>

            {/* Booking Details Card */}
            <div className="bg-[#f8fafc] rounded-xl p-6 mb-8 text-left">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full overflow-hidden">
                      <Image
                        src={talent.avatar || ''}
                        alt={talent.name}
                        width={56}
                        height={56}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[#2563eb] font-medium uppercase tracking-wider">
                      TALENT
                    </p>
                    <p className="font-bold text-[#0f172a]">{talent.name}</p>
                    <p className="text-sm text-[#64748b]">{talent.title}</p>
                  </div>
                </div>
                <Link
                  href={`/talent/${talent.id}`}
                  className="flex items-center gap-1 text-sm text-[#2563eb] hover:underline"
                >
                  <Eye className="w-4 h-4" />
                  View Profile
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#2563eb] font-medium uppercase tracking-wider mb-1">
                    <Calendar className="w-3 h-3" />
                    DATE & TIME
                  </div>
                  <p className="font-semibold text-[#0f172a]">Oct 24, 2023</p>
                  <p className="text-[#64748b]">2:00 PM - 3:00 PM EST</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#2563eb] font-medium uppercase tracking-wider mb-1">
                    <FileText className="w-3 h-3" />
                    REFERENCE ID
                  </div>
                  <p className="font-semibold text-[#0f172a]">#SK-8829-LM</p>
                  <Badge variant="success" size="sm">
                    Paid
                  </Badge>
                </div>
              </div>

              {/* Calendar Integration */}
              <div className="mt-6 pt-6 border-t border-[#e2e8f0]">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#64748b]">Add to calendar:</span>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" leftIcon={<Calendar className="w-4 h-4" />}>
                      Google
                    </Button>
                    <Button variant="secondary" size="sm" leftIcon={<Calendar className="w-4 h-4" />}>
                      Outlook
                    </Button>
                    <Button variant="secondary" size="sm" leftIcon={<ExternalLink className="w-4 h-4" />}>
                      iCal
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/messages">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  leftIcon={<MessageSquare className="w-4 h-4" />}
                >
                  Message {talent.name.split(' ')[0]}
                </Button>
              </Link>
              <Link href="/bookings">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  leftIcon={<Calendar className="w-4 h-4" />}
                >
                  My Bookings
                </Button>
              </Link>
            </div>

            <p className="mt-8 text-sm text-[#64748b]">
              Need to reschedule?{' '}
              <Link href="/help" className="text-[#2563eb] hover:underline">
                Visit the Help Center
              </Link>
            </p>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}

