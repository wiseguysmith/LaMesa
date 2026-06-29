'use client'

import { TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = '', id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-isd-dark mb-1.5">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`w-full px-3.5 py-2.5 rounded-md border text-isd-dark placeholder-isd-gray text-sm font-sans resize-y
            focus:outline-none focus:ring-2 focus:ring-isd-teal focus:border-transparent transition-colors
            ${error ? 'border-red-400 bg-red-50' : 'border-isd-gray-light bg-white hover:border-isd-gray'}
            ${className}`}
          rows={4}
          {...props}
        />
        {hint && !error && <p className="mt-1.5 text-xs text-isd-gray">{hint}</p>}
        {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
export default Textarea
