export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'client' | 'talent';
  title?: string;
  location?: string;
  bio?: string;
  hourlyRate?: number;
  skills?: string[];
  rating?: number;
  reviewCount?: number;
  isOnline?: boolean;
  isVerified?: boolean;
  availability?: 'available' | 'busy' | 'offline';
  responseTime?: string;
  jobSuccess?: number;
  completedJobs?: number;
}

export interface Talent extends User {
  role: 'talent';
  hourlyRate: number;
  skills: string[];
  rating: number;
  reviewCount: number;
  portfolio?: PortfolioItem[];
  experience?: string;
  nextAvailable?: string;
}

export interface Client extends User {
  role: 'client';
  company?: string;
  totalSpend?: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  tags: string[];
  link?: string;
}

export interface Booking {
  id: string;
  talentId: string;
  clientId: string;
  talent?: Talent;
  client?: Client;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  rate: number;
  total: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  meetingType: 'video' | 'phone' | 'in_person';
  deliverables?: string[];
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  attachments?: Attachment[];
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  projectName?: string;
}

export interface Review {
  id: string;
  reviewerId: string;
  reviewer?: User;
  talentId: string;
  rating: number;
  comment: string;
  date: string;
  projectTitle?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface QuickTask {
  id: string;
  title: string;
  description: string;
  price: number;
  icon: string;
  category: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DaySchedule {
  date: Date;
  slots: TimeSlot[];
}

