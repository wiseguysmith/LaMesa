'use client'

interface ISDLogoProps {
  variant?: 'primary' | 'white' | 'navy'
  size?: 'sm' | 'md' | 'lg'
  showWordmark?: boolean
  className?: string
}

const sizes = {
  sm: { mark: 28, text: 'text-lg' },
  md: { mark: 36, text: 'text-2xl' },
  lg: { mark: 48, text: 'text-3xl' },
}

const colors = {
  primary: { mark: '#264473', text: '#264473', sub: '#264473' },
  white:   { mark: '#ffffff', text: '#ffffff', sub: '#ffffff' },
  navy:    { mark: '#264473', text: '#264473', sub: '#264473' },
}

export default function ISDLogo({
  variant = 'primary',
  size = 'md',
  showWordmark = true,
  className = '',
}: ISDLogoProps) {
  const { mark: markSize, text: textSize } = sizes[size]
  const { mark: markColor, text: textColor, sub: subColor } = colors[variant]

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* ISD geometric mark — stylized building/district icon */}
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Left column */}
        <rect x="4" y="8" width="12" height="32" rx="1" fill={markColor} />
        {/* Top notch cut-out */}
        <rect x="4" y="8" width="8" height="8" rx="0" fill={markColor} opacity="0" />
        {/* Right hexagonal body */}
        <path
          d="M18 16 L32 8 L44 14 L44 34 L32 40 L18 34 Z"
          fill={markColor}
          opacity="0.85"
        />
        {/* Inner cut-out for the mark */}
        <path
          d="M22 20 L30 16 L38 20 L38 30 L30 34 L22 30 Z"
          fill={variant === 'white' ? '#0f1b2e' : '#efefef'}
          opacity="0.9"
        />
        {/* Vertical stroke on left */}
        <rect x="4" y="8" width="4" height="32" fill={markColor} />
      </svg>

      {showWordmark && (
        <div className="flex items-baseline gap-2">
          <span
            className={`font-slab font-normal tracking-wide leading-none ${textSize}`}
            style={{ color: textColor }}
          >
            ISD
          </span>
          <span
            className="text-xs font-sans font-normal leading-tight"
            style={{ color: subColor, opacity: 0.75 }}
          >
            Innovation<br />Smart District
          </span>
        </div>
      )}
    </div>
  )
}
