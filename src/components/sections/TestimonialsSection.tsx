'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Card } from '@/components/ui';
import { testimonials } from '@/data/mockData';

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-8 bg-[#2563eb] rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a]">
              What People Say
            </h2>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card variant="default" className="h-full">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]"
                    />
                  ))}
                </div>
                <p className="text-[#374151] mb-6 italic">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0f172a]">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-[#64748b]">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

