'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code, Palette, TrendingUp, FileText } from 'lucide-react';
import { Card } from '@/components/ui';
import { categories } from '@/data/mockData';

const iconMap: Record<string, React.ElementType> = {
  Code,
  Palette,
  TrendingUp,
  FileText,
};

export default function CategoriesSection() {
  return (
    <section id="categories" className="py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a]">
            Explore Categories
          </h2>
          <p className="mt-4 text-lg text-[#64748b]">
            Find the specific talent you need right now.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon];
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/find-talent?category=${category.name.toLowerCase()}`}>
                  <Card
                    variant="hover"
                    className="text-center cursor-pointer group"
                  >
                    <div className="w-14 h-14 bg-[#dbeafe] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#2563eb] transition-colors">
                      <Icon className="w-6 h-6 text-[#2563eb] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-semibold text-[#0f172a]">
                      {category.name}
                    </h3>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

