'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Star,
  MapPin,
  Clock,
  Calendar,
  CheckCircle,
  Share2,
  Heart,
  MessageSquare,
  ExternalLink,
  Award,
} from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Button, Card, Badge, Avatar, StarRating } from '@/components/ui';
import { talents, sampleReviews } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

const tabs = ['About', 'Skills', 'Portfolio', 'Reviews'];

export default function TalentProfilePage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState('About');
  const [isSaved, setIsSaved] = useState(false);

  const talent = talents.find((t) => t.id === params.id) || talents[0];

  const portfolio = [
    {
      id: '1',
      title: 'NeoBank Mobile App',
      description: 'Flutter, API Integration',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      title: 'Fashion E-commerce',
      description: 'Flutter, Firebase',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    },
    {
      id: '3',
      title: 'Analytics Pro',
      description: 'Flutter Web, Charts',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    },
    {
      id: '4',
      title: 'Team Chat',
      description: 'WebSocket, UI Kit',
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop',
    },
  ];

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <Header variant="dashboard" user={{ name: 'Alex', role: 'client' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card padding="lg" className="mb-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Avatar and Basic Info */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden">
                    <Image
                      src={talent.avatar || ''}
                      alt={talent.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {talent.isOnline && (
                    <span className="absolute bottom-1 right-1 w-4 h-4 bg-[#10b981] border-2 border-white rounded-full" />
                  )}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-2xl font-bold text-[#0f172a]">
                        {talent.name}
                      </h1>
                      {talent.isVerified && (
                        <CheckCircle className="w-5 h-5 text-[#2563eb]" />
                      )}
                    </div>
                    <p className="text-[#2563eb] font-medium mb-2">
                      {talent.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#64748b]">
                      <StarRating
                        rating={talent.rating}
                        reviewCount={talent.reviewCount}
                      />
                      <span className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {talent.jobSuccess}% Job Success
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {talent.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" leftIcon={<Share2 className="w-4 h-4" />}>
                      Share
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      leftIcon={<Heart className={cn("w-4 h-4", isSaved && "fill-red-500 text-red-500")} />}
                      onClick={() => setIsSaved(!isSaved)}
                    >
                      Save
                    </Button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-6 mt-6 border-b border-[#e2e8f0]">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        'pb-3 text-sm font-medium transition-colors relative',
                        activeTab === tab
                          ? 'text-[#0f172a]'
                          : 'text-[#64748b] hover:text-[#0f172a]'
                      )}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563eb]"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <h2 className="text-lg font-bold text-[#0f172a] mb-4">
                  About Me
                </h2>
                <div className="text-[#475569] space-y-4">
                  <p>{talent.bio}</p>
                  <p>
                    Previously, I worked with top fintech startups to redesign
                    their mobile onboarding flows, resulting in a 40% increase
                    in user retention. I thrive in collaborative environments
                    and love tackling complex state management challenges.
                  </p>
                  <p>
                    Whether you need a full app built from scratch or
                    optimization of an existing codebase, I&apos;m here to help
                    bring your vision to life efficiently and effectively.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <h2 className="text-lg font-bold text-[#0f172a] mb-4">
                  Skills & Expertise
                </h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Flutter',
                    'Dart',
                    'Firebase',
                    'iOS Development',
                    'Android Development',
                    'REST APIs',
                    'GraphQL',
                    'UI/UX Design',
                    'Git',
                    'CI/CD',
                    'Clean Architecture',
                  ].map((skill) => (
                    <Badge key={skill} variant="outline" size="md">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Portfolio Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-[#0f172a]">Portfolio</h2>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {portfolio.map((item) => (
                    <div
                      key={item.id}
                      className="group relative rounded-xl overflow-hidden cursor-pointer"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <div className="text-white">
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-white/80">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Reviews Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <h2 className="text-lg font-bold text-[#0f172a] mb-6">
                  Client Reviews
                </h2>

                {/* Rating Summary */}
                <div className="flex items-start gap-8 mb-8 pb-8 border-b border-[#e2e8f0]">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-[#0f172a]">
                      {talent.rating}
                    </p>
                    <StarRating rating={talent.rating} showValue={false} />
                    <p className="text-sm text-[#64748b] mt-1">
                      Based on {talent.reviewCount} reviews
                    </p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const percentage =
                        stars === 5 ? 85 : stars === 4 ? 10 : stars === 3 ? 3 : 1;
                      return (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-sm w-3">{stars}</span>
                          <div className="flex-1 h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#2563eb] rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-[#64748b] w-10">
                            {percentage}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Review List */}
                <div className="space-y-6">
                  {sampleReviews.map((review) => (
                    <div key={review.id} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#2563eb] flex items-center justify-center text-white font-medium">
                        JD
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-[#0f172a]">John Doe</p>
                          <StarRating rating={review.rating} size="sm" showValue={false} />
                        </div>
                        <p className="text-xs text-[#64748b] mb-2">
                          {review.date}
                        </p>
                        <p className="text-[#475569]">{review.comment}</p>
                        {review.projectTitle && (
                          <p className="text-sm text-[#2563eb] mt-2">
                            Project: {review.projectTitle}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="secondary" className="w-full mt-6">
                  Read All Reviews
                </Button>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-24"
            >
              <Card padding="lg">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-3xl font-bold text-[#0f172a]">
                      {formatCurrency(talent.hourlyRate)}
                    </span>
                    <span className="text-[#64748b]">/hr</span>
                  </div>
                  <Badge variant="success">Available</Badge>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-[#64748b]" />
                    <div>
                      <p className="font-medium text-[#0f172a]">Next Available</p>
                      <p className="text-[#64748b]">{talent.nextAvailable}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-[#64748b]" />
                    <div>
                      <p className="font-medium text-[#0f172a]">Response Time</p>
                      <p className="text-[#64748b]">
                        Usually responds {talent.responseTime}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href={`/booking/${talent.id}`}>
                    <Button className="w-full" size="lg">
                      Book Session
                    </Button>
                  </Link>
                  <Button variant="secondary" className="w-full" size="lg" leftIcon={<MessageSquare className="w-4 h-4" />}>
                    Send Message
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-[#e2e8f0] text-xs text-[#64748b]">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-[#10b981]" />
                    Payment Protection
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-[#10b981]" />
                    Verified Talent
                  </span>
                </div>
              </Card>

              {/* Similar Talent */}
              <Card className="mt-6">
                <h3 className="font-semibold text-[#0f172a] mb-4">
                  Similar Talent
                </h3>
                {talents.slice(1, 3).map((t) => (
                  <Link
                    key={t.id}
                    href={`/talent/${t.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#f8fafc] transition-colors"
                  >
                    <Avatar src={t.avatar} name={t.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#0f172a] truncate">
                        {t.name}
                      </p>
                      <p className="text-xs text-[#64748b] truncate">{t.title}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </Link>
                ))}
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

