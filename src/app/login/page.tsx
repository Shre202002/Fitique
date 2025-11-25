'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Send OTP (checks backend for role = 'buyer')
  const handleSendOTP = async () => {
    setMessage('');
    if (!email.trim()) return setMessage('❌ Please enter your email');

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role: 'buyer' }),
      });

      const data = await res.json();
      if (res.ok) {
        setStep('otp');
        setMessage('✅ OTP sent to your registered email');
      } else {
        // show backend error (e.g., "Email not registered. Please sign up.")
        setMessage(`❌ ${data.error || 'Failed to send OTP'}`);
      }
    } catch (err: any) {
      console.error('Send OTP error:', err);
      setMessage('❌ Server error (check backend is running)');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP and receive JWT
  const handleVerifyOTP = async () => {
    setMessage('');
    if (!otp.trim()) return setMessage('❌ Enter the OTP');

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (res.ok) {
        // data.token contains JWT
        localStorage.setItem('token', data.token);
        setMessage('✅ Login successful — redirecting...');
        setTimeout(() => router.push('/account'), 700);
      } else {
        setMessage(`❌ ${data.error || 'Invalid OTP'}`);
      }
    } catch (err: any) {
      console.error('Verify OTP error:', err);
      setMessage('❌ Server error (check backend is running)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-accent">
            {step === 'email' ? 'Login via Email OTP' : 'Verify OTP'}
          </CardTitle>
          <CardDescription>
            {step === 'email'
              ? 'Enter your registered email to receive an OTP.'
              : 'Check your inbox and enter the OTP to continue.'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {step === 'email' ? (
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button onClick={handleSendOTP} disabled={loading} className="w-full">
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                type="number"
                min={100000}
                max={999999}
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <Button onClick={handleVerifyOTP} disabled={loading} className="w-full">
                {loading ? 'Verifying...' : 'Verify OTP'}
              </Button>
            </div>
          )}

          {message && (
            <p className={`text-sm text-center ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          {step === 'otp' && (
            <button onClick={() => setStep('email')} className="text-sm text-gray-500 underline block text-center">
              Change Email
            </button>
          )}
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            {/* This should link to the registration page. */}
            <Link href="/register" className="underline text-primary">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
