'use client'

import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-isd-dark mb-1.5">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-3.5 py-2.5 rounded-md border text-isd-dark placeholder-isd-gray text-sm font-sans
            focus:outline-none focus:ring-2 focus:ring-isd-teal focus:border-transparent transition-colors
            ${error ? 'border-red-400 bg-red-50' : 'border-isd-gray-light bg-white hover:border-isd-gray'}
            ${className}`}
          {...props}
        />
        {hint && !error && <p className="mt-1.5 text-xs text-isd-gray">{hint}</p>}
        {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
