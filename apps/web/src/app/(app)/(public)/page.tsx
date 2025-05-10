'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@/components/button'

export default function Home() {
  const [error, setError] = useState(false)

  useEffect(() => {
    if (error) {
      throw new Error('Test error')
    }
  }, [error])

  return (
    <div className="mx-auto flex gap-2 py-4">
      <Button as={Link} href="/admin">
        Admin Page
      </Button>
      <Button color="warning" as={Link} href="/raise-not-found">
        Not Found
      </Button>
      <Button color="danger" onPress={() => setError(true)}>
        Error
      </Button>
    </div>
  )
}
