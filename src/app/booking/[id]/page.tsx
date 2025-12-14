'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Video,
  CreditCard,
  Check,
  Zap,
  Loader2,
} from 'lucide-react';
import { Header } from '@/components/layout';
import { Button, Card, Badge, Avatar } from '@/components/ui';
import { talents } from '@/data/mockData';
import { getTalentAvailability, getAuthToken } from '@/lib/api';
import { formatCurrency, cn } from '@/lib/utils';

// All possible time slots for display
const allTimeSlots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
  '9:00 PM',
  '10:00 PM',
];

const durations = ['30 mins', '1 hour', '2 hours', '4 hours'];

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState('1 hour');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [dayOfWeek, setDayOfWeek] = useState<string>('');

  const talentId = params.id as string;
  const talent = talents.find((t) => t.id === talentId) || talents[0];

  const steps = [
    { number: 1, label: 'Select Time' },
    { number: 2, label: 'Details' },
    { number: 3, label: 'Payment' },
  ];

  // Check auth on mount
  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  // Get today's date for comparison
  const today = new Date();
  const isCurrentMonth =
    currentMonth.getMonth() === today.getMonth() &&
    currentMonth.getFullYear() === today.getFullYear();

  // Format date as YYYY-MM-DD for API
  const formatDateForAPI = (day: number): string => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
  };

  // Fetch availability when date is selected
  const fetchAvailability = async (day: number) => {
    setIsLoadingSlots(true);
    setSelectedTime(null);
    setAvailableSlots([]);

    const dateStr = formatDateForAPI(day);
    const result = await getTalentAvailability(talentId, dateStr);

    if (result.success && result.data) {
      setAvailableSlots(result.data.availableHours || []);
      setDayOfWeek(result.data.dayOfWeek || '');
    } else {
      setAvailableSlots([]);
    }
    setIsLoadingSlots(false);
  };

  // Handle date selection
  const handleDateSelect = (day: number) => {
    setSelectedDate(day);
    fetchAvailability(day);
  };

  // Check if a time slot is available
  const isSlotAvailable = (time: string): boolean => {
    return availableSlots.includes(time);
  };

  // Get formatted selected date
  const getFormattedSelectedDate = (): string => {
    if (!selectedDate) return '';
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      selectedDate
    );
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/booking/confirmation');
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <Header variant="auth" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                    currentStep >= step.number
                      ? 'bg-[#2563eb] text-white'
                      : 'bg-[#e2e8f0] text-[#64748b]'
                  )}
                >
                  {currentStep > step.number ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={cn(
                    'ml-2 text-sm font-medium',
                    currentStep >= step.number
                      ? 'text-[#2563eb]'
                      : 'text-[#64748b]'
                  )}
                >
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 mx-4 text-[#d1d5db]" />
                )}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card padding="none" className="overflow-hidden">
            <div className="grid md:grid-cols-3">
              {/* Left Column - Talent Info */}
              <div className="p-6 border-r border-[#e2e8f0]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={talent.avatar || ''}
                        alt={talent.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    {talent.isOnline && (
                      <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#10b981] border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div>
                    <h2 className="font-bold text-[#0f172a]">{talent.name}</h2>
                    <p className="text-sm text-[#64748b]">{talent.title}</p>
                  </div>
                </div>

                <div className="space-y-4 border-t border-[#e2e8f0] pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-[#64748b]">
                      <CreditCard className="w-4 h-4" />
                      Hourly Rate
                    </div>
                    <span className="font-semibold text-[#0f172a]">
                      {formatCurrency(talent.hourlyRate)}/hr
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-[#64748b]">
                      <Video className="w-4 h-4" />
                      Meeting Type
                    </div>
                    <span className="font-semibold text-[#0f172a]">
                      Video Call
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-[#64748b]">
                      <Clock className="w-4 h-4" />
                      Duration
                    </div>
                    <select
                      value={selectedDuration}
                      onChange={(e) => setSelectedDuration(e.target.value)}
                      className="px-3 py-1 border border-[#e2e8f0] rounded-lg text-sm font-medium text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                    >
                      {durations.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-[#dbeafe] rounded-lg">
                  <h3 className="text-sm font-medium text-[#1e40af] mb-2">
                    About this session
                  </h3>
                  <p className="text-sm text-[#3b82f6]">
                    This session is perfect for code reviews, architectural
                    planning, or debugging complex React issues.
                  </p>
                </div>
              </div>

              {/* Right Column - Calendar */}
              <div className="col-span-2 p-6">
                <h2 className="text-xl font-bold text-[#0f172a] mb-2">
                  Select a Date & Time
                </h2>
                <p className="text-sm text-[#64748b] mb-6">
                  Times are shown in your local timezone (America/New_York)
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Calendar */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-[#0f172a]">
                        {monthName}
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setCurrentMonth(
                              new Date(
                                currentMonth.getFullYear(),
                                currentMonth.getMonth() - 1
                              )
                            )
                          }
                          className="p-1 rounded hover:bg-[#f1f5f9]"
                        >
                          <ChevronLeft className="w-5 h-5 text-[#64748b]" />
                        </button>
                        <button
                          onClick={() =>
                            setCurrentMonth(
                              new Date(
                                currentMonth.getFullYear(),
                                currentMonth.getMonth() + 1
                              )
                            )
                          }
                          className="p-1 rounded hover:bg-[#f1f5f9]"
                        >
                          <ChevronRight className="w-5 h-5 text-[#64748b]" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                      {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(
                        (day) => (
                          <div
                            key={day}
                            className="text-xs font-medium text-[#64748b] py-2"
                          >
                            {day}
                          </div>
                        )
                      )}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {days.map((day, index) => {
                        const isPast =
                          isCurrentMonth && day !== null && day < today.getDate();
                        return (
                          <button
                            key={index}
                            onClick={() => day && !isPast && handleDateSelect(day)}
                            disabled={!day || isPast}
                            className={cn(
                              'aspect-square rounded-full flex items-center justify-center text-sm transition-all',
                              !day && 'invisible',
                              day && isPast &&
                                'text-[#d1d5db] cursor-not-allowed',
                              day &&
                                !isPast &&
                                selectedDate !== day &&
                                'hover:bg-[#f1f5f9] text-[#0f172a]',
                              selectedDate === day &&
                                'bg-[#2563eb] text-white font-medium'
                            )}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-[#0f172a]">
                        {selectedDate
                          ? getFormattedSelectedDate()
                          : 'Select a date'}
                      </h3>
                      {selectedDate && availableSlots.length > 0 && (
                        <Badge variant="success" size="sm">
                          Available
                        </Badge>
                      )}
                      {selectedDate && !isLoadingSlots && availableSlots.length === 0 && (
                        <Badge variant="danger" size="sm">
                          No slots
                        </Badge>
                      )}
                    </div>

                    {!selectedDate ? (
                      <div className="flex items-center justify-center h-64 text-[#94a3b8]">
                        <div className="text-center">
                          <Calendar className="w-12 h-12 mx-auto mb-3 text-[#d1d5db]" />
                          <p>Please select a date to see available times</p>
                        </div>
                      </div>
                    ) : isLoadingSlots ? (
                      <div className="flex items-center justify-center h-64">
                        <Loader2 className="w-8 h-8 animate-spin text-[#2563eb]" />
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                        {allTimeSlots.map((time) => {
                          const isAvailable = isSlotAvailable(time);
                          return (
                            <button
                              key={time}
                              onClick={() =>
                                isAvailable && setSelectedTime(time)
                              }
                              disabled={!isAvailable}
                              className={cn(
                                'w-full p-3 rounded-lg border text-sm font-medium transition-all flex items-center justify-between',
                                !isAvailable &&
                                  'bg-[#f8fafc] text-[#cbd5e1] border-[#f1f5f9] cursor-not-allowed opacity-50',
                                isAvailable &&
                                  selectedTime !== time &&
                                  'bg-white text-[#0f172a] border-[#e2e8f0] hover:border-[#2563eb]',
                                selectedTime === time &&
                                  'bg-[#2563eb] text-white border-[#2563eb]'
                              )}
                            >
                              <span>{time}</span>
                              {selectedTime === time && (
                                <Check className="w-4 h-4" />
                              )}
                              {!isAvailable && (
                                <span className="text-xs">Unavailable</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#e2e8f0]">
                  <div>
                    <p className="text-sm text-[#64748b]">SELECTED TIME</p>
                    <p className="font-semibold text-[#0f172a]">
                      {selectedDate && selectedTime
                        ? `${getFormattedSelectedDate()} • ${selectedTime}`
                        : 'No time selected'}
                    </p>
                  </div>
                  <Button
                    size="lg"
                    rightIcon={<ChevronRight className="w-4 h-4" />}
                    onClick={handleContinue}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Next Step
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <footer className="py-6 text-center text-sm text-[#64748b]">
        © 2023 SkillSlot Inc. All rights reserved.
      </footer>
    </main>
  );
}
