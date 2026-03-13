'use client'
import Script from 'next/script'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'agent-id'?: string
      }
    }
  }
}

export function ElevenLabsWidget() {
  return (
    <>
      <elevenlabs-convai agent-id="agent_4701kkkhwccpe8x846gw7txrk87y" />
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="lazyOnload"
      />
    </>
  )
}
