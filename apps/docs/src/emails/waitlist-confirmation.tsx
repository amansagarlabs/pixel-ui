import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from 'react-email'
import * as React from 'react'

interface WaitlistConfirmationEmailProps {
  email: string
}

export function WaitlistConfirmationEmail({ email }: WaitlistConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>You're on the waitlist</Preview>
      <Tailwind>
        <Body className="bg-[#0a0a0a] px-4 py-10 font-sans text-white">
          <Container className="mx-auto max-w-[560px] rounded-2xl border border-white/10 bg-[#111111] p-0">
            <Section className="border-b border-white/10 px-8 py-7">
              <Text className="m-0 text-[11px] uppercase tracking-[0.22em] text-white/60">
                Pixel UI
              </Text>
              <Heading className="m-0 mt-3 text-3xl font-semibold tracking-tight text-white">
                You're on the waitlist
              </Heading>
            </Section>
            <Section className="px-8 py-7">
              <Text className="m-0 text-[15px] leading-7 text-white/80">
                Thanks for joining with <span className="font-semibold text-white">{email}</span>.
                We’ll keep you posted on launch updates and early access.
              </Text>
              <Section className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <Text className="m-0 text-[11px] uppercase tracking-[0.18em] text-white/50">
                  What to expect
                </Text>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[14px] leading-6 text-white/75">
                  <li>Launch updates</li>
                  <li>Early access notes</li>
                  <li>Product announcements</li>
                </ul>
              </Section>
              <Hr className="my-6 border-white/10" />
              <Text className="m-0 text-[13px] leading-6 text-white/55">
                Pixel UI is the shadcn/ui for AI agent engineering.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default WaitlistConfirmationEmail
