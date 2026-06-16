'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card, { CardBody } from '@/components/ui/Card'

type Mode = 'signin' | 'signup'

export default function LoginForm() {
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/dashboard'
  const initialMode = (searchParams.get('mode') as Mode) || 'signin'

  const [mode, setMode] = useState<Mode>(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<'founder' | 'builder'>('founder')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const supabase = createClient()

  const handleSignIn = async () => {
    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    if (data.user) {
      // Get role to redirect properly
      const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single()

      if (userData?.role === 'admin') {
        window.location.href = '/admin'
      } else {
        window.location.href = redirect
      }
    }
  }

  const handleSignUp = async () => {
    if (!fullName.trim()) {
      setError('Full name is required')
      return
    }
    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    if (data.user) {
      // Create user record in public.users
      const res = await fetch('/api/auth/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: data.user.id, email, fullName, role }),
      })

      if (!res.ok) {
        const { error: createError } = await res.json()
        setError(createError || 'Failed to create user profile')
        setLoading(false)
        return
      }

      setSuccess('Account created! Check your email to confirm, then sign in.')
      setMode('signin')
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === 'signin') {
      await handleSignIn()
    } else {
      await handleSignUp()
    }
  }

  return (
    <Card>
      <CardBody className="p-8">
        {/* Mode toggle — pill style */}
        <div className="flex bg-sand rounded-full p-1 mb-6">
          <button
            onClick={() => { setMode('signin'); setError(null) }}
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${
              mode === 'signin'
                ? 'bg-terracotta text-white shadow-sm'
                : 'text-warm-muted hover:text-brown-dark'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode('signup'); setError(null) }}
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${
              mode === 'signup'
                ? 'bg-terracotta text-white shadow-sm'
                : 'text-warm-muted hover:text-brown-dark'
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <Input
              label="Full Name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jane Smith"
              required
            />
          )}

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === 'signup' ? 'At least 6 characters' : '••••••••'}
            required
          />

          {mode === 'signup' && (
            <div>
              <p className="block text-sm font-medium text-brown-dark mb-3">
                I am joining as... <span className="text-red-500">*</span>
              </p>
              {/* Role selector cards */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setRole('founder')}
                  className={`flex-1 flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    role === 'founder'
                      ? 'border-terracotta bg-sand shadow-sm'
                      : 'border-[#E8D8C8] bg-white hover:border-terracotta/40'
                  }`}
                >
                  <span className="text-2xl">🚀</span>
                  <span className={`text-sm font-semibold ${role === 'founder' ? 'text-terracotta' : 'text-brown-dark'}`}>
                    Founder
                  </span>
                  <span className="text-xs text-warm-muted">I have an idea</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('builder')}
                  className={`flex-1 flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    role === 'builder'
                      ? 'border-terracotta bg-sand shadow-sm'
                      : 'border-[#E8D8C8] bg-white hover:border-terracotta/40'
                  }`}
                >
                  <span className="text-2xl">🛠️</span>
                  <span className={`text-sm font-semibold ${role === 'builder' ? 'text-terracotta' : 'text-brown-dark'}`}>
                    Builder
                  </span>
                  <span className="text-xs text-warm-muted">I have skills</span>
                </button>
              </div>
            </div>
          )}

          <Button type="submit" loading={loading} className="w-full !rounded-xl" size="lg">
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>

          {mode === 'signin' && (
            <p className="text-center text-sm text-warm-muted mt-2">
              <button
                type="button"
                className="text-terracotta hover:text-terracotta-light font-medium transition-colors"
                onClick={() => {
                  if (email) {
                    alert(`Password reset instructions would be sent to ${email}`)
                  } else {
                    alert('Enter your email address above, then click Forgot password.')
                  }
                }}
              >
                Forgot password?
              </button>
            </p>
          )}
        </form>
      </CardBody>
    </Card>
  )
}
