'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card, { CardBody } from '@/components/ui/Card'

type Mode = 'signin' | 'signup'

export default function LoginForm() {
  const router = useRouter()
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
        router.push('/admin')
      } else {
        router.push(redirect)
      }
      router.refresh()
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
        {/* Mode toggle */}
        <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => { setMode('signin'); setError(null) }}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
              mode === 'signin' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode('signup'); setError(null) }}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
              mode === 'signup' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
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
              <p className="block text-sm font-medium text-slate-700 mb-2">
                I am joining as... <span className="text-red-500">*</span>
              </p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="founder"
                    checked={role === 'founder'}
                    onChange={() => setRole('founder')}
                    className="w-4 h-4 text-amber-600"
                  />
                  <span className="text-sm text-slate-700 font-medium">Founder</span>
                  <span className="text-xs text-slate-400">— I have an idea</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="builder"
                    checked={role === 'builder'}
                    onChange={() => setRole('builder')}
                    className="w-4 h-4 text-amber-600"
                  />
                  <span className="text-sm text-slate-700 font-medium">Builder</span>
                  <span className="text-xs text-slate-400">— I have skills</span>
                </label>
              </div>
            </div>
          )}

          <Button type="submit" loading={loading} className="w-full" size="lg">
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}
