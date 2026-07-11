import fs from 'node:fs'
import postgres from 'postgres'

const envText = fs.readFileSync(new URL('../.env', import.meta.url), 'utf8')
const databaseUrlLine = envText.split(/\r?\n/).find((line) => line.startsWith('DATABASE_URL='))

if (!databaseUrlLine) {
  throw new Error('DATABASE_URL is missing from apps/docs/.env')
}

const databaseUrl = databaseUrlLine.slice('DATABASE_URL='.length).replaceAll('"', '')

const sql = postgres(databaseUrl, { prepare: false })

try {
  await sql.unsafe('truncate table waitlist restart identity cascade')
  console.log('TRUNCATED waitlist')
} finally {
  await sql.end({ timeout: 5 })
}
