'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Search,
  Edit,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Image as ImageIcon,
  Send,
  Check,
  CheckCheck,
  FileText,
  Download,
  X,
  Zap,
  LayoutDashboard,
  Bell,
} from 'lucide-react';
import { Button, Card, Badge, Avatar } from '@/components/ui';
import { cn } from '@/lib/utils';

const conversations = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'React Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Sure, I can send over the portfolio link in a...',
    time: '10:42 AM',
    online: true,
    unread: 0,
  },
  {
    id: '2',
    name: 'David Chen',
    role: 'Product Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Are you available for a 2hr call tomorrow?',
    time: '1h',
    online: true,
    unread: 2,
  },
  {
    id: '3',
    name: 'Michael Ross',
    role: 'UX Designer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    lastMessage: "I've uploaded the new wireframes to Fig...",
    time: 'Yesterday',
    online: false,
    unread: 0,
  },
  {
    id: '4',
    name: 'SkillSlot Support',
    role: 'Platform Admin',
    avatar: '',
    lastMessage: 'Your payment has been successfully pro...',
    time: 'Tue',
    online: false,
    unread: 0,
    isSupport: true,
  },
  {
    id: '5',
    name: 'Emily Watson',
    role: 'Frontend Engineer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    lastMessage: "Let's schedule the interview for next week.",
    time: 'Mon',
    online: false,
    unread: 0,
  },
];

const messages = [
  {
    id: '1',
    senderId: 'other',
    content: 'Hi Alex, thanks for reaching out about the React project! I\'ve worked on several similar marketplaces before.',
    time: '10:30 AM',
    read: true,
  },
  {
    id: '2',
    senderId: 'me',
    content: 'That\'s great to hear, Sarah. I saw your profile and thought your experience with Tailwind CSS would be a perfect fit for what we are building.',
    time: '10:35 AM',
    read: true,
  },
  {
    id: '3',
    senderId: 'me',
    content: 'Do you have a portfolio link handy?',
    time: '10:35 AM',
    read: true,
  },
  {
    id: '4',
    senderId: 'other',
    content: 'Sure, I can send over the portfolio link in a bit.',
    time: '10:42 AM',
    read: true,
  },
];

