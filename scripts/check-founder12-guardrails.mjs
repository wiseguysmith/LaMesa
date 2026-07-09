import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = process.cwd()

const targets = [
  'AGENTS.md',
  'CLAUDE.md',
  'README.md',
  'docs',
  'src',
]

const allowedFiles = new Set([
  'docs/FOUNDER_12_GUARDRAILS.md',
])

const bannedPatterns = [
  { pattern: /La Mesa Summer 2026 Table/i, reason: 'Use Founder 12.' },
  { pattern: /Table 01/i, reason: 'Use Founder 12 or accepted founder.' },
  { pattern: /Batch 01/i, reason: 'Use Founder 12.' },
]

function listFiles(path) {
  const absolute = join(root, path)
  const stat = statSync(absolute)
  if (stat.isFile()) return [absolute]

  const entries = readdirSync(absolute)
  return entries.flatMap((entry) => {
    const next = join(absolute, entry)
    const nextStat = statSync(next)
    if (nextStat.isDirectory()) {
      if (['.next', 'node_modules', '.git'].includes(entry)) return []
      return listFiles(relative(root, next))
    }
    return [next]
  })
}

const files = targets
  .flatMap(listFiles)
  .filter((file) => /\.(md|ts|tsx|sql)$/.test(file))

const violations = []

for (const file of files) {
  const rel = relative(root, file).replace(/\\/g, '/')
  if (allowedFiles.has(rel)) continue
  const text = readFileSync(file, 'utf8')
  const lines = text.split(/\r?\n/)

  lines.forEach((line, index) => {
    bannedPatterns.forEach(({ pattern, reason }) => {
      if (pattern.test(line)) {
        violations.push(`${rel}:${index + 1} - ${reason}\n  ${line.trim()}`)
      }
    })
  })
}

if (violations.length > 0) {
  console.error('Founder 12 guardrail check failed:\n')
  console.error(violations.join('\n\n'))
  process.exit(1)
}

console.log('Founder 12 guardrail check passed.')
