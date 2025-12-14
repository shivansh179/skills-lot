'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  Zap,
  Bug,
  Gauge,
  BarChart3,
  Image as ImageIcon,
  FileText,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Button, Card, Badge } from '@/components/ui';
import TalentCard from '@/components/TalentCard';
import { talents, quickTasks } from '@/data/mockData';
import { cn } from '@/lib/utils';

const categories = ['All', 'Developers', 'Designers', 'Marketers', 'Writers'];

const taskIcons: Record<string, React.ElementType> = {
  Bug,
  Zap: Gauge,
  BarChart: BarChart3,
  Image: ImageIcon,
  FileText,
  Shield,
};

export default function FindTalentPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <Header
        variant="dashboard"
        user={{ name: 'Alex Smith', role: 'client' }}
      />

      {/* Hero Search Section */}
      <section className="bg-gradient-to-b from-[#2563eb]/5 to-transparent py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mb-4">
              Find the perfect pro for your next sprint
            </h1>
            <p className="text-[#64748b]">
              Hire top-rated tech talent on demand.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills e.g. React, UI design..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-[#e2e8f0] rounded-xl text-[#0f172a] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent shadow-sm"
              />
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'px-5 py-2.5 rounded-full font-medium transition-all',
                  selectedCategory === category
                    ? 'bg-[#2563eb] text-white'
                    : 'bg-white text-[#64748b] hover:bg-[#f1f5f9] border border-[#e2e8f0]'
                )}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Top Rated Talent */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#0f172a]">
              Top Rated Talent
            </h2>
            <Button variant="ghost" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {talents.slice(0, 4).map((talent, index) => (
              <TalentCard key={talent.id} talent={talent} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tasks + Emergency Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#0f172a]">Quick Tasks</h2>
            <Button variant="ghost">Browse all</Button>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Quick Task Cards */}
            <div className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickTasks.map((task, index) => {
                const Icon = taskIcons[task.icon] || Bug;
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Card variant="hover" className="cursor-pointer">
                      <div className="w-10 h-10 bg-[#f1f5f9] rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-[#2563eb]" />
                      </div>
                      <h3 className="font-semibold text-[#0f172a] mb-1">
                        {task.title}
                      </h3>
                      <p className="text-sm text-[#64748b] mb-3">
                        {task.description}
                      </p>
                      <p className="text-sm font-medium text-[#0f172a]">
                        From ₹{task.price}
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Emergency Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card
                padding="lg"
                className="bg-[#0f172a] text-white h-full flex flex-col justify-between"
              >
                <div>
                  <Badge variant="danger" size="sm" className="mb-4">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
                    EMERGENCY
                  </Badge>
                  <h3 className="text-xl font-bold mb-2">
                    Server Down? Critical Bug?
                  </h3>
                  <p className="text-[#94a3b8] text-sm mb-6">
                    Connect with an expert engineer immediately. No waiting,
                    priority resolution.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#3b82f6] border-2 border-[#0f172a]"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-[#94a3b8]">
                      12 Experts online
                    </span>
                  </div>
                  <Button
                    className="w-full bg-[#ef4444] hover:bg-[#dc2626]"
                    leftIcon={<Zap className="w-4 h-4" />}
                  >
                    Get Help in 5 Minutes
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

