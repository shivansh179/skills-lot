'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  User,
  CreditCard,
  Briefcase,
  Settings,
  Link as LinkIcon,
  Eye,
  Camera,
  X,
  Plus,
  Check,
  Zap,
  Bell,
} from 'lucide-react';
import { Button, Card, Badge, Avatar, Input } from '@/components/ui';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { icon: User, label: 'General Profile', href: '/talent/profile', active: true },
  { icon: CreditCard, label: 'Rates & Availability', href: '/talent/rates' },
  { icon: Briefcase, label: 'Portfolio', href: '/talent/portfolio' },
  { icon: LinkIcon, label: 'Integrations', href: '/talent/integrations' },
  { icon: Settings, label: 'Account Settings', href: '/talent/settings' },
];

const skills = ['React', 'Node.js', 'TypeScript', 'Figma', 'Tailwind CSS'];

const availability = [
  { day: 'Mon', status: 'full' },
  { day: 'Tue', status: 'full' },
  { day: 'Wed', status: 'full' },
  { day: 'Thu', status: 'am' },
  { day: 'Fri', status: 'off' },
  { day: 'Sat', status: 'off' },
  { day: 'Sun', status: 'off' },
];

const portfolio = [
  {
    id: '1',
    title: 'E-commerce Dashboard',
    tech: 'React, Chart.js',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    title: 'Fintech Mobile App',
    tech: 'React Native, Firebase',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop',
  },
];

