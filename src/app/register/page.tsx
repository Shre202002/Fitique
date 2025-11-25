'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FcGoogle } from 'react-icons/fc'
import { Eye, EyeOff } from 'lucide-react'

export default function BuyerSignupPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')

  // Password validation
  const validatePassword = (value: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!regex.test(value)) {
      setError('Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.')
      return false
    }
    setError('')
    return true
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setPassword(val)
    validatePassword(val)
  }

  const strengthColor = password.length === 0 ? 'bg-gray-200' : error ? 'bg-red-500' : 'bg-green-500'

  // Send OTP to email
  const handleSendOTP = async (e: any) => {
    e.preventDefault()
    if (!email) return setMessage('❌ Enter a valid email first.')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setOtpSent(true)
        setMessage('✅ OTP sent successfully! Check your inbox.')
      } else setMessage(`❌ ${data.error || 'Failed to send OTP'}`)
    } catch (err: any) {
      setMessage(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Verify OTP
  const handleVerifyOTP = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api//auth/register/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      })
      const data = await res.json()
      if (res.ok) {
        setOtpVerified(true)
        setMessage('✅ Email verified successfully!')
      } else setMessage(`❌ ${data.error || 'Invalid OTP'}`)
    } catch (err: any) {
      setMessage(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Create user after verification
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    if (!otpVerified) {
      setLoading(false)
      setMessage('❌ Please verify your email first.')
      return
    }

    const form = e.currentTarget
    const formData = new FormData(form)
    formData.append('role', 'buyer')
    const data = Object.fromEntries(formData.entries())

    if (!validatePassword(password)) {
      setLoading(false)
      setMessage('❌ Please enter a valid password.')
      return
    }

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (res.ok) {
        setMessage(`✅ ${result.message || 'User registered successfully!'}`)
        form.reset()
        setPassword('')
        setOtp('')
        setOtpSent(false)
        setOtpVerified(false)
      } else {
        const backendError = result.error?.length > 60 ? result.error.substring(0, 57) + '...' : result.error
        setMessage(`❌ ${backendError || 'An unknown error occurred'}`)
      }
    } catch (err: any) {
      setMessage(`❌ ${err.message || 'Something went wrong'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = () => {
    window.location.href = '/api/auth/google?role=buyer'
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] py-12 px-4">
      <Card className="mx-auto max-w-2xl w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-accent">Buyer Sign Up</CardTitle>
          <CardDescription>Create your account to explore custom fits from top tailors.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            {/* Name Fields */}
            <div className="grid gap-2 md:grid-cols-2 md:gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" placeholder="Shre" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" placeholder="Ram" required />
              </div>
            </div>

            <div className="grid gap-2">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" placeholder="9632587410" required min={1000000000} max={9999999999} type="number" />
              </div>
            </div>


            {/* Email + OTP */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            {!otpSent && (
              <Button onClick={handleSendOTP} disabled={loading || !email}>
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            )}
            {otpSent && !otpVerified && (
              <div className="grid gap-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input id="otp" type="text" placeholder="Enter 6-digit code" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                <Button onClick={handleVerifyOTP} disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </Button>
              </div>
            )}

            {/* Address */}
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" placeholder="Your address" required />
            </div>

            {/* State + Pincode */}
            <div className="grid gap-2 md:grid-cols-2 md:gap-4">
              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" placeholder="Delhi" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pincode">PIN Code</Label>
                <Input id="pincode" name="pincode" type="number" placeholder="110001" required />
              </div>
            </div>

            {/* City */}
            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" placeholder="Delhi" required />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  required
                  className={`pr-10 border-2 ${error ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary/40 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-800"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="h-1 rounded-full mt-1 transition-all duration-200">
                <div className={`h-1 w-full rounded-full ${strengthColor}`}></div>
              </div>
              {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading || !!error}
              className={`w-full transition-colors ${message?.includes('✅')
                ? 'bg-green-600 hover:bg-green-700'
                : message?.includes('❌')
                  ? 'bg-red-600 hover:bg-red-700'
                  : ''
                }`}
            >
              {loading
                ? 'Creating Account...'
                : message
                  ? (() => {
                    const cleanMsg = message.replace(/^✅|❌/, '').trim()
                    const shortMsg = cleanMsg.length > 60 ? cleanMsg.substring(0, 57) + '...' : cleanMsg
                    return shortMsg
                  })()
                  : 'Create Account'}
            </Button>

            {/* Google Signup */}
            <Button
              type="button"
              variant="ghost"
              className="flex items-center justify-center gap-2 w-full border border-brown-600"
              onClick={handleGoogleSignup}
            >
              <FcGoogle className="h-5 w-5" /> Sign Up with Google
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline text-primary">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
