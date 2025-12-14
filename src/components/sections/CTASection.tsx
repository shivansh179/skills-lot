'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

export default function CTASection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#2563eb] rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to find your expert?
          </h2>
          <p className="text-[#bfdbfe] mb-8 max-w-lg mx-auto">
            Join thousands of companies building faster with SkillSlot.
          </p>
          <Link href="/signup">
            <Button
              variant="secondary"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="bg-white text-[#2563eb] hover:bg-[#f8fafc]"
            >
              Get Started Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

