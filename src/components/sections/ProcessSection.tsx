'use client';

import { motion } from 'framer-motion';
import { Search, Calendar, Clock } from 'lucide-react';
import { Card } from '@/components/ui';
import { processSteps } from '@/data/mockData';

const iconMap: Record<string, React.ElementType> = {
  Search,
  Calendar,
  Clock,
};

export default function ProcessSection() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider">
            PROCESS
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0f172a]">
            Simple 3-Step Process
          </h2>
          <p className="mt-4 text-lg text-[#64748b] max-w-2xl mx-auto">
            Get the help you need without the friction. We&apos;ve streamlined hiring
            down to minutes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {processSteps.map((step, index) => {
            const Icon = iconMap[step.icon];
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="hover" className="h-full text-center">
                  <div className="w-14 h-14 bg-[#f1f5f9] rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-6 h-6 text-[#2563eb]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0f172a] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#64748b]">{step.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