const sharedFiles = [
  { name: 'Project_Specs_v2.pdf', size: '2.4 MB', date: 'Oct 22' },
  { name: 'mockup_dashboard.png', size: '4.1 MB', date: 'Oct 23' },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState('');
  const [filter, setFilter] = useState('All');

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <header className="bg-white border-b border-[#e2e8f0] sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#0f172a]">SkillSlot</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1 text-sm">
              <Link href="/dashboard" className="px-3 py-1.5 text-[#64748b] hover:text-[#0f172a]">
                Dashboard
              </Link>
              <span className="text-[#e2e8f0]">›</span>
              <span className="px-3 py-1.5 text-[#0f172a] font-medium">Messages</span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-[#64748b] hover:text-[#0f172a]">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#0f172a]">James Anderson</span>
              <span className="text-xs text-[#64748b]">Client Account</span>
            </div>
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              name="James Anderson"
              size="sm"
              isOnline
            />
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-65px)]">
        {/* Sidebar - Conversations */}
        <aside className="w-80 bg-white border-r border-[#e2e8f0] flex flex-col">
          <div className="p-4 border-b border-[#e2e8f0]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#0f172a]">Messages</h2>
              <Button variant="ghost" size="sm" className="p-2">
                <Edit className="w-4 h-4 text-[#2563eb]" />
              </Button>
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>
            <div className="flex gap-2">
              {['All', 'Unread', 'Archived'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'text-sm font-medium px-3 py-1.5 rounded-lg transition-colors',
                    filter === f
                      ? 'text-[#2563eb] border-b-2 border-[#2563eb]'
                      : 'text-[#64748b] hover:text-[#0f172a]'
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={cn(
                  'w-full p-4 flex items-start gap-3 text-left hover:bg-[#f8fafc] transition-colors border-l-2',
                  selectedConversation?.id === conv.id
                    ? 'bg-[#f8fafc] border-[#2563eb]'
                    : 'border-transparent'
                )}
              >
                <div className="relative">
                  {conv.isSupport ? (
                    <div className="w-10 h-10 bg-[#dbeafe] rounded-full flex items-center justify-center">
                      <LayoutDashboard className="w-5 h-5 text-[#2563eb]" />
                    </div>
                  ) : (
                    <Avatar
                      src={conv.avatar}
                      name={conv.name}
                      size="md"
                      isOnline={conv.online}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="font-semibold text-[#0f172a] truncate">
                      {conv.name}
                    </p>
                    <span className="text-xs text-[#64748b]">{conv.time}</span>
                  </div>
                  <p className="text-xs text-[#2563eb] mb-1">{conv.role}</p>
                  <div className="flex items-center gap-2">
                    {conv.online && (
                      <span className="w-2 h-2 bg-[#10b981] rounded-full" />
                    )}
                    <p className="text-sm text-[#64748b] truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>
                {conv.unread > 0 && (
                  <Badge variant="primary" size="sm" className="rounded-full">
                    {conv.unread}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-[#e2e8f0] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar
                src={selectedConversation.avatar}
                name={selectedConversation.name}
                size="md"
                isOnline={selectedConversation.online}
              />
              <div>
                <p className="font-semibold text-[#0f172a]">
                  {selectedConversation.name}
                </p>
                <p className="text-sm text-[#2563eb]">
                  {selectedConversation.role}
                  {selectedConversation.online && (
                    <span className="text-[#10b981] ml-2">• Online</span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="p-2">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="text-center">
              <span className="text-xs text-[#9ca3af] bg-[#f1f5f9] px-3 py-1 rounded-full">
                Today
              </span>
            </div>
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 bg-[#f8fafc] px-4 py-2 rounded-full">
                <LayoutDashboard className="w-4 h-4 text-[#9ca3af]" />
                <span className="text-sm text-[#64748b]">
                  Contract started: <span className="font-medium text-[#0f172a]">Mobile App Refactor</span> • 3 hours ago
                </span>
              </div>
            </div>

            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'flex gap-3',
                  msg.senderId === 'me' ? 'justify-end' : 'justify-start'
                )}
              >
                {msg.senderId !== 'me' && (
                  <Avatar
                    src={selectedConversation.avatar}
                    name={selectedConversation.name}
                    size="sm"
                  />
                )}
                <div
                  className={cn(
                    'max-w-md px-4 py-3 rounded-2xl',
                    msg.senderId === 'me'
                      ? 'bg-[#2563eb] text-white rounded-br-sm'
                      : 'bg-white border border-[#e2e8f0] text-[#0f172a] rounded-bl-sm'
                  )}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
                <div className="flex flex-col justify-end">
                  <span className="text-xs text-[#9ca3af]">{msg.time}</span>
                  {msg.senderId === 'me' && (
                    <CheckCheck className="w-3 h-3 text-[#2563eb] ml-auto" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-white border-t border-[#e2e8f0] p-4">
            <div className="flex items-center gap-3">
              <button className="p-2 text-[#64748b] hover:text-[#0f172a]">
                <Paperclip className="w-5 h-5" />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder={`Type a message to ${selectedConversation.name.split(' ')[0]}...`}
                  className="w-full px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button className="p-1 text-[#9ca3af] hover:text-[#64748b]">
                    <Smile className="w-5 h-5" />
                  </button>
                  <button className="p-1 text-[#9ca3af] hover:text-[#64748b]">
                    <ImageIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <Button
                className="rounded-full w-10 h-10 p-0"
                disabled={!messageText.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-[#9ca3af] mt-2 text-center">
              Press Enter to send, Shift + Enter for new line
            </p>
          </div>
        </main>

        {/* Right Sidebar - Contract Details */}
        <aside className="w-80 bg-white border-l border-[#e2e8f0] p-6 hidden xl:block">
          <div className="mb-6">
            <h3 className="font-bold text-[#0f172a] mb-4">CONTRACT DETAILS</h3>
            <Card className="bg-[#f8fafc]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#dbeafe] rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#2563eb]" />
                </div>
                <div>
                  <p className="font-semibold text-[#0f172a]">Mobile App Refactor</p>
                  <p className="text-xs text-[#64748b]">ID: #492-AB</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Rate</span>
                  <span className="font-medium text-[#0f172a]">$85.00/hr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Total Hours</span>
                  <span className="font-medium text-[#0f172a]">12.5 hrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Status</span>
                  <Badge variant="success" size="sm">Active</Badge>
                </div>
              </div>
              <Button variant="secondary" className="w-full mt-4">
                View Contract
              </Button>
            </Card>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-[#0f172a] mb-4">SHARED FILES</h3>
            <div className="space-y-3">
              {sharedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-[#f8fafc] rounded-lg"
                >
                  <div className="w-10 h-10 bg-[#fee2e2] rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#dc2626]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#0f172a] truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-[#64748b]">
                      {file.size} • {file.date}
                    </p>
                  </div>
                  <button className="p-1 text-[#64748b] hover:text-[#0f172a]">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button variant="danger" className="w-full bg-transparent border border-red-200 text-red-600 hover:bg-red-50">
            <X className="w-4 h-4 mr-2" />
            End Contract
          </Button>
        </aside>
      </div>
    </div>
  );
}