export default function TalentProfilePage() {
  const [acceptingClients, setAcceptingClients] = useState(true);
  const [skillInput, setSkillInput] = useState('');
  const [currentSkills, setCurrentSkills] = useState(skills);

  const addSkill = () => {
    if (skillInput.trim() && !currentSkills.includes(skillInput.trim())) {
      setCurrentSkills([...currentSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setCurrentSkills(currentSkills.filter((s) => s !== skill));
  };

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
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/find-talent" className="text-[#64748b] hover:text-[#0f172a] font-medium">
              Find Talent
            </Link>
            <Link href="/talent/jobs" className="text-[#64748b] hover:text-[#0f172a] font-medium">
              My Jobs
            </Link>
            <Link href="/messages" className="text-[#64748b] hover:text-[#0f172a] font-medium">
              Messages
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="p-2 text-[#64748b] hover:text-[#0f172a]">
              <Bell className="w-5 h-5" />
            </button>
            <Avatar
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
              name="Alex Morgan"
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
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
              name="Alex Morgan"
              size="lg"
            />
            <div>
              <p className="font-semibold text-[#0f172a]">Alex Morgan</p>
              <p className="text-xs text-[#2563eb]">Full Stack Developer</p>
            </div>
          </div>

          <nav className="space-y-1 mb-8">
            {sidebarLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                  link.active
                    ? 'bg-[#dbeafe] text-[#2563eb]'
                    : 'text-[#64748b] hover:bg-[#f1f5f9]'
                )}
              >
                <link.icon className="w-5 h-5" />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Profile Strength */}
          <div className="p-4 bg-[#f8fafc] rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#0f172a]">
                Profile Strength
              </span>
              <span className="text-sm font-bold text-[#2563eb]">80%</span>
            </div>
            <div className="w-full h-2 bg-[#e2e8f0] rounded-full overflow-hidden">
              <div className="w-4/5 h-full bg-[#2563eb] rounded-full" />
            </div>
            <p className="text-xs text-[#64748b] mt-2">
              Add a portfolio project to reach 100%
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#64748b] mb-6">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/talent/dashboard">Dashboard</Link>
            <span>/</span>
            <span className="text-[#0f172a]">Profile & Settings</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-2xl font-bold text-[#0f172a]">
                Profile & Settings
              </h1>
              <p className="text-[#64748b]">
                Manage your public presence and account preferences.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" leftIcon={<Eye className="w-4 h-4" />}>
                View Public Profile
              </Button>
              <Button>Save Changes</Button>
            </div>
          </motion.div>

          {/* Identity Section */}
          <Card className="mb-6">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-[#64748b]" />
              <h2 className="text-lg font-bold text-[#0f172a]">Identity</h2>
            </div>

            <div className="flex gap-8">
              {/* Avatar Upload */}
              <div className="relative">
                <div className="w-28 h-28 rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
                    alt="Profile"
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                </div>
                <button className="absolute bottom-2 right-2 w-8 h-8 bg-[#2563eb] rounded-full flex items-center justify-center text-white shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
                <p className="text-xs text-[#64748b] mt-2 text-center">
                  Allowed *.jpeg, *.jpg
                  <br />
                  max size of 3.1 MB
                </p>
              </div>

              {/* Form Fields */}
              <div className="flex-1 grid grid-cols-2 gap-4">
                <Input label="First Name" defaultValue="Alex" />
                <Input label="Last Name" defaultValue="Morgan" />
                <div className="col-span-2">
                  <Input
                    label="Professional Headline"
                    defaultValue="Senior Full-Stack Engineer"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    label="Location"
                    defaultValue="San Francisco, CA"
                  />
                </div>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* About Me */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-[#64748b]" />
                <h2 className="text-lg font-bold text-[#0f172a]">About Me</h2>
              </div>
              <div className="relative">
                <textarea
                  className="w-full h-32 p-4 border border-[#e2e8f0] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-[#475569]"
                  placeholder="Tell clients about your experience, your process, and what makes you unique..."
                  defaultValue="Experienced Full-Stack Engineer with 8+ years in building scalable web applications. Proficient in React, Node.js, and Python. Passionate about clean code and user-centric design."
                />
                <span className="absolute bottom-3 right-3 text-xs text-[#9ca3af]">
                  240/500 characters
                </span>
              </div>
            </Card>

            {/* Hourly Rate */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-[#64748b]" />
                <h2 className="text-lg font-bold text-[#0f172a]">Hourly Rate</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#0f172a]">$</span>
                <input
                  type="number"
                  defaultValue="85"
                  className="w-24 text-3xl font-bold text-[#0f172a] border-b-2 border-[#e2e8f0] focus:border-[#2563eb] focus:outline-none"
                />
                <span className="text-[#64748b]">/ hr</span>
              </div>
              <p className="text-sm text-[#2563eb] mt-2">
                ℹ Includes SkillSlot service fee protection and payment
                guarantee.
              </p>
            </Card>
          </div>

          {/* Expertise */}
          <Card className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-[#64748b]" />
              <h2 className="text-lg font-bold text-[#0f172a]">Expertise</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">
                  Experience Level
                </label>
                <select className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
                  <option>Senior (5-8 years)</option>
                  <option>Mid-Level (3-5 years)</option>
                  <option>Junior (1-3 years)</option>
                  <option>Expert (8+ years)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">
                  Add Skills
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="e.g. React, Python..."
                    className="flex-1 px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  />
                  <Button onClick={addSkill}>Add</Button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {currentSkills.map((skill) => (
                <Badge key={skill} variant="outline" className="pr-1">
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 p-0.5 hover:bg-[#fee2e2] rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </Card>

          {/* Availability */}
          <Card className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#64748b]" />
                <h2 className="text-lg font-bold text-[#0f172a]">Availability</h2>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm text-[#64748b]">
                  Accepting New Clients
                </span>
                <button
                  onClick={() => setAcceptingClients(!acceptingClients)}
                  className={cn(
                    'w-12 h-6 rounded-full transition-colors relative',
                    acceptingClients ? 'bg-[#2563eb]' : 'bg-[#d1d5db]'
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
                      acceptingClients ? 'right-1' : 'left-1'
                    )}
                  />
                </button>
              </label>
            </div>

            <div className="flex gap-2">
              {availability.map((day) => (
                <button
                  key={day.day}
                  className={cn(
                    'flex-1 py-3 rounded-lg text-center font-medium transition-colors',
                    day.status === 'full' && 'bg-[#2563eb] text-white',
                    day.status === 'am' &&
                      'bg-white border-2 border-[#2563eb] text-[#2563eb]',
                    day.status === 'off' &&
                      'bg-[#f1f5f9] text-[#94a3b8] border border-dashed border-[#d1d5db]'
                  )}
                >
                  <span className="block text-xs mb-1">{day.day}</span>
                  <span className="block text-xs">
                    {day.status === 'full'
                      ? 'Full'
                      : day.status === 'am'
                      ? 'AM'
                      : 'Off'}
                  </span>
                </button>
              ))}
            </div>
          </Card>

          {/* Portfolio */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#64748b]" />
                <h2 className="text-lg font-bold text-[#0f172a]">Portfolio</h2>
              </div>
              <Button variant="ghost" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                Add Project
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolio.map((item) => (
                <div key={item.id} className="group relative">
                  <div className="rounded-xl overflow-hidden aspect-video">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={225}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <p className="font-semibold text-[#0f172a] mt-2">{item.title}</p>
                  <p className="text-sm text-[#64748b]">{item.tech}</p>
                </div>
              ))}

              {/* Add New */}
              <button className="aspect-video border-2 border-dashed border-[#d1d5db] rounded-xl flex flex-col items-center justify-center hover:border-[#2563eb] hover:bg-[#f8fafc] transition-colors">
                <div className="w-12 h-12 bg-[#f1f5f9] rounded-full flex items-center justify-center mb-2">
                  <Plus className="w-6 h-6 text-[#64748b]" />
                </div>
                <span className="text-sm text-[#64748b]">Upload New Project</span>
              </button>
            </div>
          </Card>

          {/* Bottom Save Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-[#0f172a] text-white py-4 px-8 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#10b981]" />
              <span className="text-sm">All changes saved automatically</span>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Discard
              </Button>
              <Button className="bg-white text-[#0f172a] hover:bg-[#f8fafc]">
                Save Changes
              </Button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

