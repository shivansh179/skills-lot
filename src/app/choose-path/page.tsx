'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Code, ArrowRight, Zap } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { cn } from '@/lib/utils';

export default function ChoosePathPage() {
  const [selected, setSelected] = useState<'hire' | 'work' | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-white">
      {/* Header */}
      <header className="py-6 px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-[#0f172a]">SkillSlot</span>
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0f172a] mb-4">
            Choose your path
          </h1>
          <p className="text-lg text-[#64748b] max-w-lg mx-auto">
            How will you use SkillSlot today? One account handles both, but
            choose your primary mode to customize your experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Hire Talent */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <button
              onClick={() => setSelected('hire')}
              className="w-full text-left"
            >
              <Card
                variant="hover"
                padding="lg"
                className={cn(
                  'h-full cursor-pointer transition-all',
                  selected === 'hire' && 'ring-2 ring-[#2563eb] border-[#2563eb]'
                )}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-[#dbeafe] rounded-xl flex items-center justify-center">
                    <Briefcase className="w-7 h-7 text-[#2563eb]" />
                  </div>
                  <div
                    className={cn(
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                      selected === 'hire'
                        ? 'border-[#2563eb] bg-[#2563eb]'
                        : 'border-[#d1d5db]'
                    )}
                  >
                    {selected === 'hire' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-white rounded-full"
                      />
                    )}
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-[#0f172a] mb-3">
                  Hire Talent
                </h2>
                <p className="text-[#64748b]">
                  Find top-tier tech experts for your hourly projects instantly.
                  Post jobs, review proposals, and manage contracts seamlessly.
                </p>
              </Card>
            </button>
          </motion.div>

          {/* Work as Talent */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              onClick={() => setSelected('work')}
              className="w-full text-left"
            >
              <Card
                variant="hover"
                padding="lg"
                className={cn(
                  'h-full cursor-pointer transition-all',
                  selected === 'work' && 'ring-2 ring-[#2563eb] border-[#2563eb]'
                )}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-[#dbeafe] rounded-xl flex items-center justify-center">
                    <Code className="w-7 h-7 text-[#2563eb]" />
                  </div>
                  <div
                    className={cn(
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                      selected === 'work'
                        ? 'border-[#2563eb] bg-[#2563eb]'
                        : 'border-[#d1d5db]'
                    )}
                  >
                    {selected === 'work' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-white rounded-full"
                      />
                    )}
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-[#0f172a] mb-3">
                  Work as Talent
                </h2>
                <p className="text-[#64748b]">
                  Offer your expertise and earn money on your own schedule. Build
                  your professional profile and get matched with top clients.
                </p>
              </Card>
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href={selected === 'hire' ? '/dashboard' : selected === 'work' ? '/talent/dashboard' : '#'}
          >
            <Button
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              disabled={!selected}
              className="min-w-[200px]"
            >
              Get Started
            </Button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}

