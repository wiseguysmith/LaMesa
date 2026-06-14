import { Suspense } from 'react'
import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="text-3xl font-bold text-amber-600">La Mesa</a>
          <p className="text-slate-500 mt-2">Sign in to your account</p>
        </div>
        <Suspense fallback={<div className="bg-white rounded-xl p-8 text-center text-slate-400">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
