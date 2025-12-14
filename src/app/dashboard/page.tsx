'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Briefcase,
  MessageSquare,
  CreditCard,
  Calendar,
  Heart,
  Settings,
  HelpCircle,
  Plus,
  Search,
  Bell,
  LayoutDashboard,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Zap,
  Check,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { Button, Card, Badge, Avatar } from '@/components/ui';
import { searchTalents, getTopRatedTalents, TalentProfile, getAuthToken } from '@/lib/api';
import { formatCurrency, cn } from '@/lib/utils';

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', active: true },
  { icon: Calendar, label: 'Bookings', href: '/bookings' },
  { icon: Heart, label: 'Saved Talent', href: '/saved' },
  { icon: MessageSquare, label: 'Messages', href: '/messages', badge: 3 },
  { icon: CreditCard, label: 'Payments', href: '/payments' },
];

const skillFilters = [
  { label: 'JavaScript', count: 120 },
  { label: 'Python', count: 85 },
  { label: 'React Native', count: 40 },
  { label: 'UI/UX Design', count: 65 },
];

const categories = ['All', 'Developers', 'Designers', 'Marketers', 'Writers'];

export default function DashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState<TalentProfile[]>([]);
  const [topRatedTalents, setTopRatedTalents] = useState<TalentProfile[]>([]);
  const [isLoadingTopRated, setIsLoadingTopRated] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['JavaScript']);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('Relevance');

  // Check auth on mount
  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push('/login');
      return;
    }
    loadTopRatedTalents();
  }, [router]);

  const loadTopRatedTalents = async () => {
    setIsLoadingTopRated(true);
    const result = await getTopRatedTalents();
    if (result.success && result.data) {
      setTopRatedTalents(result.data);
    }
    setIsLoadingTopRated(false);
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setHasSearched(true);
    
    const result = await searchTalents(searchQuery.trim());
    if (result.success && result.data) {
      setSearchResults(result.data);
    } else {
      setSearchResults([]);
    }
    setIsSearching(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleSkillFilter = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const resetFilters = () => {
    setSelectedSkills([]);
    setSearchQuery('');
    setHasSearched(false);
    setSearchResults([]);
  };

  // Determine which talents to display
  const displayedTalents = hasSearched ? searchResults : topRatedTalents;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <header className="bg-white border-b border-[#e2e8f0] sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#0f172a]">SkillSlot</span>
            </Link>
            <div className="hidden md:flex items-center ml-8 w-80">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
                <input
                  type="text"
                  placeholder="Search talent..."
                  className="w-full pl-10 pr-4 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                />
              </div>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/find-talent" className="text-[#64748b] hover:text-[#0f172a] font-medium">
              Find Talent
            </Link>
            <Link href="/find-work" className="text-[#64748b] hover:text-[#0f172a] font-medium">
              Find Work
            </Link>
            <Link href="/enterprise" className="text-[#64748b] hover:text-[#0f172a] font-medium">
              Enterprise
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button size="sm">Post a Job</Button>
            <button className="relative p-2 text-[#64748b] hover:text-[#0f172a]">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              name="Alex Smith"
              size="sm"
            />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-[#e2e8f0] min-h-[calc(100vh-65px)] p-6 hidden lg:block">
          <div className="flex items-center gap-3 mb-8">
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              name="Alex Smith"
              size="lg"
            />
            <div>
              <p className="font-semibold text-[#0f172a]">Alex Smith</p>
              <p className="text-xs text-[#64748b]">Client Account</p>
            </div>
          </div>

          <Link href="/post-job">
            <Button className="w-full mb-6" leftIcon={<Plus className="w-4 h-4" />}>
              Post a Job
            </Button>
          </Link>

          <nav className="space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors',
                  link.active
                    ? 'bg-[#dbeafe] text-[#2563eb]'
                    : 'text-[#64748b] hover:bg-[#f1f5f9]'
                )}
              >
                <div className="flex items-center gap-3">
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </div>
                {link.badge && (
                  <Badge variant="danger" size="sm">
                    {link.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-[#e2e8f0] mt-8">
            <Link
              href="/settings"
              className="flex items-center gap-3 px-3 py-2.5 text-[#64748b] hover:bg-[#f1f5f9] rounded-lg"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </Link>
            <Link
              href="/help"
              className="flex items-center gap-3 px-3 py-2.5 text-[#64748b] hover:bg-[#f1f5f9] rounded-lg"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="font-medium">Help Center</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Breadcrumb */}
          <div className="px-8 pt-6">
            <div className="flex items-center gap-2 text-sm text-[#64748b] mb-4">
              <Link href="/" className="hover:text-[#0f172a]">Home</Link>
              <span>/</span>
              <span className="text-[#0f172a]">Search Results</span>
            </div>
          </div>

          <div className="flex">
            {/* Filters Sidebar */}
            <div className="w-64 p-6 hidden xl:block">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#0f172a]">Filter By</h2>
                <button
                  onClick={resetFilters}
                  className="text-sm text-[#2563eb] hover:underline font-medium"
                >
                  Reset
                </button>
              </div>

              {/* Hourly Rate */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-[#0f172a] mb-4">
                  Hourly Rate
                </h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="20"
                    max="150"
                    className="w-full accent-[#2563eb]"
                  />
                  <div className="flex justify-between text-xs text-[#64748b] mt-1">
                    <span>$20</span>
                    <span>$150+</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-[#0f172a]">Skills</h3>
                  <ChevronDown className="w-4 h-4 text-[#64748b]" />
                </div>
                <div className="space-y-3">
                  {skillFilters.map((skill) => (
                    <label
                      key={skill.label}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSkills.includes(skill.label)}
                        onChange={() => toggleSkillFilter(skill.label)}
                        className="w-4 h-4 rounded border-[#d1d5db] text-[#2563eb] focus:ring-[#2563eb]"
                      />
                      <span className="text-sm text-[#475569]">
                        {skill.label}
                      </span>
                      <span className="text-xs text-[#94a3b8] ml-auto">
                        ({skill.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-[#0f172a]">
                    Experience Level
                  </h3>
                  <ChevronDown className="w-4 h-4 text-[#64748b]" />
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-[#0f172a]">Rating</h3>
                  <ChevronDown className="w-4 h-4 text-[#64748b]" />
                </div>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      className="w-4 h-4 border-[#d1d5db] text-[#2563eb] focus:ring-[#2563eb]"
                    />
                    <span className="text-sm text-[#475569] flex items-center gap-1">
                      4.5 & up <Star className="w-3 h-3 fill-[#fbbf24] text-[#fbbf24]" />
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      className="w-4 h-4 border-[#d1d5db] text-[#2563eb] focus:ring-[#2563eb]"
                    />
                    <span className="text-sm text-[#475569] flex items-center gap-1">
                      4.0 & up <Star className="w-3 h-3 fill-[#fbbf24] text-[#fbbf24]" />
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Results Area */}
            <div className="flex-1 p-6">
              {/* Trending Talents */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-[#0f172a]">
                    Trending on SkillSlot
                  </h2>
                  <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    View all
                  </Button>
                </div>
                
                {isLoadingTopRated ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-[#2563eb]" />
                  </div>
                ) : (
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {topRatedTalents.slice(0, 3).map((talent, index) => (
                      <Card
                        key={talent.id || index}
                        variant="hover"
                        className="min-w-[280px] cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <Avatar
                            src={talent.avatar}
                            name={talent.fullName}
                            size="md"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-semibold text-[#0f172a] truncate">
                                {talent.fullName}
                              </p>
                              <span className="text-sm font-bold text-[#0f172a]">
                                ${talent.hourlyRate || 80}/hr
                              </span>
                            </div>
                            <p className="text-sm text-[#2563eb] truncate">
                              {talent.title || 'Developer'}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {(talent.skills || ['React', 'TypeScript']).slice(0, 2).map((skill) => (
                                <Badge key={skill} variant="outline" size="sm">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-1 mt-2">
                              <Star className="w-3 h-3 fill-[#fbbf24] text-[#fbbf24]" />
                              <span className="text-sm font-medium">
                                {talent.rating?.toFixed(1) || '5.0'}
                              </span>
                              <span className="text-xs text-[#64748b]">
                                ({talent.jobsCompleted || talent.reviewCount || 42} jobs)
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Search Bar */}
              <div className="mb-6">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Search skills e.g. Java, React, Python..."
                    className="w-full pl-12 pr-32 py-4 bg-white border border-[#e2e8f0] rounded-xl text-[#0f172a] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#2563eb] shadow-sm"
                  />
                  <Button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    isLoading={isSearching}
                  >
                    Search
                  </Button>
                </form>
              </div>

              {/* Search Results Header */}
              {hasSearched && (
                <div className="flex items-center justify-between mb-6">
                  <p className="text-[#475569]">
                    Showing{' '}
                    <span className="font-semibold text-[#0f172a]">
                      {searchResults.length} results
                    </span>{' '}
                    for &quot;<span className="font-semibold">{searchQuery}</span>&quot;
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#64748b]">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-1.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                    >
                      <option>Relevance</option>
                      <option>Highest Rated</option>
                      <option>Lowest Price</option>
                      <option>Highest Price</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Talents Grid */}
              {isSearching ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-10 h-10 animate-spin text-[#2563eb]" />
                </div>
              ) : hasSearched && searchResults.length === 0 ? (
                <Card className="text-center py-12">
                  <div className="w-16 h-16 bg-[#f1f5f9] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-[#94a3b8]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0f172a] mb-2">
                    No talents found
                  </h3>
                  <p className="text-[#64748b] mb-4">
                    Try adjusting your search or filters
                  </p>
                  <Button variant="secondary" onClick={resetFilters}>
                    Clear Filters
                  </Button>
                </Card>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {displayedTalents.map((talent, index) => (
                      <motion.div
                        key={talent.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <Card variant="hover" className="h-full">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <Avatar
                                  src={talent.avatar}
                                  name={talent.fullName}
                                  size="lg"
                                />
                                {talent.isOnline && (
                                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#10b981] border-2 border-white rounded-full" />
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-1">
                                  <p className="font-bold text-[#0f172a]">
                                    {talent.fullName}
                                  </p>
                                  {talent.isVerified && (
                                    <Check className="w-4 h-4 text-[#2563eb]" />
                                  )}
                                </div>
                                <p className="text-sm text-[#64748b]">
                                  {talent.title || 'Developer'}
                                </p>
                              </div>
                            </div>
                            <span className="text-lg font-bold text-[#0f172a]">
                              ${talent.hourlyRate || 85}/hr
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                            <span className="font-medium text-[#0f172a]">
                              {talent.rating?.toFixed(1) || '4.9'}
                            </span>
                            <span className="text-sm text-[#2563eb]">
                              ({talent.jobsCompleted || talent.reviewCount || 124} jobs)
                            </span>
                          </div>

                          <p className="text-sm text-[#475569] mb-4 line-clamp-2">
                            {talent.bio ||
                              '10+ years of experience building scalable web applications. Expert in modern frameworks and best practices.'}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {(talent.skills || ['React', 'Node.js', 'MongoDB']).slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="outline" size="sm">
                                {skill}
                              </Badge>
                            ))}
                            {(talent.skills?.length || 3) > 3 && (
                              <Badge variant="default" size="sm">
                                +{(talent.skills?.length || 3) - 3}
                              </Badge>
                            )}
                          </div>

                          <div className="flex gap-2 pt-4 border-t border-[#e2e8f0]">
                            <Link href={`/talent/${talent.id}`} className="flex-1">
                              <Button className="w-full">Hire Now</Button>
                            </Link>
                            <Link href={`/talent/${talent.id}`}>
                              <Button variant="secondary">Profile</Button>
                            </Link>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {displayedTalents.length > 0 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        className="p-2 rounded-lg border border-[#e2e8f0] text-[#64748b] hover:bg-[#f1f5f9] disabled:opacity-50"
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      {[1, 2, 3].map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={cn(
                            'w-10 h-10 rounded-lg font-medium transition-colors',
                            currentPage === page
                              ? 'bg-[#2563eb] text-white'
                              : 'border border-[#e2e8f0] text-[#64748b] hover:bg-[#f1f5f9]'
                          )}
                        >
                          {page}
                        </button>
                      ))}
                      <span className="text-[#64748b]">...</span>
                      <button
                        onClick={() => setCurrentPage(12)}
                        className="w-10 h-10 rounded-lg border border-[#e2e8f0] font-medium text-[#64748b] hover:bg-[#f1f5f9]"
                      >
                        12
                      </button>
                      <button
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="p-2 rounded-lg border border-[#e2e8f0] text-[#64748b] hover:bg-[#f1f5f9]"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
