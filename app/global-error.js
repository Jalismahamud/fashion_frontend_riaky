'use client'

import ErrorScreen from "@/components/common/ErrorScreen"

// Error boundaries must be Client Components
export default function Error({ error, reset }) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <div className='w-full h-screen  flex justify-center items-center'>
          <ErrorScreen reset={reset} error={error} />
        </div>
      </body>
    </html>
  )
}