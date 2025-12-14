'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Building,
  Wallet,
  Calendar,
  Clock,
  Star,
  Shield,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Lock,
} from 'lucide-react';
import { Header } from '@/components/layout';
import { Button, Card, Badge, Input } from '@/components/ui';
import { talents } from '@/data/mockData';
import { formatCurrency, cn } from '@/lib/utils';

const paymentMethods = [
  { id: 'card', label: 'Card', icon: CreditCard },
  { id: 'upi', label: 'UPI', icon: Building },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
];

export default function PaymentPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('DEMO');
  const [isLoading, setIsLoading] = useState(false);

  const talent = talents[0];
  const rate = 80;
  const hours = 2;
  const subtotal = rate * hours;
  const serviceFee = 10;
  const discount = 20;
  const total = subtotal + serviceFee - discount;

  const handlePayment = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push('/booking/confirmation');
  };

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <Header variant="dashboard" user={{ name: 'User', role: 'client' }} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#64748b] mb-6">
          <span>Select Talent</span>
          <span>›</span>
          <span className="text-[#2563eb] font-medium">Summary & Pay</span>
          <span>›</span>
          <span>Confirmation</span>
        </div>

        <h1 className="text-2xl font-bold text-[#0f172a] mb-2">
          Review and Pay
        </h1>
        <p className="text-[#64748b] mb-8">
          Complete your booking for {talent.name}
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card>
              <h2 className="text-lg font-bold text-[#0f172a] mb-6">
                Payment Method
              </h2>

              {/* Payment Method Tabs */}
              <div className="flex gap-2 mb-6">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all',
                      selectedMethod === method.id
                        ? 'bg-[#2563eb] text-white'
                        : 'bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0]'
                    )}
                  >
                    <method.icon className="w-4 h-4" />
                    {method.label}
                  </button>
                ))}
              </div>

              {/* Card Form */}
              {selectedMethod === 'card' && (
                <div className="space-y-4">
                  <Input
                    label="Card Number"
                    placeholder="0000 0000 0000 0000"
                    rightIcon={<CreditCard className="w-4 h-4" />}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Expiration Date" placeholder="MM/YY" />
                    <Input
                      label="CVC"
                      placeholder="123"
                      rightIcon={<HelpCircle className="w-4 h-4" />}
                    />
                  </div>
                  <Input
                    label="Name on Card"
                    placeholder="Enter name exactly as on card"
                  />

                  <div className="flex items-start gap-3 p-4 bg-[#f8fafc] rounded-lg mt-6">
                    <Lock className="w-5 h-5 text-[#64748b] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[#64748b]">
                      Your payment information is encrypted and secure. We never
                      store your full card details. Payments are processed by
                      Stripe.
                    </p>
                  </div>
                </div>
              )}

              {/* Satisfaction Guarantee */}
              <div className="flex items-start gap-4 mt-8 p-4 bg-[#dcfce7] rounded-lg">
                <CheckCircle className="w-6 h-6 text-[#16a34a] flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#0f172a]">
                    100% Satisfaction Guarantee
                  </p>
                  <p className="text-sm text-[#475569]">
                    If you&apos;re not satisfied with the first hour of work,
                    we&apos;ll refund your money or find you a replacement at no
                    extra cost.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <h2 className="text-lg font-bold text-[#0f172a] mb-6">
                Order Summary
              </h2>

              {/* Talent Info */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#e2e8f0]">
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <Image
                    src={talent.avatar || ''}
                    alt={talent.name}
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-[#0f172a]">{talent.name}</p>
                  <p className="text-sm text-[#64748b]">{talent.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 fill-[#fbbf24] text-[#fbbf24]" />
                    <span className="text-xs text-[#64748b]">
                      {talent.rating} ({talent.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Session Details */}
              <div className="space-y-3 mb-6 pb-6 border-b border-[#e2e8f0]">
                <div className="flex items-center gap-2 text-sm text-[#64748b]">
                  <Calendar className="w-4 h-4" />
                  Oct 24, 2023
                </div>
                <div className="flex items-center gap-2 text-sm text-[#64748b]">
                  <Clock className="w-4 h-4" />
                  2:00 PM - 4:00 PM ({hours} Hours)
                </div>
              </div>

              {/* Promo Code */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code"
                  className="flex-1 px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                />
                <Badge variant="success">Applied</Badge>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748b]">
                    ${rate}.00 × {hours} hrs
                  </span>
                  <span className="text-[#0f172a]">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748b]">Service Fee</span>
                  <span className="text-[#0f172a]">
                    {formatCurrency(serviceFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-[#16a34a]">
                  <span>Discount (DEMO)</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-[#e2e8f0]">
                  <span className="font-semibold text-[#0f172a]">Total</span>
                  <span className="text-2xl font-bold text-[#0f172a]">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handlePayment}
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Confirm & Pay {formatCurrency(total)}
              </Button>

              <div className="flex items-center justify-center gap-4 mt-4">
                {['VISA', 'MC', 'AMEX'].map((card) => (
                  <span
                    key={card}
                    className="text-xs text-[#9ca3af] px-2 py-1 bg-[#f1f5f9] rounded"
                  >
                    {card}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

