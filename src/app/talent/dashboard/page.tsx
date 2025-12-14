'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Calendar,
  Eye,
  Video,
  TrendingUp,
  Clock,
  Edit,
  Plus,
  Rocket,
  HelpCircle,
  Search,
  Bell,
  Zap,
} from 'lucide-react';
import { Button, Card, Badge, Avatar } from '@/components/ui';
import { cn } from '@/lib/utils';

const skills = ['React', 'TypeScript', 'Node.js', 'Python', 'UI Design'];

const todaySchedule = [
  {
    id: '1',
    title: 'Code Review with Acme Corp',
    time: '2:00 PM - 3:00 PM',
    project: 'React Project',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Architecture Planning',
    time: '4:30 PM - 5:30 PM',
    project: 'Backend Scale',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Introductory Call',
    time: '9:00 AM - 9:30 AM',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    status: 'completed',
  },
];

export default function TalentDashboardPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <header className="bg-white border-b border-[#e2e8f0] sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#0f172a]">SkillSlot</span>
            </Link>
            <div className="hidden md:flex items-center ml-8 w-80">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
                <input
                  type="text"
                  placeholder="Search jobs, skills..."
                  className="w-full pl-10 pr-4 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                />
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/talent/dashboard" className="text-[#2563eb] font-medium">
              Dashboard
            </Link>
            <Link href="/talent/calendar" className="text-[#64748b] hover:text-[#0f172a] font-medium">
              Calendar
            </Link>
            <Link href="/talent/earnings" className="text-[#64748b] hover:text-[#0f172a] font-medium">
              Earnings
            </Link>
            <Link href="/talent/profile" className="text-[#64748b] hover:text-[#0f172a] font-medium">
              Profile
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-[#64748b] hover:text-[#0f172a]">
              <Bell className="w-5 h-5" />
            </button>
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              name="Alex"
              size="sm"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-[#0f172a] mb-1">
              Welcome back, Alex
            </h1>
            <p className="text-[#64748b]">
              Here&apos;s what&apos;s happening today.
            </p>
          </div>
          <Button variant="secondary" leftIcon={<Calendar className="w-4 h-4" />}>
            Availability
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            {
              label: 'EARNINGS (THIS WEEK)',
              value: '$1,240',
              change: '+12% vs last week',
              icon: DollarSign,
            },
            {
              label: 'UPCOMING SESSIONS',
              value: '3',
              subtext: 'sessions today',
              extra: 'Next: 2:00 PM',
              icon: Calendar,
            },
            {
              label: 'PROFILE VIEWS',
              value: '142',
              badge: 'High visibility',
              icon: Eye,
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card>
                <div className="flex items-start justify-between mb-4">
                  <p className="text-xs text-[#2563eb] font-medium tracking-wider">
                    {stat.label}
                  </p>
                  <div className="w-10 h-10 bg-[#dbeafe] rounded-xl flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-[#2563eb]" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-[#0f172a] mb-2">
                  {stat.value}
                </p>
                {stat.change && (
                  <Badge variant="success" size="sm">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change}
                  </Badge>
                )}
                {stat.subtext && (
                  <p className="text-sm text-[#64748b]">{stat.subtext}</p>
                )}
                {stat.extra && (
                  <p className="text-sm text-[#64748b] mt-1">{stat.extra}</p>
                )}
                {stat.badge && (
                  <Badge variant="success" size="sm">
                    <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full mr-1.5" />
                    {stat.badge}
                  </Badge>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#0f172a]">
                  Today&apos;s Schedule
                </h2>
                <Button variant="ghost" size="sm">
                  View Calendar
                </Button>
              </div>
              <div className="space-y-4">
                {todaySchedule.map((session) => (
                  <div
                    key={session.id}
                    className={cn(
                      'flex items-center justify-between p-4 rounded-lg',
                      session.status === 'completed'
                        ? 'bg-[#f1f5f9] opacity-60'
                        : 'bg-[#f8fafc]'
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={session.avatar}
                          alt="Client"
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p
                          className={cn(
                            'font-semibold',
                            session.status === 'completed'
                              ? 'text-[#94a3b8] line-through'
                              : 'text-[#0f172a]'
                          )}
                        >
                          {session.title}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-[#64748b]">
                          <Clock className="w-3 h-3" />
                          {session.time}
                          {session.project && (
                            <>
                              <span>•</span>
                              <span className="text-[#2563eb]">{session.project}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {session.status === 'upcoming' && (
                      <Button size="sm" leftIcon={<Video className="w-4 h-4" />}>
                        Join Call
                      </Button>
                    )}
                    {session.status === 'completed' && (
                      <span className="text-sm text-[#94a3b8]">Completed</span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Skills Card */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#0f172a]">Your Skills</h3>
                <Button variant="ghost" size="sm" leftIcon={<Edit className="w-3 h-3" />}>
                  Edit
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
                <button className="w-8 h-8 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:bg-[#e2e8f0]">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </Card>

            {/* Boost Card */}
            <Card className="bg-[#2563eb] text-white">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <Rocket className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-2">Boost your profile</h3>
              <p className="text-[#bfdbfe] text-sm mb-4">
                Get 2x more views from top companies by verifying your skills.
              </p>
              <Button className="bg-white text-[#2563eb] hover:bg-[#f8fafc]">
                Boost Now
              </Button>
            </Card>

            {/* Help Card */}
            <Card className="bg-[#f8fafc]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#e2e8f0] rounded-full flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-[#64748b]" />
                </div>
                <div>
                  <p className="font-medium text-[#0f172a]">Need Help?</p>
                  <Link
                    href="/help"
                    className="text-sm text-[#2563eb] hover:underline"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

