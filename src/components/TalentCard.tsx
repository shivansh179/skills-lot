'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Avatar, Badge, Button, Card, StarRating } from '@/components/ui';
import { Talent } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface TalentCardProps {
  talent: Talent;
  index?: number;
}

export default function TalentCard({ talent, index = 0 }: TalentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card variant="hover" className="h-full">
        <div className="flex items-start justify-between mb-4">
          <Avatar
            src={talent.avatar}
            name={talent.name}
            size="lg"
            isOnline={talent.isOnline}
          />
          <Badge variant="primary" size="sm">
            ★ {talent.rating.toFixed(1)}
          </Badge>
        </div>

        <h3 className="font-bold text-[#0f172a] text-lg">{talent.name}</h3>
        <p className="text-[#64748b] text-sm mb-3">{talent.title}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {talent.skills.slice(0, 2).map((skill) => (
            <Badge key={skill} variant="outline" size="sm">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#e2e8f0]">
          <div>
            <p className="text-xs text-[#64748b]">Rate</p>
            <p className="font-bold text-[#0f172a]">
              {formatCurrency(talent.hourlyRate)}/hr
            </p>
          </div>
          <Link href={`/talent/${talent.id}`}>
            <Button size="sm" variant="outline">
              Book Now
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}

