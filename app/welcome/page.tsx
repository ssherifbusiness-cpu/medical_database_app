import Link from 'next/link';

export default function welcome() {
  return (
    <div>
      <h1>Welcome to Medical Database App</h1>
      <Link href="/patient-portal">Go to Patient Portal</Link>
    </div>
  )
}