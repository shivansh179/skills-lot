'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, Briefcase, Code, Check, Zap, AlertCircle } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { cn } from '@/lib/utils';
import { signup } from '@/lib/api';

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'CLIENT' | 'TALENT'>('CLIENT');
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong'>('weak');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);
    if (pwd.length < 6) {
      setPasswordStrength('weak');
    } else if (pwd.length < 10) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('strong');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation
    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    const result = await signup({
      fullName: fullName.trim(),
      email: email.trim(),
      password,
      confirmPassword,
      role: userType,
    });

    setIsLoading(false);

    if (result.success) {
      setSuccess(result.message || 'Account created successfully!');
      // Redirect to login or dashboard after a short delay
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } else {
      setError(result.error || 'Signup failed. Please try again.');
    }
  };

  const strengthColors = {
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-green-500',
  };

  const strengthLabels = {
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#0f172a]">SkillSlot</span>
          </Link>

          <h1 className="text-3xl font-bold text-[#0f172a] mb-2">
            Create your account
          </h1>
          <p className="text-[#64748b] mb-8">
            Join thousands of developers and clients on SkillSlot.
          </p>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </motion.div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
            >
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <p className="text-sm text-green-600">{success}</p>
            </motion.div>
          )}

          {/* User Type Toggle */}
          <div className="mb-6">
            <p className="text-sm font-medium text-[#374151] mb-3">I want to...</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserType('CLIENT')}
                className={cn(
                  'flex items-center gap-3 p-4 rounded-lg border-2 transition-all',
                  userType === 'CLIENT'
                    ? 'border-[#2563eb] bg-[#dbeafe]/30'
                    : 'border-[#e2e8f0] hover:border-[#cbd5e1]'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    userType === 'CLIENT' ? 'bg-[#2563eb]' : 'bg-[#f1f5f9]'
                  )}
                >
                  <Briefcase
                    className={cn(
                      'w-5 h-5',
                      userType === 'CLIENT' ? 'text-white' : 'text-[#64748b]'
                    )}
                  />
                </div>
                <span
                  className={cn(
                    'font-medium',
                    userType === 'CLIENT' ? 'text-[#2563eb]' : 'text-[#64748b]'
                  )}
                >
                  Hire Talent
                </span>
              </button>
              <button
                type="button"
                onClick={() => setUserType('TALENT')}
                className={cn(
                  'flex items-center gap-3 p-4 rounded-lg border-2 transition-all',
                  userType === 'TALENT'
                    ? 'border-[#2563eb] bg-[#dbeafe]/30'
                    : 'border-[#e2e8f0] hover:border-[#cbd5e1]'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    userType === 'TALENT' ? 'bg-[#2563eb]' : 'bg-[#f1f5f9]'
                  )}
                >
                  <Code
                    className={cn(
                      'w-5 h-5',
                      userType === 'TALENT' ? 'text-white' : 'text-[#64748b]'
                    )}
                  />
                </div>
                <span
                  className={cn(
                    'font-medium',
                    userType === 'TALENT' ? 'text-[#2563eb]' : 'text-[#64748b]'
                  )}
                >
                  Find Work
                </span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              placeholder="Jane Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
              required
            />

            <div className="relative">
              <Input
                label="Work Email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                rightIcon={email.includes('@') && email.includes('.') ? <Check className="w-4 h-4 text-green-500" /> : undefined}
                required
              />
            </div>

            <div>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                leftIcon={<Lock className="w-4 h-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#9ca3af] hover:text-[#6b7280]"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                }
                onChange={handlePasswordChange}
                required
              />
              {password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1 rounded-full bg-[#e5e7eb] overflow-hidden">
                    <div
                      className={cn(
                        'h-full transition-all',
                        strengthColors[passwordStrength],
                        passwordStrength === 'weak' && 'w-1/3',
                        passwordStrength === 'medium' && 'w-2/3',
                        passwordStrength === 'strong' && 'w-full'
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      'text-xs',
                      passwordStrength === 'weak' && 'text-red-500',
                      passwordStrength === 'medium' && 'text-yellow-500',
                      passwordStrength === 'strong' && 'text-green-500'
                    )}
                  >
                    {strengthLabels[passwordStrength]}
                  </span>
                </div>
              )}
            </div>

            <Input
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={
                confirmPassword && confirmPassword === password ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : undefined
              }
              required
            />

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e5e7eb]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#9ca3af]">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button variant="secondary" leftIcon={
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                </svg>
              }>
                Google
              </Button>
              <Button variant="secondary" leftIcon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              }>
                LinkedIn
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-[#64748b]">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-[#2563eb] hover:underline font-medium"
            >
              Log in
            </Link>
          </p>

          <p className="mt-4 text-center text-xs text-[#9ca3af]">
            © 2024 SkillSlot Inc. <Link href="/privacy" className="hover:underline">Privacy</Link> • <Link href="/terms" className="hover:underline">Terms</Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 relative">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=1200&fit=crop"
          alt="Team collaboration"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute top-8 right-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full" />
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
            </div>
            <p className="text-white/80 text-sm">+42 new matches</p>
          </div>
        </div>
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-sm">Trusted by 10,000+ companies</span>
          </div>
          <blockquote className="text-3xl font-bold mb-4 italic">
            &quot;SkillSlot completely transformed how we hire engineering talent. We
            built our dream team in less than a week.&quot;
          </blockquote>
          <div className="flex items-center gap-3 mt-6">
            <div className="w-12 h-12 rounded-full bg-[#64748b] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                alt="Sarah Chen"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-semibold">Sarah Chen</p>
              <p className="text-sm text-white/70">CTO at TechFlow</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
