'use client';

import { motion } from 'framer-motion';
import { DollarSign, Zap, CheckCircle, Rocket } from 'lucide-react';
import { benefits } from '@/data/mockData';

const iconMap: Record<string, React.ElementType> = {
  DollarSign,
  Zap,
  CheckCircle,
  Rocket,
};

export default function BenefitsSection() {
  return (
    <section className="py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a]">
              Key Benefits
            </h2>
            <p className="mt-4 text-lg text-[#64748b]">
              Why thousands of businesses trust SkillSlot for their urgent
              technical needs.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = iconMap[benefit.icon];
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 bg-[#dbeafe] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#2563eb]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0f172a] mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-[#64748b]">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

