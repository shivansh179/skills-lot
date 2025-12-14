'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button, Avatar } from '@/components/ui';

const trustedAvatars = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#f8fafc] to-[#f1f5f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0f172a] leading-tight">
              Hire Tech Talent
              <br />
              by the Hour.
              <br />
              <span className="text-[#2563eb]">Instantly.</span>
            </h1>
            <p className="mt-6 text-lg text-[#64748b] max-w-lg">
              Access a vetted network of developers, designers & experts ready
              to solve your problems now.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/signup">
                <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Get Started
                </Button>
              </Link>
              <Link href="/find-talent">
                <Button variant="secondary" size="lg">
                  Offer Your Skills
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {trustedAvatars.map((avatar, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                  >
                    <Image
                      src={avatar}
                      alt="User"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#64748b]">
                Trusted by <span className="font-semibold text-[#0f172a]">10,000+</span> professionals
              </p>
            </div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
                alt="Team collaboration"
                width={600}
                height={400}
                className="object-cover"
                priority
              />
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute bottom-6 left-6 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-[#dcfce7] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#16a34a]" />
                </div>
                <div>
                  <p className="font-semibold text-[#0f172a] text-sm">Job Completed</p>
                  <p className="text-xs text-[#64748b]">Frontend React Developer hired in 15m</p>
                </div>
              </motion.div>
            </div>

            {/* Background Decorations */}
            <div className="absolute -z-10 top-10 right-10 w-72 h-72 bg-[#2563eb]/10 rounded-full blur-3xl" />
            <div className="absolute -z-10 bottom-10 left-10 w-48 h-48 bg-[#10b981]/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

