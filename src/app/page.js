'use client'

import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect to VEX page since it's the only product
  redirect('/projects/vex')
}
