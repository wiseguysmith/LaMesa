'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useLocale } from '@/lib/i18n/LocaleProvider'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

type Mode = 'signin' | 'signup'

export default function LoginForm() {
  const searchParams = useSearchParams()
  const { dict } = useLocale()
  const t = dict.loginForm
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
      setError(t.fullNameRequired)
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
      const res = await fetch('/api/auth/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: data.user.id, email, fullName, role }),
      })

      if (!res.ok) {
        const { error: createError } = await res.json()
        setError(createError || t.createFailed)
        setLoading(false)
        return
      }

      setSuccess(t.accountCreated)
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
    <div className="bg-white rounded-xl border border-isd-gray-light shadow-sm overflow-hidden">
      <div className="flex border-b border-isd-gray-light">
        <button
          onClick={() => { setMode('signin'); setError(null) }}
          className={`flex-1 py-4 text-sm font-medium transition-all ${
            mode === 'signin'
              ? 'bg-isd-navy text-white'
              : 'text-isd-gray hover:text-isd-dark hover:bg-isd-light/50'
          }`}
        >
          {t.signIn}
        </button>
        <button
          onClick={() => { setMode('signup'); setError(null) }}
          className={`flex-1 py-4 text-sm font-medium transition-all ${
            mode === 'signup'
              ? 'bg-isd-navy text-white'
              : 'text-isd-gray hover:text-isd-dark hover:bg-isd-light/50'
          }`}
        >
          {t.signUp}
        </button>
      </div>

      <div className="p-8">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-isd-mint/20 border border-isd-mint/40 rounded-lg text-sm text-isd-dark">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <Input
              label={t.fullName}
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t.fullNamePlaceholder}
              required
            />
          )}

          <Input
            label={t.email}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            required
          />

          <Input
            label={t.password}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === 'signup' ? t.passwordSignup : '........'}
            required
          />

          {mode === 'signup' && (
            <div>
              <p className="block text-sm font-medium text-isd-dark mb-3">
                {t.joiningAs} <span className="text-red-500">*</span>
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setRole('founder')}
                  className={`flex-1 flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    role === 'founder'
                      ? 'border-isd-navy bg-isd-navy/5 shadow-sm'
                      : 'border-isd-gray-light bg-white hover:border-isd-navy/40'
                  }`}
                >
                  <span className="text-2xl">🚀</span>
                  <span className={`text-sm font-semibold ${role === 'founder' ? 'text-isd-navy' : 'text-isd-dark'}`}>
                    {t.founder}
                  </span>
                  <span className="text-xs text-isd-gray">{t.founderSub}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('builder')}
                  className={`flex-1 flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    role === 'builder'
                      ? 'border-isd-teal bg-isd-teal/5 shadow-sm'
                      : 'border-isd-gray-light bg-white hover:border-isd-teal/40'
                  }`}
                >
                  <span className="text-2xl">🛠️</span>
                  <span className={`text-sm font-semibold ${role === 'builder' ? 'text-isd-teal' : 'text-isd-dark'}`}>
                    {t.builder}
                  </span>
                  <span className="text-xs text-isd-gray">{t.builderSub}</span>
                </button>
              </div>
            </div>
          )}

          <Button type="submit" loading={loading} className="w-full" size="lg">
            {mode === 'signin' ? t.signIn : t.createAccount}
          </Button>

          {mode === 'signin' && (
            <p className="text-center text-sm text-isd-gray mt-2">
              <button
                type="button"
                className="text-isd-teal hover:text-isd-navy font-medium transition-colors"
                onClick={() => {
                  if (email) {
                    alert(t.resetSent + ' ' + email)
                  } else {
                    alert(t.enterEmail)
                  }
                }}
              >
                {t.forgotPassword}
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
