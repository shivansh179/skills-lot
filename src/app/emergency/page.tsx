'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Server,
  Bug,
  Shield,
  Database,
  ArrowRight,
  Lock,
  Zap,
  LayoutDashboard,
} from 'lucide-react';
import { Button, Card, Badge, Avatar } from '@/components/ui';
import { cn } from '@/lib/utils';

const issueTypes = [
  {
    id: 'server',
    icon: Server,
    title: 'Server Outage',
    description: 'Website or app is completely inaccessible',
  },
  {
    id: 'bug',
    icon: Bug,
    title: 'Critical Bug Fix',
    description: 'Core functionality is broken',
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Security Breach',
    description: 'Suspected hack or data leak',
  },
  {
    id: 'database',
    icon: Database,
    title: 'Database Failure',
    description: 'Data is corrupted or unreadable',
  },
];

const howItWorks = [
  'We broadcast your issue to top-tier experts available now.',
  'The first qualified expert accepts and joins a secure chat.',
  'Billing starts only when you approve the expert.',
];

export default function EmergencyPage() {
  const [selectedIssue, setSelectedIssue] = useState('server');
  const [asapPriority, setAsapPriority] = useState(true);
  const [description, setDescription] = useState('');

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <header className="bg-white border-b border-[#e2e8f0] sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#0f172a]">SkillSlot</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-[#64748b] hover:text-[#0f172a]"
            >
              <LayoutDashboard className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <div className="w-8 h-8 bg-[#f1f5f9] rounded-full flex items-center justify-center text-sm font-medium text-[#64748b]">
              JD
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-[#0f172a] mb-2">
              Emergency Tech Support
            </h1>
            <p className="text-[#64748b]">
              Describe your issue. We&apos;ll match you with a vetted expert in
              minutes.
            </p>
          </div>
          <Badge variant="success" size="md">
            <span className="w-2 h-2 bg-[#10b981] rounded-full mr-2 animate-pulse" />
            12 Experts Online
          </Badge>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Issue Type */}
            <Card>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-[#dbeafe] rounded-full flex items-center justify-center text-sm font-bold text-[#2563eb]">
                  1
                </div>
                <h2 className="text-lg font-bold text-[#0f172a]">
                  Select Issue Type
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {issueTypes.map((issue) => (
                  <button
                    key={issue.id}
                    onClick={() => setSelectedIssue(issue.id)}
                    className={cn(
                      'p-4 rounded-xl text-left transition-all border-2',
                      selectedIssue === issue.id
                        ? 'border-[#2563eb] bg-[#dbeafe]/30'
                        : 'border-[#e2e8f0] hover:border-[#cbd5e1]'
                    )}
                  >
                    <div
                      className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center mb-3',
                        selectedIssue === issue.id
                          ? 'bg-[#2563eb]'
                          : 'bg-[#f1f5f9]'
                      )}
                    >
                      <issue.icon
                        className={cn(
                          'w-5 h-5',
                          selectedIssue === issue.id
                            ? 'text-white'
                            : 'text-[#64748b]'
                        )}
                      />
                    </div>
                    <h3 className="font-semibold text-[#0f172a] mb-1">
                      {issue.title}
                    </h3>
                    <p className="text-sm text-[#64748b]">{issue.description}</p>
                  </button>
                ))}
              </div>
            </Card>

            {/* Describe Problem */}
            <Card>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-[#f1f5f9] rounded-full flex items-center justify-center text-sm font-bold text-[#64748b]">
                  2
                </div>
                <h2 className="text-lg font-bold text-[#0f172a]">
                  Describe the Problem
                </h2>
              </div>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please provide specific details about what is happening. What were you doing when the issue occurred? Are there any error messages?"
                className="w-full h-40 p-4 border border-[#e2e8f0] rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-[#0f172a] placeholder:text-[#9ca3af]"
              />
              <div className="flex justify-end mt-2">
                <span className="text-xs text-[#9ca3af]">
                  {description.length}/500
                </span>
              </div>

              <div className="flex gap-3 mt-4">
                <Button variant="secondary" size="sm" leftIcon={<Server className="w-4 h-4" />}>
                  Attach Screenshot
                </Button>
                <Button variant="secondary" size="sm" leftIcon={<Database className="w-4 h-4" />}>
                  Share Logs
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            <Card>
              <h2 className="text-lg font-bold text-[#0f172a] mb-6">
                Request Summary
              </h2>

              {/* ASAP Priority Toggle */}
              <div className="flex items-center justify-between p-4 bg-[#fef2f2] rounded-xl mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#dc2626] rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0f172a]">ASAP Priority</p>
                    <p className="text-xs text-[#64748b]">Response &lt; 5 mins</p>
                  </div>
                </div>
                <button
                  onClick={() => setAsapPriority(!asapPriority)}
                  className={cn(
                    'w-12 h-6 rounded-full transition-colors relative',
                    asapPriority ? 'bg-[#dc2626]' : 'bg-[#d1d5db]'
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
                      asapPriority ? 'right-1' : 'left-1'
                    )}
                  />
                </button>
              </div>

              {/* Rate */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#64748b]">Estimated Rate</span>
                  <span className="text-sm text-[#64748b]">Hourly</span>
                </div>
                <p className="text-3xl font-bold text-[#0f172a]">
                  $120 - $150<span className="text-lg font-normal">/hr</span>
                </p>
                <p className="text-xs text-[#64748b] mt-2">
                  Rates may vary based on complexity and duration. A minimum of 1
                  hour is charged for emergency requests.
                </p>
              </div>

              <Button
                className="w-full bg-[#dc2626] hover:bg-[#b91c1c]"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Request Help Now
              </Button>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[#64748b]">
                <Lock className="w-3 h-3" />
                Secure payment hold until resolved
              </div>
            </Card>

            {/* How It Works */}
            <Card className="bg-[#f8fafc]">
              <h3 className="font-semibold text-[#0f172a] mb-4">How it works</h3>
              <ul className="space-y-3">
                {howItWorks.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#2563eb] rounded-full mt-1.5 flex-shrink-0" />
                    <span className="text-sm text-[#475569]">{step}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-[#64748b] border-t border-[#e2e8f0] mt-12">
        © 2024 SkillSlot Inc. Emergency Support Protocol.
      </footer>
    </div>
  );
}

